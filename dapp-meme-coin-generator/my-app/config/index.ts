import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xA02b92D9D24d6EF0aDd69d7FA9e59689F46b339F", // deployed contract address
        abi as any,
        signer
    );
}