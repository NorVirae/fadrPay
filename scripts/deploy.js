
const hre = require("hardhat");

const  main = async () => {
 
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

// 0x143715b6967ba4b29b1bA0c2da032e86B69cc2e6

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const runMain  = async () => {
  try{
      await main()
      process.exit(0)
  }
  catch(err){
    console.log(err)
    process.exit(1)
  }
}

runMain();
 
