import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x201D78b9D04a14e572fa6416765e097b8A92e01D", // deployed contract address
        abi as any,
        signer
    );
}