﻿﻿// Add ability to serialize BigInt as JSON
JSON.stringifyBigInt = function (obj) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString() + 'n';
        } else {
            return value;
        }
    })
}

JSON.parseBigInt = function (str) {
    return JSON.parse(str, (key, value) => {
        if (typeof value === 'string' && /^-?\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1));
        }
        return value;
    })
}

objAssign = function (to, from) {
    if (window.Vue) {
        for (let i in from) {
            Vue.set(to, i, from[i]);
        }
    }
    else {
        Object.assign(to, from);
    }
}

rpcToObj = function (rpc_obj, obj) {
    if (!obj) {
        obj = {};
    }
    for (let i in rpc_obj) {
        if (isNaN(i)) {
            // Not always correct, but overall useful
            try {
                obj[i] = isNaN(rpc_obj[i]) || i.indexOf("name") != -1 || i.indexOf("symbol") != -1
                    || (typeof (rpc_obj[i]) == "boolean")
                    || (typeof (rpc_obj[i]) == "string" && rpc_obj[i].startsWith("0x"))
                    || (typeof (rpc_obj[i]) == "object")
                    ? rpc_obj[i]
                    : BigInt(rpc_obj[i]);
            } catch (e) {
                console.log('pcToObj error', rpc_obj[i], typeof(rpc_obj[i]))
            }
        }
    }
    return obj;
}

// Makes calling contracts easier, by adding the contracts to every instance of Web3.
// Changing the network is automatically dealt with.
// New way of using: web3.contract_name.method_name(parameters).call() or .send()
function addContract(name, abi, addresses) {
    Object.defineProperty(Web3.prototype, name, {
        get: function () {
            let web3 = this;
            return new Proxy({}, {
                get: function (target, method) {
                    if (method == "address") {
                        return addresses[web3.currentProvider.chainId];
                    }

                    return function (...params) {
                        let contract = new web3.eth.Contract(abi, addresses[web3.currentProvider.chainId]);
                        return contract.methods[method](...params)
                    }
                }
            });
        }
    });
}

Web3.prototype.contract = function (abi_name, address) {
    return new this.eth.Contract(abis[abi_name], address);
}

// Add a decode method to all web3 instances
// To get the ABI decoder, use web3.decode.abi_name
Object.defineProperty(Web3.prototype, "decode", {
    get: function () {
        let web3 = this;
        return new Proxy({}, {
            get: function (target, name) {
                let decoder = new Decoder(web3);
                decoder.addABI(abis[name]);
                return decoder;
            }
        });
    }
});

Object.defineProperty(Web3.prototype, "ens", {
    get: function () {
        return new ENS(this);
    }
})

const MAX_INT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

async function signERC2612Permit(web3, token, owner, spender, value, deadline, nonce) {
    const message = {
        owner,
        spender,
        value,
        nonce: nonce || await web3.contract('pair', token).methods.nonces(owner).call(),
        deadline: deadline || MAX_INT
    }
    
    const typedData = {
        types: {
            EIP712Domain: [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" },
                { name: "verifyingContract", type: "address" },
            ],
            Permit: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" },
            ],
        },
        primaryType: "Permit",
        domain: {
            name: await web3.contract('erc20', token).methods.name().call(),
            version: '1',
            chainId: 1,
            verifyingContract: token
        },
        message: message
    };    

    return new Promise((resolutionFunc, rejectionFunc) => {
        web3.currentProvider.sendAsync({ method: "eth_signTypedData_v4", params: [owner, JSON.stringify(typedData)], from: owner }, function (error, result) {
            if (!error) {
                const signature = result.result.substring(2);
                const r = "0x" + signature.substring(0, 64);
                const s = "0x" + signature.substring(64, 128);
                const v = parseInt(signature.substring(128, 130), 16);
                resolutionFunc({ r, s, v, deadline: message.deadline });
            }
        });
    });
};

// ABIs
abis = {
    erc20: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }],
    sushi: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" }], "name": "DelegateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "DelegateVotesChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DELEGATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint32", "name": "", "type": "uint32" }], "name": "checkpoints", "outputs": [{ "internalType": "uint32", "name": "fromBlock", "type": "uint32" }, { "internalType": "uint256", "name": "votes", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }], "name": "delegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "delegateBySig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegator", "type": "address" }], "name": "delegates", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getCurrentVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }], "name": "getPriorVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "numCheckpoints", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    chef: [{ "inputs": [{ "internalType": "contract SushiToken", "name": "_sushi", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "uint256", "name": "_sushiPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_bonusEndBlock", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_lpToken", "type": "address" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "bonusEndBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_devaddr", "type": "address" }], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "migrate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "migrator", "outputs": [{ "internalType": "contract IMigratorChef", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingSushi", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IERC20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accSushiPerShare", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IMigratorChef", "name": "_migrator", "type": "address" }], "name": "setMigrator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sushi", "outputs": [{ "internalType": "contract SushiToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sushiPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    factory: [{ "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "PairCreated", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allPairs", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "allPairsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }], "name": "createPair", "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feeToSetter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "getPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "migrator", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pairCodeHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "name": "setFeeToSetter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_migrator", "type": "address" }], "name": "setMigrator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    pair: [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "burn", "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "kLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "price0CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "price1CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "swap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sync", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }],
    router: [{ "inputs": [{ "internalType": "address", "name": "_factory", "type": "address" }, { "internalType": "address", "name": "_WETH", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "WETH", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "amountADesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountBDesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "addLiquidity", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amountTokenDesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "addLiquidityETH", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "reserveIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }], "name": "getAmountIn", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveIn", "type": "uint256" }, { "internalType": "uint256", "name": "reserveOut", "type": "uint256" }], "name": "getAmountOut", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsIn", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }], "name": "getAmountsOut", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "reserveA", "type": "uint256" }, { "internalType": "uint256", "name": "reserveB", "type": "uint256" }], "name": "quote", "outputs": [{ "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidity", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidityETH", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "removeLiquidityETHSupportingFeeOnTransferTokens", "outputs": [{ "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityETHWithPermit", "outputs": [{ "internalType": "uint256", "name": "amountToken", "type": "uint256" }, { "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens", "outputs": [{ "internalType": "uint256", "name": "amountETH", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityWithPermit", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapETHForExactTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactETHForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "payable", "type": "function" }, {
        "inputs": [{ "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactETHForTokensSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "payable", "type": "function"
    }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForETH", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForETHSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokensForExactETH", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMax", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapTokensForExactTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }],
    bar: [{ "inputs": [{ "internalType": "contract IERC20", "name": "_sushi", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "enter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_share", "type": "uint256" }], "name": "leave", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sushi", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }],
    maker: [{ "inputs": [{ "internalType": "contract IUniswapV2Factory", "name": "_factory", "type": "address" }, { "internalType": "address", "name": "_bar", "type": "address" }, { "internalType": "address", "name": "_sushi", "type": "address" }, { "internalType": "address", "name": "_weth", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "bar", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token0", "type": "address" }, { "internalType": "address", "name": "token1", "type": "address" }], "name": "convert", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "contract IUniswapV2Factory", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sushi", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "weth", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }],
    timelock: [{ "inputs": [{ "internalType": "address", "name": "admin_", "type": "address" }, { "internalType": "uint256", "name": "delay_", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "txHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "signature", "type": "string" }, { "indexed": false, "internalType": "bytes", "name": "data", "type": "bytes" }, { "indexed": false, "internalType": "uint256", "name": "eta", "type": "uint256" }], "name": "CancelTransaction", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "txHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "signature", "type": "string" }, { "indexed": false, "internalType": "bytes", "name": "data", "type": "bytes" }, { "indexed": false, "internalType": "uint256", "name": "eta", "type": "uint256" }], "name": "ExecuteTransaction", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "newDelay", "type": "uint256" }], "name": "NewDelay", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "txHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "target", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "signature", "type": "string" }, { "indexed": false, "internalType": "bytes", "name": "data", "type": "bytes" }, { "indexed": false, "internalType": "uint256", "name": "eta", "type": "uint256" }], "name": "QueueTransaction", "type": "event" }, { "inputs": [], "name": "GRACE_PERIOD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAXIMUM_DELAY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINIMUM_DELAY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "acceptAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "admin_initialized", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "string", "name": "signature", "type": "string" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "uint256", "name": "eta", "type": "uint256" }], "name": "cancelTransaction", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "delay", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "string", "name": "signature", "type": "string" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "uint256", "name": "eta", "type": "uint256" }], "name": "executeTransaction", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "pendingAdmin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "string", "name": "signature", "type": "string" }, { "internalType": "bytes", "name": "data", "type": "bytes" }, { "internalType": "uint256", "name": "eta", "type": "uint256" }], "name": "queueTransaction", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "queuedTransactions", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "delay_", "type": "uint256" }], "name": "setDelay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "pendingAdmin_", "type": "address" }], "name": "setPendingAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }],

    poolnames: [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "logos", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "names", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "string", "name": "logo", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }], "name": "setPoolInfo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    tokenInfo: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "token", "type": "address" }], "name": "change", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "address[]", "name": "extra", "type": "address[]" }], "name": "getBalances", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct BoringCryptoTokenScanner.Balance[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "extra", "type": "address[]" }], "name": "getInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }], "internalType": "struct BoringCryptoTokenScanner.TokenInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "address[]", "name": "extra", "type": "address[]" }], "name": "getSpecificBalances", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct BoringCryptoTokenScanner.Balance[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "extra", "type": "address[]" }], "name": "getSpecificInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }], "internalType": "struct BoringCryptoTokenScanner.TokenInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "remove", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "tokenCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "tokens", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    baseInfo: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "getInfo", "outputs": [{ "components": [{ "internalType": "uint256", "name": "BONUS_MULTIPLIER", "type": "uint256" }, { "internalType": "uint256", "name": "bonusEndBlock", "type": "uint256" }, { "internalType": "address", "name": "devaddr", "type": "address" }, { "internalType": "address", "name": "migrator", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "startBlock", "type": "uint256" }, { "internalType": "address", "name": "sushi", "type": "address" }, { "internalType": "uint256", "name": "sushiPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "totalAllocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "sushiTotalSupply", "type": "uint256" }, { "internalType": "address", "name": "sushiOwner", "type": "address" }], "internalType": "struct BaseInfo", "name": "", "type": "tuple" }, { "components": [{ "internalType": "string", "name": "logo", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "contract IUniswapPair", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accSushiPerShare", "type": "uint256" }, { "internalType": "contract IERC20", "name": "token0", "type": "address" }, { "internalType": "contract IERC20", "name": "token1", "type": "address" }, { "internalType": "string", "name": "token0name", "type": "string" }, { "internalType": "string", "name": "token1name", "type": "string" }, { "internalType": "string", "name": "token0symbol", "type": "string" }, { "internalType": "string", "name": "token1symbol", "type": "string" }, { "internalType": "uint256", "name": "token0decimals", "type": "uint256" }, { "internalType": "uint256", "name": "token1decimals", "type": "uint256" }], "internalType": "struct PoolInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "names_", "type": "address" }, { "internalType": "address", "name": "masterChef_", "type": "address" }], "name": "setContracts", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    userInfo: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "getETHRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMyInfoInUSDT", "outputs": [{ "components": [{ "internalType": "uint256", "name": "block", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "eth_rate", "type": "uint256" }, { "internalType": "uint256", "name": "sushiBalance", "type": "uint256" }, { "internalType": "address", "name": "delegates", "type": "address" }, { "internalType": "uint256", "name": "currentVotes", "type": "uint256" }, { "internalType": "uint256", "name": "nonces", "type": "uint256" }], "internalType": "struct UserInfo", "name": "", "type": "tuple" }, { "components": [{ "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accSushiPerShare", "type": "uint256" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "uniBalance", "type": "uint256" }, { "internalType": "uint256", "name": "uniTotalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "uniAllowance", "type": "uint256" }, { "internalType": "uint256", "name": "reserve0", "type": "uint256" }, { "internalType": "uint256", "name": "reserve1", "type": "uint256" }, { "internalType": "uint256", "name": "token0rate", "type": "uint256" }, { "internalType": "uint256", "name": "token1rate", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }, { "internalType": "uint256", "name": "pending", "type": "uint256" }], "internalType": "struct UserPoolInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "address", "name": "currency", "type": "address" }], "name": "getUserInfo", "outputs": [{ "components": [{ "internalType": "uint256", "name": "block", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "eth_rate", "type": "uint256" }, { "internalType": "uint256", "name": "sushiBalance", "type": "uint256" }, { "internalType": "address", "name": "delegates", "type": "address" }, { "internalType": "uint256", "name": "currentVotes", "type": "uint256" }, { "internalType": "uint256", "name": "nonces", "type": "uint256" }], "internalType": "struct UserInfo", "name": "", "type": "tuple" }, { "components": [{ "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accSushiPerShare", "type": "uint256" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "uniBalance", "type": "uint256" }, { "internalType": "uint256", "name": "uniTotalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "uniAllowance", "type": "uint256" }, { "internalType": "uint256", "name": "reserve0", "type": "uint256" }, { "internalType": "uint256", "name": "reserve1", "type": "uint256" }, { "internalType": "uint256", "name": "token0rate", "type": "uint256" }, { "internalType": "uint256", "name": "token1rate", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }, { "internalType": "uint256", "name": "pending", "type": "uint256" }], "internalType": "struct UserPoolInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "uniFactory_", "type": "address" }, { "internalType": "address", "name": "masterChef_", "type": "address" }, { "internalType": "address", "name": "sushi_", "type": "address" }, { "internalType": "address", "name": "WETH_", "type": "address" }], "name": "setContracts", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    makerInfo: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "contract IFactory", "name": "factory", "type": "address" }, { "internalType": "address", "name": "token", "type": "address" }], "name": "getETHRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "contract IFactory", "name": "factory", "type": "address" }], "name": "getPair", "outputs": [{ "components": [{ "internalType": "string", "name": "logo", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "contract IPair", "name": "lpToken", "type": "address" }, { "internalType": "contract IERC20", "name": "token0", "type": "address" }, { "internalType": "contract IERC20", "name": "token1", "type": "address" }, { "internalType": "string", "name": "token0name", "type": "string" }, { "internalType": "string", "name": "token1name", "type": "string" }, { "internalType": "string", "name": "token0symbol", "type": "string" }, { "internalType": "string", "name": "token1symbol", "type": "string" }, { "internalType": "uint256", "name": "token0decimals", "type": "uint256" }, { "internalType": "uint256", "name": "token1decimals", "type": "uint256" }, { "internalType": "uint256", "name": "makerBalance", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "reserve0", "type": "uint256" }, { "internalType": "uint256", "name": "reserve1", "type": "uint256" }, { "internalType": "uint256", "name": "token0rate", "type": "uint256" }, { "internalType": "uint256", "name": "token1rate", "type": "uint256" }], "internalType": "struct PairInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "pids", "type": "uint256[]" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "contract IFactory", "name": "factory", "type": "address" }], "name": "getPairs", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "components": [{ "internalType": "string", "name": "logo", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "contract IPair", "name": "lpToken", "type": "address" }, { "internalType": "contract IERC20", "name": "token0", "type": "address" }, { "internalType": "contract IERC20", "name": "token1", "type": "address" }, { "internalType": "string", "name": "token0name", "type": "string" }, { "internalType": "string", "name": "token1name", "type": "string" }, { "internalType": "string", "name": "token0symbol", "type": "string" }, { "internalType": "string", "name": "token1symbol", "type": "string" }, { "internalType": "uint256", "name": "token0decimals", "type": "uint256" }, { "internalType": "uint256", "name": "token1decimals", "type": "uint256" }, { "internalType": "uint256", "name": "makerBalance", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "reserve0", "type": "uint256" }, { "internalType": "uint256", "name": "reserve1", "type": "uint256" }, { "internalType": "uint256", "name": "token0rate", "type": "uint256" }, { "internalType": "uint256", "name": "token1rate", "type": "uint256" }], "internalType": "struct PairInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sushiMaker_", "type": "address" }, { "internalType": "address", "name": "sushi_", "type": "address" }, { "internalType": "address", "name": "masterChef_", "type": "address" }, { "internalType": "address", "name": "names_", "type": "address" }, { "internalType": "address", "name": "WETH_", "type": "address" }], "name": "setContracts", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    dashboard: [{ "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "address[]", "name": "addresses", "type": "address[]" }], "name": "findBalances", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct BoringCryptoTokenScanner.Balance[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "contract IFactory", "name": "factory", "type": "address" }, { "internalType": "uint256", "name": "fromID", "type": "uint256" }, { "internalType": "uint256", "name": "toID", "type": "uint256" }], "name": "findPairs", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "token0", "type": "address" }, { "internalType": "address", "name": "token1", "type": "address" }], "internalType": "struct BoringCryptoTokenScanner.Pair[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "address[]", "name": "addresses", "type": "address[]" }, { "internalType": "contract IFactory", "name": "factory", "type": "address" }, { "internalType": "address", "name": "currency", "type": "address" }], "name": "getBalances", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "rate", "type": "uint256" }], "internalType": "struct BoringCryptoTokenScanner.BalanceFull[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract IFactory[]", "name": "addresses", "type": "address[]" }], "name": "getFactoryInfo", "outputs": [{ "components": [{ "internalType": "contract IFactory", "name": "factory", "type": "address" }, { "internalType": "uint256", "name": "allPairsLength", "type": "uint256" }, { "internalType": "address", "name": "feeTo", "type": "address" }, { "internalType": "address", "name": "feeToSetter", "type": "address" }], "internalType": "struct BoringCryptoTokenScanner.Factory[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract IFactory", "name": "factory", "type": "address" }, { "internalType": "uint256", "name": "fromID", "type": "uint256" }, { "internalType": "uint256", "name": "toID", "type": "uint256" }], "name": "getPairs", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "token0", "type": "address" }, { "internalType": "address", "name": "token1", "type": "address" }], "internalType": "struct BoringCryptoTokenScanner.Pair[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "address[]", "name": "addresses", "type": "address[]" }], "name": "getPairsFull", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "token0", "type": "address" }, { "internalType": "address", "name": "token1", "type": "address" }, { "internalType": "uint256", "name": "reserve0", "type": "uint256" }, { "internalType": "uint256", "name": "reserve1", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct BoringCryptoTokenScanner.PairFull[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "addresses", "type": "address[]" }], "name": "getTokenInfo", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "decimals", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }], "internalType": "struct BoringCryptoTokenScanner.TokenInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }],
    dashboard2: [{ "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "uint256[]", "name": "pids", "type": "uint256[]" }], "name": "findPools", "outputs": [{ "components": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "contract IPair", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "address", "name": "token0", "type": "address" }, { "internalType": "address", "name": "token1", "type": "address" }], "internalType": "struct BoringCryptoDashboardV2.PoolInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "getETHRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "address[]", "name": "addresses", "type": "address[]" }], "name": "getPairsFull", "outputs": [{ "components": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "token0", "type": "address" }, { "internalType": "address", "name": "token1", "type": "address" }, { "internalType": "uint256", "name": "reserve0", "type": "uint256" }, { "internalType": "uint256", "name": "reserve1", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }], "internalType": "struct BoringCryptoDashboardV2.PairFull[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "pids", "type": "uint256[]" }], "name": "getPools", "outputs": [{ "components": [{ "internalType": "uint256", "name": "totalAllocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "poolLength", "type": "uint256" }], "internalType": "struct BoringCryptoDashboardV2.PoolsInfo", "name": "", "type": "tuple" }, { "components": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "contract IPair", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "address", "name": "token0", "type": "address" }, { "internalType": "address", "name": "token1", "type": "address" }], "internalType": "struct BoringCryptoDashboardV2.PoolInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "uint256[]", "name": "pids", "type": "uint256[]" }], "name": "pollPools", "outputs": [{ "components": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "lpBalance", "type": "uint256" }, { "internalType": "uint256", "name": "lpTotalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "lpAllowance", "type": "uint256" }, { "internalType": "uint256", "name": "reserve0", "type": "uint256" }, { "internalType": "uint256", "name": "reserve1", "type": "uint256" }, { "internalType": "uint256", "name": "token0rate", "type": "uint256" }, { "internalType": "uint256", "name": "token1rate", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }, { "internalType": "uint256", "name": "pending", "type": "uint256" }], "internalType": "struct BoringCryptoDashboardV2.UserPoolInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }],
    pending: [{ "inputs": [{ "internalType": "address", "name": "who", "type": "address" }, { "internalType": "uint256[]", "name": "pids", "type": "uint256[]" }], "name": "getPendingSushi", "outputs": [{ "components": [{ "internalType": "uint256", "name": "totalAllocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "poolLength", "type": "uint256" }], "internalType": "struct BoringSushiPending.PoolsInfo", "name": "", "type": "tuple" }, { "components": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }, { "internalType": "address", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "pendingSushi", "type": "uint256" }], "internalType": "struct BoringSushiPending.PoolInfo[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }],
    univ2tosushi: [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"drain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxGasPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IUniswapV2Pair","name":"uniPair","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"name":"migrate","outputs":[{"internalType":"uint256","name":"newLiquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrateRefund","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"newPairRefund","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IUniswapV2Pair","name":"uniPair","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permitAndMigrate","outputs":[{"internalType":"uint256","name":"newLiquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"migrateRefund_","type":"uint256"},{"internalType":"uint256","name":"newPairRefund_","type":"uint256"},{"internalType":"uint256","name":"maxGasPrice_","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
}

// Registered contracts
addContract("sushi", abis.sushi, { "0x1": "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2", "0x3": "0x81db9c598b3ebbdc92426422fc0a1d06e77195ec" });
addContract("chef", abis.chef, { "0x1": "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd", "0x3": "0xFF281cEF43111A83f09C656734Fa03E6375d432A" });
addContract("factory", abis.factory, { "0x1": "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac", "0x3": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" });
addContract("router", abis.router, { "0x1": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", "0x3": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" });
addContract("bar", abis.bar, { "0x1": "0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272", "0x3": "" });
addContract("maker", abis.maker, { "0x1": "0x280ac711bb99de7c73fb70fb6de29846d5e4207f", "0x3": "" });
addContract("timelock", abis.timelock, { "0x1": "0x9a8541ddf3a932a9a922b607e9cf7301f1d47bd1" })

addContract("tokenInfo", abis.tokenInfo, { "0x1": "0x0254804A96beE6D5136F283998268Ed8ba8930B7", "0x3": "0xd9145CCE52D386f254917e481eB44e9943F39138" });
addContract("poolnames", abis.poolnames, { "0x1": "0xb373a5def62A907696C0bBd22Dc512e2Fc8cfC7E", "0x3": "0x7685f4c573cE27C94F6aF70B330C29b9c41B8290" });
addContract("baseInfo", abis.baseInfo, { "0x1": "0xBb7dF27209ea65Ae02Fe02E76cC1C0247765dcFF", "0x3": "0x39Bb002c6400f7F1679090fdAc722BC08e2a8C1e" });
addContract("userInfo", abis.userInfo, { "0x1": "0x39Ec6247dE60d885239aD0bcE1bC9f1553f4EF75", "0x3": "0xe8f852908A61e074032382E9B5058F86fe2a0ea7" });
addContract("makerInfo", abis.makerInfo, { "0x1": "0x001c92D884fe654A6C5438fa85a222aA400C1999", "0x3": "" });
addContract("dashboard", abis.dashboard, { "0x1": "0xD132Ce8eA8865348Ac25E416d95ab1Ba84D216AF", "0x3": "0xC95678C10CB8b3305b694FF4bfC14CDB8aD3AB35" });
addContract("dashboard2", abis.dashboard2, { "0x1": "0x1B13fC91c6f976959E7c236Ac1CF17E052d113Fc", "0x3": "0xbB7091524A6a42228E396480C9C43f1C4f6c50e2" });
addContract("pending", abis.pending, { "0x1": "0x9aeadfE6cd03A2b5730474bF6dd79802d5bCD029" });
addContract("univ2tosushi", abis.univ2tosushi, { "0x1": "0x81660B6731bEa5f9c08266331241c900bF2936FC" });

window.DB = {
    get: function (key, callback) {
        if (typeof (Storage) !== "undefined") {
            let data = JSON.parseBigInt(localStorage.getItem(key));
            callback(data);
            return true;
        }
        return false;
    },
    set: function (key, data) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(key, JSON.stringifyBigInt(data));
            return true;
        }
        return false;
    },
    del: function (key) {
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    },
    clear: function () {
        if (typeof (Storage) !== "undefined") {
            localStorage.clear();
            return true;
        }
        return false;
    }
}

DB.get("version", version => {
    if (version != 1) {
        DB.clear();
        DB.set("version", 1);
    }
});

class LogMonitor {
    constructor(manager, address, topics, process, output, version, status, step, abi, onSynced) {
        this.manager = manager;
        this.web3 = manager.web3;
        this.address = address;
        this.topics = topics.map(t => t === null ? t : (t.length == 42 ? '0x000000000000000000000000' + t.substr(2) : t));
        this.process = process;
        this.key = address + JSON.stringify(topics) + version;
        this.status = status;
        this.step = step;
        this.onSynced = onSynced;

        this.output = output || [];
        this.seen = {};
        this.local = [];
        this.lastBlock = 10750000;
        this.should_close = false;
        DB.get(this.key, (data) => {
            if (data) {
                this.lastBlock = data.lastBlock;
                this.local = data.output;
                this.output.push(...data.output);
            }
        })
        if (abi) {
            this.decoder = new Decoder(this.web3);
            this.decoder.addABI(abi);
        }
    }

    async init() {
        //console.log(this.topics)
        this._getPastLogsAndSubscribe()
    }

    async _getPastLogs(params) {
        let raw_logs = null;
        let oldParams = {};
        Object.assign(oldParams, params);
        while (!raw_logs) {
            try {
                let raw_logs = await this.web3.eth.getPastLogs(params);
                Object.assign(params, oldParams);
                return raw_logs;
            }
            catch (e) {
                if (e.code == -32005) {
                    Object.assign(params, oldParams);
                    params.toBlock -= Math.floor((params.toBlock - params.fromBlock) / 1.25);
                }
                else {
                    throw e;
                }
            }
        }
    }

    async _getPastLogsAndSubscribe() {
        let finished = false;
        while (!finished && !this.should_close) {
            let params = {
                fromBlock: this.lastBlock + 1,
                address: this.address,
                topics: this.topics
            }
            if (this.step && this.lastBlock + this.step < this.manager.block) {
                params.toBlock = this.lastBlock + this.step;
            }
            else { finished = true; }
            let raw_logs = await this._getPastLogs(params);

            if (this.status && raw_logs.length) { this.status.loading = true; }
            for (var i in raw_logs) {
                await this._processLog(raw_logs[i]);
                if (this.should_close) { break; }
            }

            this._save();

            if (params.toBlock) {
                this.lastBlock = params.toBlock;
                finished = false;
            }
        }

        if (this.status) { this.status.loading = false; }

        if (this.should_close) { console.log("Skip Subscribe"); return; };
        console.log("Subscribe");
        if (this.onSynced) { await this.onSynced() };

        this.subscription = this.web3.eth.subscribe('logs', { address: this.address, topics: this.topics }, async (error, log) => {
            if (!error) {
                await this._processLog(log);
                if (this.onSynced) { await this.onSynced() };
                this._save();
            } else {
                this.subscription = null;
            }
        });
    }

    async _processLog(log) {
        if (!this.seen[log.blockNumber + "-" + log.logIndex]) {
            let row = {
                block: log.blockNumber,
                txid: log.transactionHash
            }
            let decoded = null;
            if (this.decoder) {
                decoded = this.decoder.decodeLog(log);
                decoded.events.forEach(e => decoded[e.name] = e.value);
            }
            let result = await this.process(log, this.web3, row, rpcToObj(decoded));
            if (result) {
                this.local.push(result);
                this.output.push(result);
                this.lastBlock = Math.max(this.lastBlock, log.blockNumber);
            }
        }
        this.seen[log.blockNumber + "-" + log.logIndex] = true;
    }

    async _save() {
        DB.set(this.key, {
            lastBlock: this.lastBlock,
            output: this.local
        });
    }

    refresh() {
        if (this.subscription) {
            DB.del(this.key);
            this.output.length = 0;
            this.seen = {};
            this.local = [];
            this.lastBlock = 10750000;

            this.subscription.unsubscribe((error, success) => {
                if (success) {
                    this.subscription = null;
                    this._getPastLogsAndSubscribe();
                }
            });
        }
    }

    close() {
        this.should_close = true;
        if (this.subscription) {
            console.log("Unsubscribe");
            this.subscription.unsubscribe((error, success) => {
                if (success) {
                    this.subscription = null;
                }
            });
        }
    }
}

class Web3Component {
    constructor(options) {
        this.options = options;
    }

    get web3() {
        return this.options.web3;
    }

    get address() {
        return this.options.address;
    }

    get currency() {
        return this.options.currency;
    }

    get chainId() {
        return this.options.chainId;
    }
}

class SushiPools extends Web3Component {
    constructor(options) {
        super(options);

        this.base = { loaded: false };
        this.pools = [];
    }

    ETHtoCurrency(value) {
        return value * this.base.eth_rate / BigInt("1000000000000000000");
    }

    async getInfo(currency) {
        if (!this.base.loaded) {
            var result = await this.web3.baseInfo.getInfo().call();
            this.base = {};
            this.base.BONUS_MULTIPLIER = BigInt(result[0].BONUS_MULTIPLIER);    // Multiplier during the bonus period
            this.base.bonusEndBlock = BigInt(result[0].bonusEndBlock);          // Last block of the bonus period
            this.base.devaddr = result[0].devaddr;                              // Address that receives 10% of SUSHI distributed
            this.base.migrator = result[0].migrator;                            // Address of migration contract
            this.base.owner = result[0].owner;                                  // Address of the owner of the masterchef contract
            this.base.startBlock = BigInt(result[0].startBlock);                // Block at which SUSHI distribution started
            this.base.sushi = result[0].sushi;                                  // Address of the sushi token contract
            this.base.sushiPerBlock = BigInt(result[0].sushiPerBlock);          // Base number of sushi distributed per block (not including dev share)
            this.base.totalAllocPoint = BigInt(result[0].totalAllocPoint);      // Total allocPoints of all pools, this must match adding all the pool allocPoints

            this.base.sushiTotalSupply = BigInt(result[0].sushiTotalSupply);    // Total amount of minted SUSHI
            this.base.sushiOwner = result[0].sushiOwner;                        // Owner of the SUSHI token contract

            this.pools = [];
            for (var i in result[1]) {
                let pool = {};
                pool.id = this.pools.length;
                pool.logo = result[1][i].logo;                                  // The character used as logo for the pool
                pool.name = result[1][i].name;                                  // The name of the pool, like Tutle Tether
                pool.lpToken = result[1][i].lpToken;                            // Address of LP token contract. Currently uniswap, soon SushiSwap
                pool.allocPoint = BigInt(result[1][i].allocPoint);              // How many allocation points assigned to this pool. Share of allocPoints out of total determines sushi/block.
                pool.lastRewardBlock = BigInt(result[1][i].lastRewardBlock);    // Last block number that SUSHIs accululation occured.
                pool.accSushiPerShare = BigInt(result[1][i].accSushiPerShare);  // Accumulated SUSHIs per share, times 1e12.
                pool.token0 = result[1][i].token0;                              // Token address (first) of the token in the LP pair
                pool.token1 = result[1][i].token1;                              // Token address (second) of the token in the LP pair
                pool.token0name = result[1][i].token0name;                      // Name of the first token
                pool.token1name = result[1][i].token1name;                      // Name of the second token
                pool.token0symbol = result[1][i].token0symbol;                  // Symbol of the first token
                pool.token1symbol = result[1][i].token1symbol;                  // Symbol of the second token
                pool.token0decimals = BigInt(result[1][i].token0decimals);      // Decimals of the first token
                pool.token1decimals = BigInt(result[1][i].token1decimals);      // Decimals of the scond token
                this.pools.push(pool);
            }
        }

        var result = await this.web3.userInfo.getUserInfo(this.address, currency).call();
        this.base.block = BigInt(result[0].block);                              // The block for which this info it valid
        this.base.timestamp = BigInt(result[0].timestamp);                      // The timestamp of that block?
        this.base.eth_rate = BigInt(result[0].eth_rate);                        // The 'price' of 1 wrapped Ether expressed in currency token
        this.base.sushiBalance = BigInt(result[0].sushiBalance);                // User's balance of SUSHI (not pending)
        this.base.delegates = result[0].delegates;                              // See smart contract, just included it for completeness
        this.base.currentVotes = BigInt(result[0].currentVotes);                // See smart contract, just included it for completeness
        this.base.nonces = BigInt(result[0].nonces);                            // See smart contract, just included it for completeness
        this.base.pending = BigInt(0);                                          // Total pending SUSHI
        this.base.multiplier = this.base.block < this.base.bonusEndBlock ? this.base.BONUS_MULTIPLIER : BigInt(1);  // Current base multiplier

        this.base.sushiRate = BigInt(result[1][12].token0rate);                 // The amount of SUSHIs in 1 wrapped Ether, times 1e18. This is taken from the ETH/SUSHI pool
        this.base.sushiValueInETH = BigInt("1000000000000000000") * BigInt("1000000000000000000") / this.base.sushiRate
        this.base.sushiValueInCurrency = this.ETHtoCurrency(this.base.sushiValueInETH);

        for (i in result[1]) {
            let pool = this.pools[i];
            pool.lastRewardBlock = BigInt(result[1][i].lastRewardBlock);        // Last block number that SUSHIs accululation occured
            pool.accSushiPerShare = BigInt(result[1][i].accSushiPerShare);      // Accumulated SUSHIs per share, times 1e12
            pool.balance = BigInt(result[1][i].balance);                        // User's balance of pool tokens staked in the Masterchef contract
            pool.totalSupply = BigInt(result[1][i].totalSupply);                // Total balance of pool tokens in the Masterchef contract
            pool.uniBalance = BigInt(result[1][i].uniBalance);                  // Users's balance of lp tokens not staked
            pool.uniTotalSupply = BigInt(result[1][i].uniTotalSupply);          // TotalSupply of lp tokens
            pool.reserve0 = BigInt(result[1][i].reserve0);                      // Reserve of token0 in lp token pool
            pool.reserve1 = BigInt(result[1][i].reserve1);                      // Reserve of token1 in lp token pool
            pool.token0rate = BigInt(result[1][i].token0rate);                  // The amount of token0 in 1 wrapped Ether, times 1e18.
            pool.token1rate = BigInt(result[1][i].token1rate);                  // The amount of token1 in 1 wrapped Ether, times 1e18.
            pool.rewardDebt = BigInt(result[1][i].rewardDebt);                  // Used internally to calculate pending SUSHI, just use pending.
            pool.pending = BigInt(result[1][i].pending);                        // Pending SUSHI
            this.base.pending += pool.pending;

            pool.sushiReward = this.base.sushiPerBlock * this.base.multiplier * pool.allocPoint / this.base.totalAllocPoint;  // SUSHI rewarded to this pool every block
            pool.sushiRewardInETH = pool.sushiReward * BigInt("1000000000000000000") / this.base.sushiRate;                 // SUSHI value rewarded to this pool every block in ETH
            pool.sushiRewardInCurrency = pool.sushiRewardInETH * this.base.eth_rate / BigInt("1000000000000000000");        // SUSHI value rewarded to this pool every block in currncy tokens
            pool.devShare = pool.sushiReward / BigInt("10"); // SUSHI rewarded to the dev every block
            pool.totalSushiPerBlock = pool.devShare + pool.sushiReward;

            pool.shareOfUniswapPool = pool.uniTotalSupply ? pool.totalSupply * BigInt("1000000000000000000") / pool.uniTotalSupply : 0n;       // Staked share of all lp tokens. 100% = 1e18.
            pool.totalStakedToken0 = pool.reserve0 * pool.shareOfUniswapPool / BigInt("1000000000000000000");       // Staked lp tokens contain this much of token0.
            pool.totalStakedToken1 = pool.reserve1 * pool.shareOfUniswapPool / BigInt("1000000000000000000");       // Staked lp tokens contain this much of token1.
            pool.valueStakedToken0 = pool.totalStakedToken0 * BigInt("1000000000000000000") / pool.token0rate;      // Value of token0 in staked lp tokens in wrapped Ether
            pool.valueStakedToken1 = pool.totalStakedToken1 * BigInt("1000000000000000000") / pool.token1rate;      // Value of token1 in staked lp tokens in wrapped Ether
            pool.valueStakedToken0InCurrency = this.ETHtoCurrency(pool.valueStakedToken0);
            pool.valueStakedToken1InCurrency = this.ETHtoCurrency(pool.valueStakedToken1);

            pool.shareOfPool = pool.totalSupply ? pool.balance * BigInt("1000000000000000000") / pool.totalSupply : 0n;
            pool.userStakedToken0 = pool.totalStakedToken0 * pool.shareOfPool / BigInt("1000000000000000000");       // Staked lp tokens contain this much of token0.
            pool.userStakedToken1 = pool.totalStakedToken1 * pool.shareOfPool / BigInt("1000000000000000000");       // Staked lp tokens contain this much of token1.
            pool.valueUserStakedToken0 = pool.userStakedToken0 * BigInt("1000000000000000000") / pool.token0rate;      // Value of token0 in staked lp tokens in wrapped Ether
            pool.valueUserStakedToken1 = pool.userStakedToken1 * BigInt("1000000000000000000") / pool.token1rate;      // Value of token1 in staked lp tokens in wrapped Ether

            pool.hourlyROI = (pool.valueStakedToken0 + pool.valueStakedToken1) ? pool.sushiRewardInETH * BigInt(276000000) / (pool.valueStakedToken0 + pool.valueStakedToken1) : 0n;   // Hourly ROI
            pool.dailyROI = (pool.valueStakedToken0 + pool.valueStakedToken1) ? pool.sushiRewardInETH * BigInt(6613000000) / (pool.valueStakedToken0 + pool.valueStakedToken1) : 0n;   // Daily ROI
            pool.monthlyROI = pool.dailyROI * BigInt(30);   // Monthly ROI
            pool.yearlyROI = pool.dailyROI * BigInt(365);   // Yearly ROI

            pool.hourlyInCurrency = pool.sushiRewardInCurrency * pool.shareOfPool * BigInt(276) / BigInt("1000000000000000000");
            pool.dailyInCurrency = pool.sushiRewardInCurrency * pool.shareOfPool * BigInt(6613) / BigInt("1000000000000000000");
            pool.monthlyInCurrency = pool.dailyInCurrency * BigInt(30);
            pool.yearlyInCurrency = pool.dailyInCurrency * BigInt(365);

            pool.valueInCurrency = (pool.valueStakedToken0 + pool.valueStakedToken1) * this.base.eth_rate / BigInt("1000000000000000000"); // Value of lp tokens staked in currency
        }

        this.base.sushiBalanceInETH = this.base.sushiBalance * BigInt("1000000000000000000") / this.base.sushiRate;
        this.base.sushiBalanceInCurrency = this.ETHtoCurrency(this.base.sushiBalanceInETH);
        this.base.pendingInETH = this.base.pending * BigInt("1000000000000000000") / this.base.sushiRate;
        this.base.pendingInCurrency = this.ETHtoCurrency(this.base.pendingInETH);

        this.base.loaded = true;
        return this;
    }

    async harvest(from, pool_id) {
        await this.web3.chef.withdraw(pool_id, 0).send({ from: from });
    }
}

