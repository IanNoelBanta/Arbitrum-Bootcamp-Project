import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";

function StartMinting() {
  const [mintingWalletKey, setMintingWalletKey] = useState("");
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [mintingAddress, setMintingAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const CONTRACT_ADDRESS = "0x201D78b9D04a14e572fa6416765e097b8A92e01D";

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(mintingWalletKey, mintingAmount);
      await tx.wait();
      setSubmitted(true);
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
    <div className="flex flex-col">
      <div className="flex space-x-10">
        <input
          type="text"
          className="border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent"
          value={mintingAddress}
          onChange={(e) => addressChange(e)}
          placeholder="Enter wallet address"
          style={{ color: "black" }}
        />

        <input
          type="number"
          className="border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent"
          value={mintingAmount}
          onChange={(e) => amountChange(e)}
          placeholder="Enter amount to mint"
          style={{ color: "black" }}
        />

        <button
          className="font-bold h-10 w-40 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
          onClick={mintCoin}
        >
          SUBMIT
        </button>
      </div>

      <div className="mt-5 mb-4">
        {submitted && (
          <div className="text-center">
            <p className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">Minting successful!</p>
            <p className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">Import token: {CONTRACT_ADDRESS}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StartMinting;
