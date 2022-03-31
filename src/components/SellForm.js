import React, { useState } from "react";

import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";

const SellForm = ({
  account,
  ethBalance,
  tokenBalance,
  ethSwap,
  token,
  setLoading,
}) => {
  const [tokenAmount, setTokenAmount] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    const tokensToSell = window.web3.utils.toWei(tokenAmount, "Ether");
    sellTokens(tokensToSell);
  };

  const onChange = (event) => {
    if (event.target.value) {
      const tokenAmount = event.target.value.toString();
      setTokenAmount(tokenAmount);
    }
  };

  const sellTokens = (tokenAmountt) => {
    setLoading(true);
    token.methods
      .approve(ethSwap._address, tokenAmountt)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        ethSwap.methods
          .sellTokens(tokenAmountt)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading(false);
          });
      });
  };

  return (
    <form className="mb-3" onSubmit={(event) => onSubmit(event)}>
      <div>
        <label className="float-left">
          <b>Input</b>
        </label>
        <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei(String(tokenBalance), "Ether")}
        </span>
      </div>
      <div className="input-group mb-4">
        <input
          type="text"
          onChange={(event) => onChange(event)}
          className="form-control form-control-lg"
          placeholder="0"
          required
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <img src={tokenLogo} height="32" alt="" />
            &nbsp; DApp
          </div>
        </div>
      </div>
      <div>
        <label className="float-left">
          <b>Output</b>
        </label>
        <span className="float-right text-muted">
          Balance: {window.web3.utils.fromWei(String(ethBalance), "Ether")}
        </span>
      </div>
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="0"
          value={tokenAmount / 100}
          disabled
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <img src={ethLogo} height="32" alt="" />
            &nbsp;&nbsp;&nbsp; ETH
          </div>
        </div>
      </div>
      <div className="mb-5">
        <span className="float-left text-muted">Exchange Rate</span>
        <span className="float-right text-muted">100 DApp = 1 ETH</span>
      </div>
      <button type="submit" className="btn btn-primary btn-block btn-lg">
        SWAP!
      </button>
    </form>
  );
};

export default SellForm;
