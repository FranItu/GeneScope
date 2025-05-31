import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const pinataToken = import.meta.env.VITE_PINATA_JWT;

function App() {
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<File | null>(null);

  async function connectWallet(): Promise<ethers.JsonRpcSigner | null> {
    if (!window.ethereum) {
      alert("MetaMask not found!");
      return null;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    return await provider.getSigner();
  }

  async function uploadToIPFS(): Promise<string | null> {
    if (!file) {
      setStatus("❌ No file selected.");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pinataToken}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorBody = await res.text(); // This is okay here
        console.error("Upload failed:", errorBody);
        throw new Error("Upload failed");
      }
      
      const data = await res.json();  // ✅ Safe now
      console.log("✅ Uploaded:", data);
      return data.IpfsHash;

    } catch (err) {
      console.error("IPFS upload error:", err);
      setStatus("❌ Upload failed.");
      return null;
    }
  }

  async function submitClaim() {
    if (!file) {
      setStatus("❌ No file selected.");
      return;
    }

    setStatus('Connecting wallet...');
    const signer = await connectWallet();
    if (!signer) return;

    setStatus('Uploading to IPFS...');
    const cid = await uploadToIPFS();
    if (!cid) {
      setStatus('❌ Failed to upload file.');
      return;
    }

    const abi = [
      "function createClaim(string _ipfsHash, uint8 _scope, uint256 _validUntil, string[] memory _tags) public"
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const claimData = await file.text();
      const parsed = JSON.parse(claimData);

      const ipfsHash = cid;
      const scope = 2; // Academic
      const validUntil = Math.floor(new Date(parsed.validUntil).getTime() / 1000);
      const tags = parsed.tags;

      setStatus('Submitting transaction...');
      const tx = await contract.createClaim(ipfsHash, scope, validUntil, tags);
      await tx.wait();

      setStatus(`✅ Claim submitted! Tx hash: ${tx.hash}`);
    } catch (err) {
      console.error("Claim submission failed:", err);
      setStatus("❌ Failed to submit claim.");
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          GeneScope Genetic Claims Uploader
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your structured genetic claims as JSON files with comprehensive metadata 
          and scientific ontological frameworks for blockchain verification.
        </p>
      </div>
  
      {/* Upload Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Select Your JSON Claim File
          </h2>
          
          {/* File Upload Area */}
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-white hover:bg-blue-50 transition-all duration-200 hover:border-blue-400"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mb-2 text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">JSON files only</p>
              </div>
            </label>
          </div>
  
          {/* Selected File Display */}
          {file && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-green-800">
                  Selected: {file.name}
                </span>
              </div>
            </div>
          )}
  
          {/* Submit Button */}
          <button
            onClick={submitClaim}
            disabled={!file}
            className={`w-full mt-6 py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
              file
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {file ? 'Submit Genetic Claim' : 'Select a file to continue'}
          </button>
        </div>
      </div>
  
      {/* Status Section */}
      {status && (
        <div className="max-w-2xl mx-auto">
          <div className={`p-4 rounded-xl border ${
            status.includes('✅') 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : status.includes('❌') 
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {status.includes('✅') && (
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {status.includes('❌') && (
                  <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {!status.includes('✅') && !status.includes('❌') && (
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Info Section */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works:</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
              <span className="text-blue-600 font-bold text-xs">1</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Upload JSON</p>
              <p>Your structured genetic claims with metadata</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-indigo-100 rounded-full p-2 flex-shrink-0">
              <span className="text-indigo-600 font-bold text-xs">2</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">IPFS Storage</p>
              <p>Secure decentralized storage via Pinata</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
              <span className="text-purple-600 font-bold text-xs">3</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Blockchain Anchor</p>
              <p>Immutable record on Ethereum Sepolia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;