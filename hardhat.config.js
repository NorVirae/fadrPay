//https://eth-ropsten.alchemyapi.io/v2/VqPCWEeOByBn2PmmBBv8tLCFjw-LxQ25
require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks:{
    ropsten:{
      url:"https://eth-ropsten.alchemyapi.io/v2/VqPCWEeOByBn2PmmBBv8tLCFjw-LxQ25",
      accounts:['38a2c3d254a09a76726457ad5981001a65b9e9f834626a608a2a9b15c76912ef']
    }
  }
}