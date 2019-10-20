'use strict'
let walletLib = require('@33cn/wallet-base');
let config = require('../config');

function getAccout() {
    let wallet = walletLib.seed.newWalletFromMnemonic(config.mnemonic);
    let account = wallet.newAccount();

    return account;
}

module.exports = {
    getAccout,
}
