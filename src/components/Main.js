import React, {  useState } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

const  Main = ({ethBalance, tokenBalance, buyTokens, sellTokens}) => {
 

  const [currentForm, setCurrentForm] = useState('buy')

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
                        onClick={() => {
                          setCurrentForm("buy");
                        }}
                      >
                        Buy
                      </button>
                      <span className="text-muted">&lt; &nbsp; &gt;</span>
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          setCurrentForm("sell");
                        }}
                      >
                        Sell
                      </button>
                    </div>
                    {currentForm === "buy" ? (
                      <BuyForm
                        ethBalance={ethBalance}
                        tokenBalance={tokenBalance}
                        buyTokens={buyTokens}
                      />
                    ) : (
                      <SellForm 
                        ethBalance={ethBalance}
                        tokenBalance={tokenBalance}
                        sellTokens={sellTokens}
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

export default Main;
