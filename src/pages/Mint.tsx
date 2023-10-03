import { constants } from "../constants";
import { ethers, Contract, utils } from "ethers";
import HogwartsCardFactoryABI from "../abi/HogwartsCardFactory.json";
import  { useState } from "react";

import { isAsExpression } from 'typescript';
import { TransactionDescription } from 'ethers/lib/utils';
import styled from "@emotion/styled";

const abi = HogwartsCardFactoryABI.abi; // ABI는 스마트 컨트랙트의 ABI(Application Binary Interface) 정보를 가져온다.
interface MintTranProps {
  account: string;
  setAccount: (account: string) => void;

}
const RegisterButton = styled.button`
  width: 400px;
  height: 200px;
  background-color: 	#191970;
  color: white;
  text-align: center;
`;
const StyledInput = styled.input`
  background-color: 	#A0522D;  // 원하는 배경색으로 변경
  border: 5px solid 	#000000; // 테두리 색상도 필요하다면 변경
  padding: 15px; 
   // 패딩 추가
   color:black;
  margin: 5px 0; // 상하 마진 추가
  // 기타 원하는 스타일 속성을 추가
`;

export const Mint = ({ account, setAccount }: MintTranProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [mbti, setMbti] = useState("");
  const [hobby, setHobby] = useState("");
  const [level, setLevel] = useState("");
  const [blood, setBlood] = useState("");
  const [dormitory, setDormitory] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState(null);

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
  // ScanData 에 대한 정의   

  const fetchData = () => {
    // 상태와 상태 업데이트 함수 정의

    const apiKey = 'Y3A9SI7QRVMNKSU8QWHBEBACAI26EF6XIN';
    const transactionHash = '0xf8964a6d5e383aad4daaea68f1511ecf45fbc5ccf1eb648a1e297c6660b064cc';
    const apiUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=${apiKey}`;
  
    // 데이터를 가져오는 함수
      axios.get(apiUrl)
        .then((response: { data: { result: any; }; }) => {
          if (response.data.result) {
            setTransactionData(response.data.result); // 상태 업데이트
          } else {
            setError('트랜잭션 정보를 찾을 수 없습니다.'); // 에러 상태 업데이트
          }
        })
        .catch((error: { message: any; }) => {
          setError(`API 호출 중 오류 발생: ${error.message}`); // 에러 상태 업데이트
        });
    };
  

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
        <StyledInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Mbti"
          value={mbti}
          onChange={(e) => setMbti(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Hobby"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Blood"
          value={blood}
          onChange={(e) => setBlood(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Dormitory"
          value={dormitory}
          onChange={(e) => setDormitory(e.target.value)}
        />
      </div>
      <div>
        <Mintbutton onClick={() => Mint()}>Mint</Mintbutton>
      </div>
      <div>
      <button onClick={fetchData}>Data</button>
      {transactionData && <p>Transaction Data: {JSON.stringify(transactionData)}</p>}
      {error && <p>error: {error}</p>}
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
