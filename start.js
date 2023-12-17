const utilities = require('./utils');
const varibles = require('./variables');


let etherium_rpc_link = varibles.ETH_TESTNET_LINK;
let bnb_rpc_link = varibles.BNB_TESTNET_LINK;
// If you dont have any wallet addresses leave it blank, if you have one but not another one, such as you have
// eth wallet but not algo then leave algo empty while filling the eth_wallet_private_key


let eth_wallet_private_key = varibles.ETH_WALLET_KEY;
let algo_wallet_private_key= varibles.ALGO_WALLET_KEY;


let SAVE_ENABLED=varibles.AUTO_SAVE_TO_ENV_FILE; // Set true or 1 for enabling auto saving to env variable

const walletObj = utilities.setWallets(false); // Set false for DEBUG DISABLED 
if(!eth_wallet_private_key) eth_wallet_private_key = walletObj.ethwallet.privateKey;
if(!algo_wallet_private_key) algo_wallet_private_key = walletObj.algowallet.sk;

const MNEMONIC = utilities.algoToMnemonics(algo_wallet_private_key);
const WALLET = utilities.fromPrivateToPublicKey(eth_wallet_private_key);
const ALGO_ACC = utilities.MnemonicsToAlgo(MNEMONIC);
utilities.logRequirements(ALGO_ACC.addr,WALLET.address,etherium_rpc_link,bnb_rpc_link);
utilities.savetoenv(SAVE_ENABLED,MNEMONIC,WALLET.privateKey,etherium_rpc_link,bnb_rpc_link);
