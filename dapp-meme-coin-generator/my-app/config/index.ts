import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x003aeC005598A7ee4C36DdF6C5ff7a4A8448A374", // deployed contract address
        abi as any,
        signer
    );
}