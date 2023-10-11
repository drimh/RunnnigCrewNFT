/** @jsxImportSource @emotion/react */
import { constants } from "../constants";
import { ethers, Contract, utils } from "ethers";
import SimpleCardNFTFactoryABI from "../abi/SimpleCardNFTFactory.json";
import NFTEscrowABI from "../abi/NFTEscrow.json"
import { css } from "@emotion/react";
import { useDisconnect } from "wagmi";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const abi = SimpleCardNFTFactoryABI.abi;
const escrow_abi = NFTEscrowABI.abi;

export const Mint = () => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [residence, setResidence] = useState("");
  const [runningGoal, setRunningGoal] = useState("");
  const [runningSkill, setRunningSkill] = useState("");
  const [sellerTokenId, setsellerTokenId] = useState("");
  const [buyerAddress, setbuyerAddress] = useState("");
  const [buyerTokenId, setbuyerTokenId] = useState("");
  const [swapSellerTokenId, setswapSellerTokenId] = useState("");


  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const provider = new ethers.providers.JsonRpcProvider(
    constants.SeopoliaRPCUrl
  );

  let SimpleCardNFTFactory = new Contract(
    constants.ContractAddress,
    abi,
    provider
  );

  let NFTEscrow = new Contract(
    constants.EscrowAddress,
    escrow_abi,
    provider
  );


  SimpleCardNFTFactory = SimpleCardNFTFactory.connect(signer);
  NFTEscrow = NFTEscrow.connect(signer);

const Register = async () => {
    const tx = await SimpleCardNFTFactory.registerSimpleCardInfo(
      name,
      age,
      residence,
      runningGoal,
      runningSkill,
    );
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

  //const uri = "https://amber-gigantic-weasel-825.mypinata.cloud/ipfs/QmeN39heYkzj2g6DAm4qMiP6CftmQBG1ZSQFoPxtnXbB8J"; // 민트할 NFT의 URI를 설정합니다
  const uri = "https://amber-gigantic-weasel-825.mypinata.cloud/ipfs/QmaZucfZHjQXFELseWfYhUF2wjkDE6nV9FyuNnfroao77w"; // 민트할 NFT의 URI를 설정합니다

  const mintCard = async () => {
    const tx = await SimpleCardNFTFactory.mintCheckMultiple(uri);
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  };

  const deposit = async () => {
    const _operator = constants.EscrowAddress;
    const _approved = true; // 승인 여부를 나타내는 값
    const tx_one = await SimpleCardNFTFactory.setApprovalForAll(_operator,_approved);
    console.log(await tx_one.wait());
    
    const tx_two = await NFTEscrow.deposit(sellerTokenId, buyerAddress, buyerTokenId);
    console.log(await tx_two.wait()); // 트랜잭션 처리를 대기합니다.
  };

  const swap = async () => {
    const _operator = constants.EscrowAddress;
    const _approved = true; // 승인 여부를 나타내는 값
    const tx_one = await SimpleCardNFTFactory.setApprovalForAll(_operator,_approved);
    console.log(await tx_one.wait());
    
    const tx_two = await NFTEscrow.deposit(swapSellerTokenId);
    console.log(await tx_two.wait()); // 트랜잭션 처리를 대기합니다.
  };

  const showImage = (runningSkill: string) => {
    let imageURL = "";
    switch (runningSkill) {
      case "":
        imageURL = constants.nike1;
        break;
      case "Gosu":
        imageURL = constants.nike2;
        break;
      case "Expert":
        imageURL = constants.nike3;
        break;
      case "Good":
        imageURL = constants.nike4;
        break;
      case "Beginner":
        imageURL = constants.nike5;
        break;
    }
    return imageURL;
  };

  const SubTitle = css`
    padding: 14px 0px;
    font-size: 16px;
    font-weight: 600;
  `;
  const StyledInput = css`
    width: 700px;
    padding: 14px 12px;
    font-size: 18px;
    margin-bottom: 16px;
    border-radius: 10px;
    border: 1px dashed rgba(0, 0, 0, 0.4);
  `;
  const StyledTextArea = css`
    width: 700px;
    height: 150px;
    padding: 14px 12px;
    font-size: 18px;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    margin-bottom: 16px;
    border-radius: 6px;
    border: 1px dashed rgba(0, 0, 0, 0.4);
  `;

  return (
    <div
      css={{
        margin: "30px 0px",
        position: "absolute",
        left: "50%",
        transform: "translate(-50%)",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div />
        <div
          onClick={async () => {
            await disconnect();
            navigate("/");
          }}
          css={{
            padding: "6px 10px",
            backgroundColor: "red",
            color: "white",
            fontSize: 14,
            fontWeight: 400,
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          로그아웃
        </div>
      </div>
      <h1>Minting Running Crew NFT Card</h1>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 0px 10px",
        }}
      >
        <img width={220} src={showImage(runningSkill)} alt="Character" />
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div css={SubTitle}>Name</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="Name your Character NFT"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div css={SubTitle}>Age</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <div css={SubTitle}>residence</div>
        <select
          css={StyledInput}
          name="residence"
          onChange={(e) => setResidence(e.target.value)}
          required
        >
          <option value="" hidden selected>
            Choose your residence
          </option>
          <option value="Seoul">Seoul</option>
          <option value="Gyeonggi">Gyeonggi </option>
          <option value="Incheon">Incheon</option>
        </select>
        <div css={SubTitle}>runningSkill</div>
        <select
          css={StyledInput}
          name="runningSkill"
          onChange={(e) => setRunningSkill(e.target.value)}
          required
        >
          <option value="" hidden selected>
            Choose your running Skill
          </option>
          <option value="Gosu">Gosu</option>
          <option value="Expert">Expert </option>
          <option value="Good">Good</option>
          <option value="Beginner">Beginner</option>
        </select>
        <div css={SubTitle}>runningGoal</div>
        <textarea
          css={StyledTextArea}
          placeholder="Enter a Description (introduce anything!!)"
          value={runningGoal}
          onChange={(e) => setRunningGoal(e.target.value)}
          required
        />
        <div
          onClick={() => Register()}
          css={{
            width: "100%",
            padding: "10px 20px",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 500,
            backgroundColor: "#00AB59",
            color: "white",
            borderRadius: 10,
            cursor: "pointer",
            margin: "30px 0px 60px",
          }}
        >
          Info register
        </div>
        <div
          onClick={() => mintCard()}
          css={{
            width: "100%",
            padding: "10px 20px",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 500,
            backgroundColor: "#00AB59",
            color: "white",
            borderRadius: 10,
            cursor: "pointer",
            margin: "30px 0px 60px",
          }}
        >
          Mint
        </div>
        <div
          onClick={() => deposit()}
          css={{
            width: "100%",
            padding: "10px 20px",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 500,
            backgroundColor: "#00AB59",
            color: "white",
            borderRadius: 10,
            cursor: "pointer",
            margin: "30px 0px 60px",
          }}
        >
          deposit nft
        </div>
        <div css={SubTitle}>sellerTokenId</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="sellerTokenId"
          value={sellerTokenId}
          onChange={(e) => setsellerTokenId(e.target.value)}
          required
        />
        <div css={SubTitle}>buyerAddress</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="buyerAddress"
          value={buyerAddress}
          onChange={(e) => setbuyerAddress(e.target.value)}
          required
        />
        <div css={SubTitle}>buyerTokenId</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="buyerTokenId"
          value={buyerTokenId}
          onChange={(e) => setbuyerTokenId(e.target.value)}
          required
        />
        <div
          onClick={() => swap()}
          css={{
            width: "100%",
            padding: "10px 20px",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 500,
            backgroundColor: "#00AB59",
            color: "white",
            borderRadius: 10,
            cursor: "pointer",
            margin: "30px 0px 60px",
          }}
        >
          Swap nft
        </div>
        <div css={SubTitle}>swapSellerTokenId</div>
        <input
          css={StyledInput}
          type="text"
          placeholder="swapSellerTokenId"
          value={swapSellerTokenId}
          onChange={(e) => setswapSellerTokenId(e.target.value)}
          required
        />
      </div>
    </div>
  );
};
