require("@nomiclabs/hardhat-waffle")

const keys = require("./dev-keys.json")

module.exports = {
  solidity:"0.8.9",
  networks:{
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/" + keys.alchemyKey,
      accounts: [keys.accountPrivateKey] //turn it private
    }
  }
}