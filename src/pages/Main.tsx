/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "60px 0px",
      }}
    >
      <img
        style={{ marginBottom: 20 }}
        width={300}
        src="https://cdn.imweb.me/upload/S2022031512277f1de1268/fbe5ba5d1355f.png"
      />
      <h1>🎉🎉Welcome to Running Crew🎉🎉</h1>
      <div css={{ fontSize: 18 }}>
        <p>😄You can get Running Crew Card NFT in here😄</p>
      </div>
      <div
        onClick={() => navigate("/login")}
        css={{
          marginTop: 40,
          padding: "10px 20px",
          backgroundColor: "#00AB59",
          color: "white",
          fontSize: 20,
          fontWeight: 500,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Go minting
      </div>
    </div>
  );
};
