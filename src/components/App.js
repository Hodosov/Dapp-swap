import React, { Component } from "react";
import Web3 from "web3";
import Token from "../abis/Token.json";
import EthSwap from "../abis/EthSwap.json";
import "./App.css";
import NavBar from "./NavBar";
import Main from "./Main";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const [account] = await web3.eth.getAccounts()
    this.setState({account})
    const ethBalance = await web3.eth.getBalance(account)
    this.setState({ ethBalance })

    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      this.setState({ token });
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() });
    }

    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      this.setState({ ethSwap });
    }
  }

  async loadWeb3() {
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

  buyTokens = (etherAmount) => {
    this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.account })
  }

  sellTokens = (tokenAmount) => {
    this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account })
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      token: {},
      ethSwap: "",
      ethBalance: "0",
      tokenBalance: "0",
    };
  }

  render() {
    return (
      <div>
        <NavBar account={this.state.account} />
        <Main
        ethBalance={this.state.ethBalance}
        tokenBalance={this.state.tokenBalance}
        buyTokens={this.buyTokens}
        sellTokens={this.sellTokens}
      />
      </div>
    );
  }
}

export default App;
