import { useState } from "react";
import { Wallet } from "../components/Wallet";
import { Mint } from "./Mint";

export const Main = () => {
  const [account, setAccount] = useState("");
  return (
    <div>
      <Wallet account={account} setAccount={setAccount}></Wallet>
      <Mint account={account} setAccount={setAccount}></Mint>
    </div>
  );
};
