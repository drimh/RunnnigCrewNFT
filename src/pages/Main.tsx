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
        src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Hogwarts-Crest.png"
      />
      <h1>Welcome to Hogwart School!!</h1>
      <div css={{ fontSize: 18 }}>
        <p>You can get Hogwart Student Card NFT in here.</p>
        <p>
          Make your own student character NFT and show it off to your friends!
        </p>
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
