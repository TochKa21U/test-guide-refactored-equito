# Testing Guide Refactored

An Node.JS based package that handles creation of wallets and saving it into environment variables.

Simply install packages with

npm i

If you have some variables already such as rpc link or wallet addresses, edit it in the variables.js file

Then start with npm run start

If you dont have any of them you can just run npm run start and it will create wallet addresses for you. It will also prompt you to go to necessary places to 
create necessasry parts(Such as Quicknode for BNB Testchain link and Alchemy for ETH Goerli Network)

## Starting server

After running the script and setting up the environment variables, you can pull the docker containers by

docker compose up -d

Which will run it in the background

See the logs of container via

docker logs --follow equito-bridge

## Additional notes

I also kept Testing Guide.md file inside the folder as well, in case you might need to check some stuff
Also Alchemy and Quicknode providers pictures are kept as well, which you can use it to generate rpc link for 

- ETH Goerli
- BNB Testnet

All required variables can be set at variables.js