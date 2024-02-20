"use client";

/*-----------------------IMPORTS------------------------- */
import { BrowserProvider } from "ethers";
import { useEffect, useState } from "react";
import { getContract } from "../config";
import Image from "next/image";
import WalletConnection from "./connect";
import StartMinting from "./mint";

/*----------------------------------------------------------------- */

/*-------------------------STATES----------------------- */

export default function Home() {
  const [chosenButton, setChosenButton] = useState<number>();

  /*----------------------------------------------------------------- */
  const showCard = () => {
    switch (chosenButton) {
      case 0:
        return <WalletConnection />;
      case 1:
        return <StartMinting />;
      default:
        return (
          <div className="mb-3 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500">
            <p>Start by connecting your wallet</p>
          </div>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-pink-900 to-blue-900 overflow-hidden">
      <div className="flex-col items-center justify-between rounded-lg px-5 py-5 bg-gray-900 transition-all duration-300 hover:shadow-lg hover:border-transparent hover:bg-transparent hover:dark:border-neutral-700 hover:dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 flex-grow">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-40">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Ian Noel M. Banta - ABC04
            </p>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                By{" "}
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  className="dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </a>
            </div>
          </div>

          <div className="">{showCard()}</div>

          <div></div>

          <div className="mt-20 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setChosenButton(0)}
            >
              <h2
                className={`mb-3 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500`}
              >
                Connect your Wallet{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Connect your metamask wallet.
              </p>
            </a>

            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setChosenButton(1)}
            >
              <h2
                className={`mb-3 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500`}
              >
                Mint Coins{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Start Generating Coins!
              </p>
            </a>

            {/* 
            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              target="_blank"
              rel="noopener noreferrer"
              // onClick={stakeCoin}
            >
              <h2
                className={`mb-3 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500`}
              >
                Stake Coins{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Hold and earn rewards!
              </p>
            </a>

            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              target="_blank"
              rel="noopener noreferrer"
              // onClick={withdrawCoin}
            >
              <h2
                className={`mb-3 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500`}
              >
                Withdraw Coins{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
                Go home and take your coins!
              </p>
            </a> */}
          </div>
        </div>
      </div>
    </main>
  );
}
