const fs = require('fs');
const algosdk = require('algosdk');
const ethers = require('ethers');

async function updateEnv(variable_name, newMnemonic) {
    try {
      let content;
      try {
        content = await fs.promises.readFile('.env', 'utf8');
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('.env file does not exist, creating new .env file.');
          content = '';
        } else {
          throw error;
        }
      }
  
      const lines = content.split('\n');
      const existingIndex = lines.findIndex((line) => line.trim().startsWith(`${variable_name}=`));
  
      if (existingIndex !== -1) {
        lines[existingIndex] = `${variable_name}=${newMnemonic}`;
      } else {
        lines.push(`${variable_name}=${newMnemonic}`);
      }
      const newContent = lines.filter(line => line.trim() !== '').join('\n');
      await fs.promises.writeFile('.env', newContent, 'utf8');
  
      console.log(`${variable_name} updated successfully in .env file!`);
    } catch (error) {
      console.error('Error updating .env file:', error);
    }
  };

function setWallets(DEBUG_ENABLED = false){

    var keys = algosdk.generateAccount();
    // Secret keys to mnemonic
    var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);

    let randomWallet = ethers.Wallet.createRandom();

    if(DEBUG_ENABLED){
        console.log(`Mnemonic Phrase : ${mnemonic}`);
        console.log("New Eth wallet : ");
        console.log(randomWallet);
        console.log("\nPrivate key for ETH wallet :");
        console.log(randomWallet.privateKey);
        console.log("\Public key for ETH wallet :");
        console.log(randomWallet.publicKey);
        console.log("\Public key for ALGO wallet :");
        console.log(keys.addr);
    }

    return {
        algowallet : keys,
        ethwallet : randomWallet
    }
}

function algoToMnemonics(secret_key){
    return algosdk.secretKeyToMnemonic(secret_key);
}

function MnemonicsToAlgo(mnemonics){
    const account = algosdk.mnemonicToSecretKey(mnemonics);
    return account;
}

function fromPrivateToPublicKey(privateKey){
    const wallet =  new ethers.Wallet(privateKey);
    return wallet;
}

function logRequirements(algo_addr,eth_addr,etherium_rpc_link,bnb_rpc_link){
    console.log("--------------------------------------------------------------------------------------------------------");
    console.log("Now please head to https://bank.testnet.algorand.network/ and enter your ALGO wallet address");
    console.log(`Your ALGO wallet address is : ${algo_addr}`);
    console.log("\nNow also please head to https://goerlifaucet.com/ and enter your ETH wallet address\nPlease note that You need to have AT LEAST 0.001 ON THE MAINNET IN ORDER TO USE THIS FEATURE. If you dont have the required funds on the wallet either change your wallet address with the one you have, or transfer the required funds to your account!\n");
    console.log(`Your WALLET PUBLIC wallet address is : ${eth_addr}`);
    console.log("\nNow also please head to https://testnet.binance.org/faucet-smart and enter your ETH wallet address");
    console.log(`Your PUBLIC wallet address is : ${eth_addr}`);
    if(!etherium_rpc_link){
        // console.error("\n<<<!!!------------------------------------------------------------------------------------------------!!!>>>");
        console.error("ETH GOERLI RPC LINK NOT FOUND");
        console.error("It seems that you are missing etherium goerli testnet rpc link!");
        console.error("If you have this variable, please fill it under variables.js file");
        console.error("If you do not have a link, go to https://dashboard.alchemy.com/apps to create ETH Testnet Link");
        // console.error("<<<!!!------------------------------------------------------------------------------------------------!!!>>>");
    }
    if(!bnb_rpc_link){
        // console.error("\n<<<!!!------------------------------------------------------------------------------------------------!!!>>>");
        console.error("BNB RPC LINK NOT FOUND");
        console.error("It seems that you are missing BNB testnet rpc link!");
        console.error("If you have this variable, please fill it under variables.js file");
        console.error("If you do not have a link, go to https://dashboard.quicknode.com/endpoints to create BNB Testnet Link");
        // console.error("<<<!!!------------------------------------------------------------------------------------------------!!!>>>");
    }
    console.log("--------------------------------------------------------------------------------------------------------\n\n");
}

async function savetoenv(SAVE_ENABLED = false, mnemonic, eth_wallet_key, etherium_rpc_link, bnb_rpc_link) {
    if (SAVE_ENABLED) {
        try {
            await updateEnv('ALGO_WALLET_MNEMONIC', mnemonic);
            console.log('Environment variable for ALGO_WALLET_MNEMONIC has been updated successfully!');

            await updateEnv('ETH_WALLET_PRIVATE_KEY', eth_wallet_key);
            console.log('Environment variable for ETH_WALLET_PRIVATE_KEY has been updated successfully!');

            await updateEnv('BNB_WALLET_PRIVATE_KEY', eth_wallet_key);
            console.log('Environment variable for ETH_WALLET_PRIVATE_KEY has been updated successfully!');

            await updateEnv('PORT', 7890);
            console.log('Environment variable for PORT has been updated successfully!');

            if (etherium_rpc_link) {
                await updateEnv('ETH_ENDPOINT', etherium_rpc_link);
                console.log('Environment variable for ETH_ENDPOINT has been updated successfully!');
            }

            if (bnb_rpc_link) {
                await updateEnv('BNB_ENDPOINT', bnb_rpc_link);
                console.log('Environment variable for BNB_ENDPOINT has been updated successfully!');
            }
        } catch (err) {
            console.error("An error occurred during saving to the .env file", err);
        }
    }
}


module.exports = {
    updateEnv,
    setWallets,
    algoToMnemonics,
    MnemonicsToAlgo,
    fromPrivateToPublicKey,
    logRequirements,
    savetoenv
}