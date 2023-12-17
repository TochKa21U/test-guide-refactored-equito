// If you dont have any wallet addresses leave it blank, if you have one but not another one, such as you have
// eth wallet but not algo then leave algo empty while filling the eth_wallet_private_key
// NOTE : YOUR ETH WALLET NEEDS TO HAVE AT LEAST 0.001 ETH IN THE MAINNET TO BE ABLE TO RETRIVE FUNDS FROM FAUCETS, OTHERWISE OPERATION WILL FAIL
const ETH_WALLET_KEY = "";
const ALGO_WALLET_KEY = "";

// TESTNET ONLY, WE WILL BE USING TESTNETS 
// IF YOU DONT HAVE ANY TESTNET LINK, VISIT THE LINKS BELOW

// ETH GOERLI TESTNET --> https://dashboard.alchemy.com/apps
// BNB TESTNET -- > https://dashboard.quicknode.com/endpoints
const ETH_TESTNET_LINK = "";
const BNB_TESTNET_LINK = "";


// ENABLE THIS TO OVERWRITE YOUR CURRENT .ENV FILE
const AUTO_SAVE_TO_ENV_FILE = true;

module.exports = {
    ETH_TESTNET_LINK,
    ETH_WALLET_KEY,
    ALGO_WALLET_KEY,
    BNB_TESTNET_LINK,
    AUTO_SAVE_TO_ENV_FILE
}