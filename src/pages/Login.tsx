/** @jsxImportSource @emotion/react */
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface WalletProps {
  setAccount: (account: string) => void;
}

export default function Login({ setAccount }: WalletProps) {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  setAccount(address!);

  useEffect(() => {
    if (isConnected) navigate("/mint");
  }, []);

  return (
    <>
      {isConnected ? (
        <div></div>
      ) : (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "60px 0px",
          }}
        >
          <img
            css={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            width={240}
            src="https://media.istockphoto.com/id/1333474461/ko/%EB%B2%A1%ED%84%B0/%EB%9F%B0%EB%8B%9D%EB%A7%A8-%EC%8B%A4%EB%A3%A8%EC%97%A3-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%A7%88%EB%9D%BC%ED%86%A4-%EB%A1%9C%EA%B3%A0-%ED%85%9C%ED%94%8C%EB%A6%BF-%EB%9F%AC%EB%8B%9D-%ED%81%B4%EB%9F%BD-%EB%98%90%EB%8A%94-%EC%8A%A4%ED%8F%AC%EC%B8%A0-%ED%81%B4%EB%9F%BD.jpg?s=612x612&w=0&k=20&c=zm6HbS9b2pHP6Ca2t87k26SWCwOBHHmO4cjUQf-uTGs="
          />
          <div style={{ marginTop: 40 }}>
            <h2>Connect your wallet.</h2>
            <p>
              If you don't have a wallet yet, you can select a provider and
              create one now.
            </p>
            <div
              onClick={async () => {
                await connect();
                navigate("/mint");
              }}
              css={{
                marginTop: 40,
                padding: "10px 20px",
                border: "1px solid rgba(18, 18, 18, 0.12)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
            >
              <div css={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://opensea.io/static/images/logos/metamask-fox.svg"
                  width={50}
                />
                <div css={{ marginLeft: 12, fontSize: 18, fontWeight: 500 }}>
                  MetaMask
                </div>
              </div>
              <div
                css={{
                  fontSize: 16,
                  fontWeight: 400,
                  backgroundColor: "#2081E2",
                  color: "white",
                  borderRadius: 8,
                  padding: "3px 8px",
                  alignItems: "center",
                }}
              >
                Only
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

