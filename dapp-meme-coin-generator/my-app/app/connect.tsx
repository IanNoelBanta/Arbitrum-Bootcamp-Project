/*-----------------------IMPORTS------------------------- */
import { useEffect, useState } from "react";

function WalletConnection() {
    const [walletKey, setWalletKey] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletKey(accounts[0]);
    console.log(walletKey);
  };

  return (
    <main className="mb-3 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">
      <button onClick={connectWallet}>CLICK ME TO CONNECT GAGO</button>
    </main>
  );
}

export default WalletConnection;
