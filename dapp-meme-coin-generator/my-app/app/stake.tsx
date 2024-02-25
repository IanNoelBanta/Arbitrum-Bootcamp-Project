import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";

function StartStaking() {
  const [stakeAmount, setStakeAmount] = useState<number>();
  const [isStake, setIsStake] = useState<boolean>(true);
  const [currentStaked, setCurrentStaked] = useState<number>(0);

  const amountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakeAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakeAmount(undefined);
    }
  };

  const showStake = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.getStake(signer);
      // await tx.wait();
      console.log(tx);
      setCurrentStaked(tx);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const selectStake = () => {
    setIsStake(true);
  };

  const selectUnstake = () => {
    setIsStake(false);
  };

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakeAmount);
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
      <div className="flex space-x-10">
        <button
          className="font-bold h-10 w-40 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
          onClick={selectStake}
        >
          STAKE
        </button>

        <button
          className="font-bold h-10 w-40 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
          onClick={selectUnstake}
        >
          UNSTAKE
        </button>
      </div>

      <div className="">
        <input
          type="number"
          className="border rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent"
          value={stakeAmount}
          onChange={(e) => amountChange(e)}
          placeholder={
            isStake ? "Enter amount to stake" : "Enter amount to unstake"
          }
          style={{ color: "black" }}
        />
      </div>

      <button
        className="font-bold h-10 w-40 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
        onClick={stakeCoin}
      >
        {isStake ? "STAKE IT" : "UNSTAKE IT"}
      </button>

      <button
        className="font-bold h-10 w-50 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
        onClick={showStake}
      >
        {currentStaked != 0 ? `Current Staked: ${currentStaked}` : "Show Staked"}
      </button>
    </div>
  );
}

export default StartStaking;
