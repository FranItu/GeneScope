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
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>GeneScope Uploader (Pinata IPFS)</h1>
      <input
        type="file"
        accept=".json"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <br /><br />
      <button onClick={submitClaim} disabled={!file}>Submit Claim</button>
      <p>{status}</p>
    </div>
  );
}

export default App;