import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const filePath = './data/sample_claims/brca1_claim.json'; // or whichever file
const token = process.env.VITE_PINATA_JWT;

async function uploadToPinata() {
  const form = new FormData();

  form.append('file', fs.createReadStream(filePath), {
    filename: 'brca1_claim.json',
    contentType: 'application/json',
  });

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // DO NOT manually set Content-Type — `form-data` handles it
    },
    body: form,
  });

  const result = await res.json();
  console.log("📦 Pinata upload response:", result);

  if (result.IpfsHash) {
    console.log("✅ Uploaded to IPFS:", result.IpfsHash);
  } else {
    console.log("❌ Something went wrong.");
  }
}

uploadToPinata().catch(console.error);