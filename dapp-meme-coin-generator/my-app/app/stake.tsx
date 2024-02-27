import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";

function StartStaking() {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [isStake, setIsStake] = useState<boolean>(true);
  const [currentStaked, setCurrentStaked] = useState<number>(-1);
  const [withdrawn, setWithdrawn] = useState<number>(0);
  const [withdraw, setWithdraw] = useState<number>(-1);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isUnstakeItClicked, setIsUnstakeItClicked] = useState<boolean>(false);

  const amountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakeAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakeAmount(0);
    }
  };

  const showStake = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.getStake(signer);
      setCurrentStaked(tx);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Show Stake failed: ${decodedError?.args}`);
    }
  };

  const showWithdraw = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.getWithdraw(signer);
      setWithdraw(tx);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Show Withdraw failed: ${decodedError?.args}`);
    }
  };

  const selectStake = () => {
    setIsLoading(false);
    setIsStake(true);
    setCurrentStaked(-1);
    setWithdraw(-1);
    setIsUnstakeItClicked(false);
  };

  const selectUnstake = () => {
    setIsLoading(false);
    setIsStake(false);
    setCurrentStaked(-1);
    setWithdraw(-1);
    setIsUnstakeItClicked(false);
  };

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakeAmount);
      setIsLoading(true);
      await tx.wait();
      setIsLoading(false);
      setCurrentStaked(-1);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };

  const unstakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      setIsLoading(true);

      const beforeBal = await contract.balanceOf(signer);
      const convertedBeforeBal = Number(beforeBal) / 1e18;

      const tx = await contract.withdraw();
      await tx.wait();

      const currentBal = await contract.balanceOf(signer);
      const convertedCurrentBal = Number(currentBal) / 1e18;

      console.log(convertedCurrentBal - convertedBeforeBal);
      setWithdrawn(convertedCurrentBal - convertedBeforeBal);

      setIsLoading(false);
      setWithdraw(-1);
      setIsUnstakeItClicked(true);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Unstaking failed: ${decodedError?.args}`);
    }
  };

  return (
    <div
      className="flex flex-col gap-3 items-center border border-solid border-sky-400 rounded-lg p-5"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="font-bold h-5 w-50 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">NORMAL STAKING, UNSTAKE ANYTIME</div>
      <div className="italic font-bold h-8 w-90 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">100% APY</div>
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

      {isStake ? (
        <input
          type="number"
          className="border rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-transparent"
          value={stakeAmount}
          onChange={(e) => amountChange(e)}
          placeholder={"Enter amount to stake"}
          style={{ color: "black" }}
        />
      ) : (
        <div>
          <button
            className="font-bold h-10 w-40 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
            onClick={unstakeCoin}
          >
            {"UNSTAKE IT"}
          </button>
        </div>
      )}

      {isStake ? (
        <button
          className="font-bold h-10 w-40 border-solid border hover:border-2 border-sky-400 rounded-lg hover:rounded-lg text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
          onClick={stakeCoin}
        >
          {"STAKE IT"}
        </button>
      ) : isUnstakeItClicked ? (
        <div className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">Successfully Withdrawn: {withdrawn}z</div>
      ) : (
        ""
      )}

      <div>
        {isloading && (
          <div className="text-center">
            <p className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">
              Processing...
            </p>
          </div>
        )}
      </div>

      <button
        className="font-bold h-10 w-30 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
        onClick={isStake ? showStake : showWithdraw}
      >
        {isStake
          ? currentStaked < 0
            ? "Click to Show Staked"
            : `Current Staked: ${currentStaked}`
          : withdraw < 0
          ? "Click to Show Withdrawable"
          : `Withdraw: ${withdraw}`}
      </button>
    </div>
  );
}

export default StartStaking;
