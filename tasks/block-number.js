const { task } = require("hardhat/config")

// we use this to get current block number or whatever blockchain we are working on
task("block-number", "Prints the current block number").setAction(
    // name, description
    // const blockTask = async function() => {}
    // async function blockTask() {}
    async (taskArgs, hre) => {
        // anonymous function is js
        // HRE is the hardhat runtime environment ..
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}
