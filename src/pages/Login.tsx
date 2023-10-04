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
            src="https://mblogthumb-phinf.pstatic.net/MjAxNzAxMThfMTIz/MDAxNDg0NjcwNzUzMzA3.u759Pl7LwWpsyUDFQNLz8N0h9VPuOs_trniFP0EHcm8g.7YMu6ZQzFUQT6wBT37FP8i4x0VJYBvoZWW-RRTv3dvwg.PNG.gkgntwhddns/2014-05-31_18_40_58.png?type=w800"
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
