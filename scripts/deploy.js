// imports // 8 : 37 : 58
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
    // 1️⃣
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy() // we already deploy our simple storage contract
    await simpleStorage.deployed() // make sure it get deployed ..

    // to run this .. yarn hardhat run scripts/deploy.js

    console.log(`Deployed contract to: ${simpleStorage.address}`)
    //----------------------- 8 : 41 : 45 Network in hardhat .. 2️⃣
    // what happens when we deploy to our hardhat network?

    // automatic verify right after deploy // goerly er jonno 5
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await simpleStorage.deployTransaction.wait(6) // amra 6 ta block er confirmation porjonto wait korbo .
        // then verification process run korbo
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1) // we will wait one block for that transaction
    // to go through ..
    const updatedValue = await simpleStorage.retrieve() // updated value grab korlam.
    console.log(`Updated Value is: ${updatedValue}`)
}

// automatic verify right after deploy
// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
