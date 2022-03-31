import React, { useEffect, useState, useCallback } from "react";
import Web3 from "web3";

import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
import Navbar from "./Navbar/Navbar";
import Main from "./Main";

import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState();
  const [ethBalance, setEthBalance] = useState(0);
  const [token, setToken] = useState();
  const [ethSwap, setEthSwap] = useState();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setWeb3(window.web3);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setWeb3(window.web3);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadToken = async (networkId) => {
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      setToken(new web3.eth.Contract(Token.abi, tokenData.address));
      if (token) {
        const balance = await token.methods.balanceOf(account).call();
        setTokenBalance(balance.toString());
      }
    } else {
      window.alert("Token contract not deployed to detected network.");
    }
  };

  const loadEthSwap = async (networkId) => {
    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwapContract = new web3.eth.Contract(
        EthSwap.abi,
        ethSwapData.address
      );
      setEthSwap(ethSwapContract);
    } else {
      window.alert("Token contract not deployed to detected network.");
    }
  };

  const fetchData = useCallback(async () => {
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      if (account) {
        const balance = await web3.eth.getBalance(account);
        setEthBalance(balance);
      }
      const networkId = await web3.eth.net.getId();
      await loadToken(networkId);
      await loadEthSwap(networkId);
      setLoading(false);
    }
  }, [web3, account, ethBalance]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <div>
      <Navbar account={account} />
      <div className="container mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "400px" }}
          >
            <div className="content mr-auto ml-auto"></div>
          </main>
          {loading ? (
            <p id="loader" className="text-center">
              Loading...
            </p>
          ) : (
            <Main
              account={account}
              ethBalance={ethBalance}
              tokenBalance={tokenBalance}
              ethSwap={ethSwap}
              token={token}
              setLoading={setLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
