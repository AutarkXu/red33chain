let httpClient = require('./httpclient');
let wallet33 = require('./wallet');
let fs = require('fs');
let walletLib = require('@33cn/wallet-base');
let config = require('../config');

async function getAbi() {
    let data = fs.readFileSync('../build/contracts/Basic.json');
    // console.log(data.toString());
    return JSON.parse(data.toString())['abi']
}

async function sendTx(tx) {
    let postData = {
        "jsonrpc": "2.0",
        // "id":int32,
        "method": "Chain33.SendTransaction",
        "params": [{"data": tx}]
    }

    let response = await httpClient.post(config.url, postData);
    let txid = JSON.parse(response['body'])['result'];
    // console.log(txid)
    return txid;
}

async function open() {

    let postData = {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "Chain33.CreateTransaction",
        "params": [
            {
                //注意这边execr需要写成合约地址
                "execer": "user.p.game.user.evm.0x50036fa86d16b77eab31ada9c1397ac0ea77409ec32e34298c0964a268856de2",
                "actionName": "CreateCall",
                "payload": {
                    "isCreate": false,
                    "name": "user.p.game.user.evm.0x50036fa86d16b77eab31ada9c1397ac0ea77409ec32e34298c0964a268856de2",
                    "abi": `switchCharge(true,true,true)`,
                    "fee": 10000000,
                }
            }
        ]
    };

    let response = await httpClient.post(config.url, postData);
    let rawTx = JSON.parse(response['body'])['result'];

    let accout = wallet33.getAccout();
    let signedTx = await walletLib.sign.signRawTransaction(rawTx, accout);

    let txid = await sendTx(signedTx);
    return txid;

}

open()
