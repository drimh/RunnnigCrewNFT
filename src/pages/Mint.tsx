import { constants } from "../constants";
import { ethers, Contract, utils } from "ethers";
import HogwartsCardFactoryABI from "../abi/HogwartsCardFactory.json";
import { useState } from "react";

const abi = HogwartsCardFactoryABI.abi; // ABI는 스마트 컨트랙트의 ABI(Application Binary Interface) 정보를 가져온다.
interface MintTranProps {
  account: string;
  setAccount: (account: string) => void;
}

export const Mint = ({ account, setAccount }: MintTranProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [mbti, setMbti] = useState("");
  const [hobby, setHobby] = useState("");
  const [level, setLevel] = useState("");
  const [blood, setBlood] = useState("");
  const [dormitory, setDormitory] = useState("");

  //ethers.js 라이브러리를 사용하여 이더리움과 연결
  //// signer는 거래에 서명할 수 있는 객체
  //// provider는 이더리움 노드에 연결하는 객체
  //// Factory는 스마트 컨트랙트와 상호작용할 수 있는 객체
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const provider = new ethers.providers.JsonRpcProvider(
    constants.SeopoliaRPCUrl
  );
  let HogwartsCardFactory = new ethers.Contract(
    constants.ContractAddress,
    abi,
    provider
  );
  HogwartsCardFactory = HogwartsCardFactory.connect(signer);

  // 함수를 정의하여 스마트 컨트랙트와 상호작용
  const Mint = async () => {
    const tx = await HogwartsCardFactory.mintHogwartsCard(
      name,
      age,
      description,
      mbti,
      hobby,
      level,
      blood,
      dormitory,
      {
        value: utils.parseEther("0.01"),
      }
    );
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

  //사용자 입력을 받고, 버튼을 클릭하면 상태를 업데이트하거나 이더리움 트랜잭션을 발생시킨다.
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mbti"
          value={mbti}
          onChange={(e) => setMbti(e.target.value)}
        />
        <input
          type="text"
          placeholder="Hobby"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
        />
        <input
          type="text"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Blood"
          value={blood}
          onChange={(e) => setBlood(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dormitory"
          value={dormitory}
          onChange={(e) => setDormitory(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => Mint()}>Mint</button>
      </div>
    </>
  );
};
/*
    input example :
    "Jiwoo Yun",
    "22",
    "래번클로의 반장",
    "INTJ",
    "독서, 영화보기, 마법주문 적용해보기",
    "1",
    "혼혈(Half)",
    "래번클로(Ravenclaw)"
*/
