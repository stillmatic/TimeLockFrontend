import React, { useState } from "react";
import type { NextPage } from "next";
import {
  useAccount,
  useBalance,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../components";
const factoryAddress = "0x3696b906b1a575b2b46528bf839706b08718cf43";

import { abi } from "./factory_abi.json";

export const Form = () => {
  const [{ data, error, loading }, write] = useContractWrite(
    {
      addressOrName: factoryAddress,
      contractInterface: abi,
    },
    "createReceiver"
  );

  const Transaction = (hash) => {
    const [
      {
        data: transactionData,
        error: transactionError,
        loading: transactionLoading,
      },
      wait,
    ] = useWaitForTransaction({
      hash: hash.hash,
    });
  
    return (
      <div>
        {transactionError && <p>There was an error. Please try again later.</p>}{" "}
        {transactionLoading && <p>Creating on chain...</p>}{" "}
        {transactionData && (
          <>
            <p>hash: {transactionData.transactionHash}</p>
            <p>Receiver created.</p>
          </>
        )}
      </div>
    );
  };

  const [vestDuration, setvestDuration] = React.useState(60 * 60 * 24 * 365);
  const [cliffDuration, setcliffDuration] = React.useState(0);
  const [intendedOwner, setintendedOwner] = React.useState(
    "0xe39DFD1b1B9eAC4D11B54D9d838b384ee494e9A6"
  );

  async function handleSubmit(event) {
    event.preventDefault();
    await write({ args: [vestDuration, cliffDuration, intendedOwner] });
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label htmlFor="vestDuration">Vest Duration (seconds)</label>
        <input
          id="vestDuration"
          type="number"
          autoComplete="vest"
          onChange={(event) => setvestDuration(event.target.value)}
          defaultValue={60 * 60 * 24 * 365}
          required
        />
        <br />
        <label htmlFor="cliffDuration">Cliff Duration (seconds) </label>
        <input
          id="cliffDuration"
          type="number"
          autoComplete="cliff"
          onChange={(event) => setcliffDuration(event.target.value)}
          defaultValue={0}
          required
        />
        <br />
        <label htmlFor="intendedOwner">
          Intended Owner (address, e.g. `0x123..abc`){" "}
        </label>
        <input
          id="intendedOwner"
          type="text"
          autoComplete="address"
          defaultValue={"0xe39DFD1b1B9eAC4D11B54D9d838b384ee494e9A6"}
          onChange={(event) => setintendedOwner(event.target.value)}
          required
        />
        <br />
        {data ? (
          <Transaction hash={data.hash} />
        ) : (
          <button type="submit" className="btn btn-blue">
            Create
          </button>
        )}
      </form>
      )
    </>
  );
};

export const Home: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: accountData, loading: accountLoading }] = useAccount();
  const [{ data: balanceData, loading: balanceLoading }] = useBalance({
    addressOrName: accountData?.address,
    watch: true,
  });

  const loading = (accountLoading || balanceLoading) && !balanceData;

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    if (balanceData) {
      return (
        <>
          <h1 className="mb-8 text-4xl font-bold">
            Create a TimeLockedReceiver
          </h1>
          <div className="inline-flex place-items-center">
            <Form />
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">Create a TimeLockedReceiver</h1>
        <Button
          loading={accountLoading}
          onClick={() => setShowWalletOptions(true)}
        >
          Connect to Wallet
        </Button>
      </>
    );
  };

  return (
    <>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />

      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
