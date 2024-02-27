import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x4C9A09fD8C1A43e3444587D549BcfD162E5D2bB3", // deployed contract address
        abi as any,
        signer
    );
}