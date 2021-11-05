import React, { useRef, useState } from "react";

import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";
import { Grid, Button, TextField, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  output: {
    height: 56,
    background: "#eee"
  },
});

const BuyForm = ({ buyTokens, ethBalance, tokenBalance }) => {
  const classes = useStyles();

  const [output, setOutput] = useState("0");
  const inputRef = useRef(null);

  return (
    <Grid item xs={12}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.preventDefault();
          let etherAmount;
          etherAmount = inputRef.current.value.toString();
          etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
          buyTokens(etherAmount);
        }}
      >
        <Grid container 
        alignItems="center" 
        align="center" 
        rowSpacing={2}>
          <Grid item xs={12}>
            <Typography align="right">
              Balance: {window.web3.utils.fromWei(ethBalance, "Ether")}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              onChange={() => {
                const etherAmount = inputRef.current.value.toString();
                setOutput(etherAmount * 100);
              }}
              inputRef={inputRef}
              placeholder="0"
              required
              label="input"
            />
          </Grid>
          <Grid item xs={2}>
            <img src={ethLogo} height="32" alt="" />
            &nbsp;&nbsp;&nbsp; ETH
          </Grid>
          <Grid item xs={12}>
            <Typography align="right">
              Balance: {window.web3.utils.fromWei(tokenBalance, "Ether")}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              type="text"
              placeholder="0"
              value={output}
              disabled
              label="output"
              className={classes.output}
            />
          </Grid>
          <Grid item xs={2}  className={classes.output}>
            <img src={tokenLogo} height="32" alt="" />
            &nbsp; DApp
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography align="right">1 ETH = 100 DApp</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" type="submit">
            SWAP
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default BuyForm;
