import React, { useEffect, useState, useCallback } from "react";
import Web3 from "web3";
import "./App.css";

import Navbar from "./Navbar/Navbar";

const App = () => {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState();
  const [ethBalance, setEthBalance] = useState(0);

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

  const fetchData = useCallback(async () => {
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const balance = await web3.eth.getBalance(account);
      setEthBalance(balance);
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
      <Navbar account={account}/>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Hello World</h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
