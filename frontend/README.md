# 🌿 GeneScope Frontend

This is the frontend interface for the **GeneScope** dApp. It allows users to upload genomic claims, pin them to IPFS, and submit them to the Ethereum network.

## 🧰 Stack
- React + TypeScript
- Vite
- Ethers.js
- Pinata API (JWT)
- MetaMask integration

## 🖼️ Features
- Upload `.json` files describing genetic claims
- Real-time status updates (IPFS pinning, blockchain transaction)
- Connect wallet via MetaMask
- Auto-parse JSON metadata for claim scope and tags

## 🛠️ Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌍 Environment Variables
Make a `.env` file in this directory with:

```env
VITE_CONTRACT_ADDRESS=0xYourContractAddress
VITE_PINATA_JWT=YourPinataJWT
```

## ⚠️ Notes
Use only valid JSON files with the format:

```json
{
  "validUntil": "2025-12-31",
  "tags": ["genomics", "peer-review", "open-access"]
}
```

## 📦 Build
```bash
npm run build
```

---

Ready to bridge science and blockchain.
