/*-----------------------IMPORTS------------------------- */
import { useEffect, useState } from "react";

interface WalletConnectionProps {
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

function WalletConnection({ connected, setConnected }: WalletConnectionProps) {
  const [walletKey, setWalletKey] = useState("");
  // const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletKey(accounts[0]);
    setConnected(true);
  };

  return (
    <div className="flex flex-col border border-solid border-sky-400 rounded-lg p-5" style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <div className="h-15 w-200 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 border border border-solid border-sky-400 rounded-lg p-2">
        <button onClick={connectWallet}>Connect your Metamask Wallet</button>
      </div>

      <div className="">
        {connected && (
          <div className="text-center">
            <p className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">
              Wallet connected!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletConnection;
