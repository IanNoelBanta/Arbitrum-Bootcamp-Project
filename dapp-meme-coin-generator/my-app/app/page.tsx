"use client";

/*-----------------------IMPORTS------------------------- */
import { useEffect, useState } from "react";
import Image from "next/image";
import Background from "../public/z6.png";
import WalletConnection from "./connect";
import StartMinting from "./mint";
import StartStaking from "./stake";
import StartLockedStaking from "./locked-stake";

/*----------------------------------------------------------------- */

export default function Home() {
  const [chosenButton, setChosenButton] = useState<number>();
  const [connected, setConnected] = useState(false);

  /*----------------------------------------------------------------- */
  const showCard = () => {
    switch (chosenButton) {
      case 0:
        return (
          <WalletConnection connected={connected} setConnected={setConnected} />
        );
      case 1:
        return <StartMinting />;
      case 2:
        return <StartStaking />;
      case 3:
        return <StartLockedStaking />;
      default:
        return (
          <div
            className="mb-20 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p>Start by connecting your wallet</p>
          </div>
        );
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-20 overflow-hidden"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
      }}
    >
      {connected ? (
        <audio autoPlay loop>
          <source src="/zzz.mp3" type="audio/mp3" />
        </audio>
      ) : null}
      <div className="flex-col items-center justify-between rounded-lg px-5 py-5 bg-gray-900 transition-all duration-300 hover:shadow-lg hover:border-transparent hover:bg-transparent hover:dark:border-neutral-700 hover:dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 flex-grow">
        <div className="flex flex-col items-center justify-center w-full h-full border border-solid border-sky-400 rounded-lg p-5">
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex border border border-solid border-sky-400 rounded-lg p-2">
            <p className="fixed left-0 top-0 flex w-full justify-center bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Ian Noel M. Banta - ABC04
            </p>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powered By:{" "}
                <Image
                  src="/adu.png"
                  alt="adu Logo"
                  className=""
                  width={150}
                  height={150}
                  priority
                />
                <Image
                  src="/arbitrum.png"
                  alt="arbitrum Logo"
                  className=""
                  width={30}
                  height={30}
                  priority
                />
                <Image
                  src="/metamask.svg"
                  alt="metamask Logo"
                  className=""
                  width={50}
                  height={50}
                  priority
                />
                <Image
                  src="/gh.svg"
                  alt="github Logo"
                  className="dark:invert"
                  width={30}
                  height={30}
                  priority
                />
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  className="dark:invert"
                  width={80}
                  height={54}
                  priority
                />
              </a>
            </div>
          </div>

          <div className="mb-40 mt-40">{showCard()}</div>

          <div className="mt-40 flex grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left border border-solid border-sky-400 rounded-lg p-1">
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
                Connect your Metamask Wallet!
              </p>
            </a>

            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                connected ? setChosenButton(1) : setChosenButton(4)
              }
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

            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                connected ? setChosenButton(2) : setChosenButton(4)
              }
            >
              <h2
                className={`mb-3 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500`}
              >
                Normal Staking{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Go Hard or Go Home!
              </p>
            </a>

            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                connected ? setChosenButton(3) : setChosenButton(4)
              }
            >
              <h2
                className={`mb-3 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500`}
              >
                Locked Staking{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
                Earn while you sleep zzz!
              </p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
