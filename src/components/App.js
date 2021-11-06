import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import Token from "../abis/Token.json";
import EthSwap from "../abis/EthSwap.json";
import "./App.css";
import NavBar from "./NavBar";
import Main from "./Main";

const App = () => {
  const [account, setAccount] = useState('')
  const [ethBalance, setEthBalance] = useState('')
  const [token, setToken] = useState({})
  const [tokenBalance, setTokenBalance] = useState('')
  const [ethSwap, setEthSwap] = useState('')

  useEffect(async () => {
    await loadWeb3();
  }, []) 

  useEffect(async () => {
    await loadBlockchainData();
  }, []) 

  async function loadBlockchainData() {
    const web3 = window.web3;
    const [account] = await web3.eth.getAccounts()
    setAccount(account)
    const ethBalance = await web3.eth.getBalance(account)
    setEthBalance( ethBalance )

    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];

    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      setToken(token);
      let tokenBalance = await token.methods.balanceOf(account).call()
      setTokenBalance( tokenBalance.toString());
    }

    const ethSwapData = EthSwap.networks[networkId];

    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      setEthSwap(ethSwap);
    }
  }

  async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
  }

 const buyTokens = (etherAmount) => {
    ethSwap.methods.buyTokens().send({ value: etherAmount, from: account }).on('transactionHash', async () =>  {
    const ethBalance = await window.web3.eth.getBalance(account)
    setEthBalance( ethBalance )
   })
  }

  const sellTokens = (tokenAmount) => {
    token.methods.approve(ethSwap.address, tokenAmount).send({ from: account }).on('transactionHash', (hash) => {
     ethSwap.methods.sellTokens(tokenAmount).send({ from: account })
    })
  }

  if(!window.web3.eth) {
    return null
  }


    return (
      <div style={{height: "100vh"}}>
        <NavBar account={account} />
        <Main
        ethBalance={ethBalance}
        tokenBalance={tokenBalance}
        buyTokens={buyTokens}
        sellTokens={sellTokens}
      />
      </div>
    );
}

export default App;
