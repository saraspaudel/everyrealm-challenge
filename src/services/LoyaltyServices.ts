import { ethers } from 'ethers';
import LoyaltyTokenABI from './LoyaltyTokenABI.json'; // ABI of the deployed contract
import dotenv from 'dotenv';

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL!);
const signer = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY!, provider);
const loyaltyTokenContract = new ethers.Contract(process.env.LOYALTY_TOKEN_CONTRACT_ADDRESS!, LoyaltyTokenABI, signer);

export const issueLoyaltyPoints = async (userAddress: string, amount: number) => {
    const tx = await loyaltyTokenContract.mint(userAddress, amount);
    await tx.wait();
    return tx;
};
