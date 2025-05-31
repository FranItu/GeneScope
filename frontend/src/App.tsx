import { useState } from 'react';
import { Web3Storage } from 'web3.storage'; 
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const web3Token = import.meta.env.VITE_WEB3STORAGE_TOKEN;

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
      console.error("No file selected.");
      return null;
    }
  
    try {
      const client = new Web3Storage({ token: web3Token });
      console.log("Uploading file to IPFS:", file.name);
  
      const cid = await client.put([file]);
      console.log("Upload complete, CID:", cid);
      return cid;
    } catch (error) {
      console.error("IPFS upload error:", error);
      setStatus("❌ IPFS upload failed.");
      return null;
    }
  }

  async function submitClaim() {
    setStatus('Connecting wallet...');
    const signer = await connectWallet();
    if (!signer) return;

    setStatus('Uploading to IPFS...');
    const cid = await uploadToIPFS();
    if (!cid) {
      setStatus('Failed to upload file.');
      return;
    }

    const abi = [
      "function createClaim(string _ipfsHash, uint8 _scope, uint256 _validUntil, string[] memory _tags) public"
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const claimData = await file!.text();
    const parsed = JSON.parse(claimData);

    const ipfsHash = cid;
    const scope = 2; // Academic (adjust as needed)
    const validUntil = Math.floor(new Date(parsed.validUntil).getTime() / 1000);
    const tags = parsed.tags;

    setStatus('Submitting transaction...');
    const tx = await contract.createClaim(ipfsHash, scope, validUntil, tags);
    await tx.wait();

    setStatus(`✅ Claim submitted! Tx hash: ${tx.hash}`);
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>GeneScope Uploader (NFT.Storage)</h1>
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