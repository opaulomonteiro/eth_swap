/* eslint-disable no-undef */
const { assert } = require('chai');

const EthSwap = artifacts.require('EthSwap.sol');
const Token = artifacts.require('Token.sol');

function tokens(n){
  return web3.utils.toWei(n,'ether')
}

contract('EthSwap', ([deployer, investor]) => {

  let token, ethSwap;

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    await token.transfer(ethSwap.address, tokens("1000000"));
  })

  describe('Token deployment', async () => {
    it('token has a name', async () => {
      const name = await token.name();
      assert.equal(name, 'DApp Token');
    })
  });

  describe('EthSwap deployment', async () => {
    it('contract has a name', async () => {
      const name = await ethSwap.name();
      assert.equal(name, 'EthSwap Instant Exchange');
    });

    it('contract has tokens', async() => {   
      const balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), tokens("1000000"));
    })
  });

  describe('buyTokens()', async () => {
    let result;
    before(async () => {
      result = await ethSwap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });
    });

    it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () =>{
      const investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens('100'));

      const ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(),tokens("999900"));

      const exchangeBalance = await web3.eth.getBalance(ethSwap.address)
      assert.equal(exchangeBalance.toString(), web3.utils.toWei('1', 'Ether'));

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amout.toString(), tokens('100').toString());
      assert.equal(event.rate.toString(), '100');
    })
  });

});
