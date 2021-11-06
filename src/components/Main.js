import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";
import Earth from './Earth'

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: "#000000"
  },

  formWrap: {
    padding: 24,
    color: "#eee",
    maxWidth: 564,
    height: 'max-content',
    background: "rgba(255, 255, 255, .1)"
  }
});


const Main = ({ ethBalance, tokenBalance, buyTokens, sellTokens }) => {
  const classes =  useStyles()
  const [currentForm, setCurrentForm] = useState("buy");

  return (
    <Grid container style={{height: "100%"}}>
      <Grid  item xs={4} 
        container 
        justifyContent="center" 
        alignContent="center"
        className={classes.root} >
        <Grid item className={classes.formWrap}>
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
          <Earth />
    </Grid>
  );
};

export default Main;
