import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";

function StartWithdrawing() {
  const [withdrawable, setWithdrawable] = useState<number>(0);

  const showWithdraw = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.getWithdraw(signer);
      setWithdrawable(tx);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };


  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      console.log(tx);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center border" style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <button
        className="font-bold h-10 w-40 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
        onClick={withdrawCoin}
      >
        {withdrawable != 0 ? `Withdraw: ${withdrawable}` : "Balance: 0"}
      </button>

      <button
        className="font-bold h-10 w-50 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
        onClick={showWithdraw}
      >
        {withdrawable != 0 ? `Withdraw: ${withdrawable}` : "Show Withdrawble"}
      </button>
    </div>
  );
}

export default StartWithdrawing;
