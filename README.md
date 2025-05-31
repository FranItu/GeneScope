# 🧬 GeneScope

**GeneScope** is a decentralized application for publishing, validating, and managing structured genetic claims on-chain. By combining IPFS for decentralized storage and Ethereum smart contracts for verifiable proof, GeneScope brings bioinformatics into Web3.

## ✨ Features

- Upload structured genomic claims as JSON
- Pin to IPFS using Pinata
- Register metadata on-chain (scope, validity, tags)
- Modular scope system for academic, clinical, or private claims
- ZK-ready architecture with future integrations (World ID, Flare, Vlayer)

## 🔧 Tech Stack

- [Solidity](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [React + Vite](https://vitejs.dev/)
- [Pinata IPFS](https://www.pinata.cloud/)
- [Ethers.js](https://docs.ethers.org/)
- TypeChain, dotenv, Sepolia testnet

## 📂 Structure

- `contracts/` – Solidity smart contracts
- `scripts/` – Deployment scripts
- `test/` – Contract test cases
- `frontend/` – React frontend app
- `typechain-types/` – TypeScript bindings

## 🚀 Quick Start

```bash
git clone https://github.com/FranItu/GeneScope
cd GeneScope
npm install
npx hardhat compile
