import React, { Component } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: "buy",
    };
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="content mr-auto ml-auto">
              <div id="content" className="mt-3">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <button
                        className="btn btn-light"
                        onClick={(event) => {
                          this.setState({ currentForm: "buy" });
                        }}
                      >
                        Buy
                      </button>
                      <span className="text-muted">&lt; &nbsp; &gt;</span>
                      <button
                        className="btn btn-light"
                        onClick={(event) => {
                          this.setState({ currentForm: "sell" });
                        }}
                      >
                        Sell
                      </button>
                    </div>
                    {this.state.currentForm === "buy" ? (
                      <BuyForm
                        ethBalance={this.props.ethBalance}
                        tokenBalance={this.props.tokenBalance}
                        buyTokens={this.props.buyTokens}
                      />
                    ) : (
                      <SellForm 
                        ethBalance={this.props.ethBalance}
                        tokenBalance={this.props.tokenBalance}
                        sellTokens={this.props.sellTokens}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
