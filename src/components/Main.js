import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

const Main = ({ ethBalance, tokenBalance, buyTokens, sellTokens }) => {
  const [currentForm, setCurrentForm] = useState("buy");

  return (
    <Grid container>
      <Grid item xs={5} container justifyContent="space-between">
        <Button
          variant="contained"
          onClick={() => {
            setCurrentForm("buy");
          }}
        >
          Buy
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentForm("sell");
          }}
        >
          Sell
        </Button>
    
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
        </Grid>
    </Grid>
  );
};

export default Main;
