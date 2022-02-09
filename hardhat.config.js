require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths:{
    artifacts:"./src/artifacts"
  },
  networks:{
    hardhat:{
      chainId:1337
    },
    ropsten:{
      url:"https://ropsten.infura.io/v3/ac27a9aca32d4cc291e2dfc387f2cb2a",
      accounts:["38a2c3d254a09a76726457ad5981001a65b9e9f834626a608a2a9b15c76912ef"]
    }
  }
};
