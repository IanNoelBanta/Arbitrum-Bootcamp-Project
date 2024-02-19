import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xc95A4b10B9887880588dDc8c0b48460C4b46B6aD", // deployed contract address
        abi as any,
        signer
    );
}