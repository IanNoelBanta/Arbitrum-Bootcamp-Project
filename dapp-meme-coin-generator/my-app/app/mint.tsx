import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";

function StartMinting() {
  const [mintingWalletKey, setMintingWalletKey] = useState("");
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [mintingAddress, setMintingAddress] = useState("");

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(mintingWalletKey, mintingAmount);
      await tx.wait();
      console.log(tx);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const amountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(undefined);
    }
  };

  const addressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMintingAddress(inputValue);
    setMintingWalletKey(inputValue);
    console.log(inputValue);
  };

  return (
    <div className="flex gap-10 items-center mb-40 mt-20">
      <input
        type="text"
        className="border rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent"
        value={mintingAddress}
        onChange={(e) => addressChange(e)}
        placeholder="Enter wallet address"
        style={{ color: "black" }}
      />

      <input
        type="number"
        className="border rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent"
        value={mintingAmount}
        onChange={(e) => amountChange(e)}
        placeholder="Enter amount to mint"
        style={{ color: "black" }}
      />

      <button onClick={mintCoin}>SUBMIT</button>
    </div>
  );
}

export default StartMinting;
