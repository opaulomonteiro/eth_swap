import React, { useState } from "react";

import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

const Main = ({
  account,
  ethBalance,
  tokenBalance,
  ethSwap,
  token,
  setLoading,
}) => {
  console.log(ethBalance, tokenBalance, ethSwap);
  const [currentForm, setCurrentForm] = useState();
  const loadForm = () => {
    if (currentForm === "buy") {
      return (
        <BuyForm
          account={account}
          ethBalance={ethBalance}
          tokenBalance={tokenBalance}
          ethSwap={ethSwap}
          setLoading={setLoading}
        />
      );
    } else {
      return (
        <SellForm
          account={account}
          ethBalance={ethBalance}
          tokenBalance={tokenBalance}
          ethSwap={ethSwap}
          token={token}
          setLoading={setLoading}
        />
      );
    }
  };

  return (
    <div id="content" className="mt-3">
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-light"
          onClick={(event) => {
            setCurrentForm("buy");
          }}
        >
          Buy
        </button>
        <span className="text-muted">&lt; &nbsp; &gt;</span>
        <button
          className="btn btn-light"
          onClick={(event) => {
            setCurrentForm("sell");
          }}
        >
          Sell
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">{loadForm()}</div>
      </div>
    </div>
  );
};

export default Main;
