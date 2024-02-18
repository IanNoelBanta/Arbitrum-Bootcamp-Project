"use client";
import { BrowserProvider } from "ethers";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };

  const setData = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.setData("Hello Baby");
      await tx.wait();
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Transaction failed: ${decodedError?.args}`);
    }
  };

  const getData = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.data();
      alert(tx);

      setcurrentData(tx);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Transaction failed: ${decodedError?.args}`);
    }
  };

  return (
    <main className="">
      <div className="flex items-stretch ...">
        <div className="self-auto 1">
          <button
            onClick={() => {
              connectWallet();
            }}
            className="p-3 bg-slate-800 text-white rounded"
          >
            {walletKey != "" ? "Wallet Connected" : " Connect wallet"}
          </button>
        </div>
        <div className="self-auto ...">
          <button
            onClick={() => {
              getData();
            }}
            className="p-3 bg-slate-800 text-white rounded"
          >
            Get Data
          </button>
        </div>
        <div className="self-auto ...">
          <button
            onClick={() => {
              setData();
            }}
            className="p-3 bg-slate-800 text-white rounded"
          >
            Set Data
          </button>
        </div>
        {currentData == "" ? (
          <div className="bg-white">{currentData}</div>
        ) : (
          <div className="p-5 bg-amber-300 text-black rounded">
            {currentData}
          </div>
        )}
      </div>
    </main>
  );
}