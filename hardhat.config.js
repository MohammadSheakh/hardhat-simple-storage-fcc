require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("./tasks/block-number")
require("@nomiclabs/hardhat-etherscan") // for automatic verification ..
// hardhat.org/plugins/nomiclabs-hardhat-etherscan.html
require("dotenv").config()
require("solidity-coverage")
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
    defaultNetwork: "hardhat",
    // default network hardhat it automatically comes with rpc url and private key
    // defaultNetword : "hardhat", // eita add kora jete pare
    // 😀 yarn hardhat run scripts/deploy.js --network hardhat
    // to add other networks ..
    networks: {
        // any other network section that we want ..
        hardhat: {},
        // amra goerly network niye kaj korbo ..
        goerli: {
            url: GOERLI_RPC_URL,
            // to add private keys
            accounts: [PRIVATE_KEY], // metamask theke real account er private key nite hobe ..
            chainId: 5, // chainId of the network .. for us goerli network ..
        },
        // we create a new network ..
        localhost: {
            url: "http://localhost:8545",
            chainId: 31337, // hardhat amader ke account provide korbe ..
        },
    },
    solidity: "0.8.8",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY, // 8 : 55 : 49
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
}
