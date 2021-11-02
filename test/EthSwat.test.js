const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("EthSwap", ([deployer, investor]) => {
  let token, ethSwap;

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    //1_000_000 => 1000000000000000000000000 (1 million)
    await token.transfer(ethSwap.address, tokens("1000000"));
  });

  describe("Token deployment", async () => {
    it("contract has name", async () => {
      const name = await token.name();
      assert.equal(name, "DApp Token");
    });
  });

  describe("EthSwap deployment", async () => {
    it("contract has name", async () => {
      const name = await ethSwap.name();
      assert.equal(name, "EthSwap Instant Exchange");
    });

    it("contracts has token", async () => {
      const balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), tokens("1000000"));
    });
  });

  describe("buyTokens", async () => {
    let result;
    before(async () => {
      result = await ethSwap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });
    });

    it("Allows user to instantly purchase tokens for a fix price", async () => {
        let investorBalance = await token.balanceOf(investor)
        assert.equal(investorBalance.toString(), tokens('100'))

        let ethSwapBallance = await token.balanceOf(ethSwap.address)
        assert.equal(ethSwapBallance.toString(), tokens('999900'))
        ethSwapBallance = await web3.eth.getBalance(ethSwap.address)
        assert.equal(ethSwapBallance.toString(), web3.utils.toWei('1', "Ether"))

        const event = result.logs[0].args

        assert.equal(event.account, investor)
        assert.equal(event.token, token.address)
        assert.equal(event.amount.toString(), tokens('100').toString())
        assert.equal(event.rate.toString(), '100')
    });
  });
});
