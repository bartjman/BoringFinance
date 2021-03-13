﻿abis = {
    erc20: [
        {
            constant: true,
            inputs: [],
            name: "name",
            outputs: [{ name: "", type: "string" }],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "totalSupply",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "decimals",
            outputs: [{ name: "", type: "uint8" }],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                { name: "spender", type: "address" },
                { name: "addedValue", type: "uint256" },
            ],
            name: "increaseAllowance",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [{ name: "value", type: "uint256" }],
            name: "burn",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [{ name: "owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [{ name: "", type: "string" }],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                { name: "spender", type: "address" },
                { name: "subtractedValue", type: "uint256" },
            ],
            name: "decreaseAllowance",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: false,
            inputs: [
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
            ],
            name: "allowance",
            outputs: [{ name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], payable: false, stateMutability: "nonpayable", type: "constructor" },
        {
            anonymous: false,
            inputs: [
                { indexed: true, name: "from", type: "address" },
                { indexed: true, name: "to", type: "address" },
                { indexed: false, name: "value", type: "uint256" },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, name: "owner", type: "address" },
                { indexed: true, name: "spender", type: "address" },
                { indexed: false, name: "value", type: "uint256" },
            ],
            name: "Approval",
            type: "event",
        },
    ],
    sushi: [
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "owner", type: "address" },
                { indexed: true, internalType: "address", name: "spender", type: "address" },
                { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "delegator", type: "address" },
                { indexed: true, internalType: "address", name: "fromDelegate", type: "address" },
                { indexed: true, internalType: "address", name: "toDelegate", type: "address" },
            ],
            name: "DelegateChanged",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "delegate", type: "address" },
                { indexed: false, internalType: "uint256", name: "previousBalance", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "newBalance", type: "uint256" },
            ],
            name: "DelegateVotesChanged",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
                { indexed: true, internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "from", type: "address" },
                { indexed: true, internalType: "address", name: "to", type: "address" },
                { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            inputs: [],
            name: "DELEGATION_TYPEHASH",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "DOMAIN_TYPEHASH",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "owner", type: "address" },
                { internalType: "address", name: "spender", type: "address" },
            ],
            name: "allowance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "account", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "", type: "address" },
                { internalType: "uint32", name: "", type: "uint32" },
            ],
            name: "checkpoints",
            outputs: [
                { internalType: "uint32", name: "fromBlock", type: "uint32" },
                { internalType: "uint256", name: "votes", type: "uint256" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "subtractedValue", type: "uint256" },
            ],
            name: "decreaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "delegatee", type: "address" }],
            name: "delegate",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "delegatee", type: "address" },
                { internalType: "uint256", name: "nonce", type: "uint256" },
                { internalType: "uint256", name: "expiry", type: "uint256" },
                { internalType: "uint8", name: "v", type: "uint8" },
                { internalType: "bytes32", name: "r", type: "bytes32" },
                { internalType: "bytes32", name: "s", type: "bytes32" },
            ],
            name: "delegateBySig",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "delegator", type: "address" }],
            name: "delegates",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "account", type: "address" }],
            name: "getCurrentVotes",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "account", type: "address" },
                { internalType: "uint256", name: "blockNumber", type: "uint256" },
            ],
            name: "getPriorVotes",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "addedValue", type: "uint256" },
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "_to", type: "address" },
                { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
        {
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "nonces",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "numCheckpoints",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
            inputs: [],
            name: "symbol",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "totalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "sender", type: "address" },
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ],
    chef: [
        {
            inputs: [
                { internalType: "contract SushiToken", name: "_sushi", type: "address" },
                { internalType: "address", name: "_devaddr", type: "address" },
                { internalType: "uint256", name: "_sushiPerBlock", type: "uint256" },
                { internalType: "uint256", name: "_startBlock", type: "uint256" },
                { internalType: "uint256", name: "_bonusEndBlock", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "user", type: "address" },
                { indexed: true, internalType: "uint256", name: "pid", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "Deposit",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "user", type: "address" },
                { indexed: true, internalType: "uint256", name: "pid", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "EmergencyWithdraw",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
                { indexed: true, internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "user", type: "address" },
                { indexed: true, internalType: "uint256", name: "pid", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "Withdraw",
            type: "event",
        },
        {
            inputs: [],
            name: "BONUS_MULTIPLIER",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_allocPoint", type: "uint256" },
                { internalType: "contract IERC20", name: "_lpToken", type: "address" },
                { internalType: "bool", name: "_withUpdate", type: "bool" },
            ],
            name: "add",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "bonusEndBlock",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_pid", type: "uint256" },
                { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "deposit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "_devaddr", type: "address" }],
            name: "dev",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "devaddr",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
            name: "emergencyWithdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_from", type: "uint256" },
                { internalType: "uint256", name: "_to", type: "uint256" },
            ],
            name: "getMultiplier",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "massUpdatePools", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
            inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
            name: "migrate",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "migrator",
            outputs: [{ internalType: "contract IMigratorChef", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_pid", type: "uint256" },
                { internalType: "address", name: "_user", type: "address" },
            ],
            name: "pendingSushi",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "poolInfo",
            outputs: [
                { internalType: "contract IERC20", name: "lpToken", type: "address" },
                { internalType: "uint256", name: "allocPoint", type: "uint256" },
                { internalType: "uint256", name: "lastRewardBlock", type: "uint256" },
                { internalType: "uint256", name: "accSushiPerShare", type: "uint256" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "poolLength",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
            inputs: [
                { internalType: "uint256", name: "_pid", type: "uint256" },
                { internalType: "uint256", name: "_allocPoint", type: "uint256" },
                { internalType: "bool", name: "_withUpdate", type: "bool" },
            ],
            name: "set",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "contract IMigratorChef", name: "_migrator", type: "address" }],
            name: "setMigrator",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "startBlock",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "sushi",
            outputs: [{ internalType: "contract SushiToken", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "sushiPerBlock",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "totalAllocPoint",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
            name: "updatePool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "", type: "uint256" },
                { internalType: "address", name: "", type: "address" },
            ],
            name: "userInfo",
            outputs: [
                { internalType: "uint256", name: "amount", type: "uint256" },
                { internalType: "uint256", name: "rewardDebt", type: "uint256" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_pid", type: "uint256" },
                { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "withdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ],
    factory: [
        { inputs: [{ internalType: "address", name: "_feeToSetter", type: "address" }], stateMutability: "nonpayable", type: "constructor" },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "token0", type: "address" },
                { indexed: true, internalType: "address", name: "token1", type: "address" },
                { indexed: false, internalType: "address", name: "pair", type: "address" },
                { indexed: false, internalType: "uint256", name: "", type: "uint256" },
            ],
            name: "PairCreated",
            type: "event",
        },
        {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "allPairs",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "allPairsLength",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "tokenA", type: "address" },
                { internalType: "address", name: "tokenB", type: "address" },
            ],
            name: "createPair",
            outputs: [{ internalType: "address", name: "pair", type: "address" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "feeTo",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "feeToSetter",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "", type: "address" },
                { internalType: "address", name: "", type: "address" },
            ],
            name: "getPair",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "migrator",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "pairCodeHash",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "_feeTo", type: "address" }],
            name: "setFeeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "_feeToSetter", type: "address" }],
            name: "setFeeToSetter",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "_migrator", type: "address" }],
            name: "setMigrator",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ],
    pair: [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "owner", type: "address" },
                { indexed: true, internalType: "address", name: "spender", type: "address" },
                { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "sender", type: "address" },
                { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
                { indexed: true, internalType: "address", name: "to", type: "address" },
            ],
            name: "Burn",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "sender", type: "address" },
                { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
            ],
            name: "Mint",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "sender", type: "address" },
                { indexed: false, internalType: "uint256", name: "amount0In", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amount1In", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amount0Out", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amount1Out", type: "uint256" },
                { indexed: true, internalType: "address", name: "to", type: "address" },
            ],
            name: "Swap",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: false, internalType: "uint112", name: "reserve0", type: "uint112" },
                { indexed: false, internalType: "uint112", name: "reserve1", type: "uint112" },
            ],
            name: "Sync",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "from", type: "address" },
                { indexed: true, internalType: "address", name: "to", type: "address" },
                { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            inputs: [],
            name: "DOMAIN_SEPARATOR",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "MINIMUM_LIQUIDITY",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "PERMIT_TYPEHASH",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "", type: "address" },
                { internalType: "address", name: "", type: "address" },
            ],
            name: "allowance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "to", type: "address" }],
            name: "burn",
            outputs: [
                { internalType: "uint256", name: "amount0", type: "uint256" },
                { internalType: "uint256", name: "amount1", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "factory",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "getReserves",
            outputs: [
                { internalType: "uint112", name: "_reserve0", type: "uint112" },
                { internalType: "uint112", name: "_reserve1", type: "uint112" },
                { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "_token0", type: "address" },
                { internalType: "address", name: "_token1", type: "address" },
            ],
            name: "initialize",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "kLast",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "to", type: "address" }],
            name: "mint",
            outputs: [{ internalType: "uint256", name: "liquidity", type: "uint256" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
        {
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "nonces",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "owner", type: "address" },
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "value", type: "uint256" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
                { internalType: "uint8", name: "v", type: "uint8" },
                { internalType: "bytes32", name: "r", type: "bytes32" },
                { internalType: "bytes32", name: "s", type: "bytes32" },
            ],
            name: "permit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "price0CumulativeLast",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "price1CumulativeLast",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "to", type: "address" }],
            name: "skim",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amount0Out", type: "uint256" },
                { internalType: "uint256", name: "amount1Out", type: "uint256" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "bytes", name: "data", type: "bytes" },
            ],
            name: "swap",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "symbol",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "sync", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
            inputs: [],
            name: "token0",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "token1",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "totalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "from", type: "address" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
    ],
    router: [
        {
            inputs: [
                { internalType: "address", name: "_factory", type: "address" },
                { internalType: "address", name: "_WETH", type: "address" },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            inputs: [],
            name: "WETH",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "tokenA", type: "address" },
                { internalType: "address", name: "tokenB", type: "address" },
                { internalType: "uint256", name: "amountADesired", type: "uint256" },
                { internalType: "uint256", name: "amountBDesired", type: "uint256" },
                { internalType: "uint256", name: "amountAMin", type: "uint256" },
                { internalType: "uint256", name: "amountBMin", type: "uint256" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "addLiquidity",
            outputs: [
                { internalType: "uint256", name: "amountA", type: "uint256" },
                { internalType: "uint256", name: "amountB", type: "uint256" },
                { internalType: "uint256", name: "liquidity", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amountTokenDesired", type: "uint256" },
                { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
                { internalType: "uint256", name: "amountETHMin", type: "uint256" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "addLiquidityETH",
            outputs: [
                { internalType: "uint256", name: "amountToken", type: "uint256" },
                { internalType: "uint256", name: "amountETH", type: "uint256" },
                { internalType: "uint256", name: "liquidity", type: "uint256" },
            ],
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [],
            name: "factory",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountOut", type: "uint256" },
                { internalType: "uint256", name: "reserveIn", type: "uint256" },
                { internalType: "uint256", name: "reserveOut", type: "uint256" },
            ],
            name: "getAmountIn",
            outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountIn", type: "uint256" },
                { internalType: "uint256", name: "reserveIn", type: "uint256" },
                { internalType: "uint256", name: "reserveOut", type: "uint256" },
            ],
            name: "getAmountOut",
            outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountOut", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
            ],
            name: "getAmountsIn",
            outputs: [{ internalType: "uint256[]", name: "amounts", type: "uint256[]" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountIn", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
            ],
            name: "getAmountsOut",
            outputs: [{ internalType: "uint256[]", name: "amounts", type: "uint256[]" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountA", type: "uint256" },
                { internalType: "uint256", name: "reserveA", type: "uint256" },
                { internalType: "uint256", name: "reserveB", type: "uint256" },
            ],
            name: "quote",
            outputs: [{ internalType: "uint256", name: "amountB", type: "uint256" }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "tokenA", type: "address" },
                { internalType: "address", name: "tokenB", type: "address" },
                { internalType: "uint256", name: "liquidity", type: "uint256" },
                { internalType: "uint256", name: "amountAMin", type: "uint256" },
                { internalType: "uint256", name: "amountBMin", type: "uint256" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "removeLiquidity",
            outputs: [
                { internalType: "uint256", name: "amountA", type: "uint256" },
                { internalType: "uint256", name: "amountB", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "liquidity", type: "uint256" },
                { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
                { internalType: "uint256", name: "amountETHMin", type: "uint256" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "removeLiquidityETH",
            outputs: [
                { internalType: "uint256", name: "amountToken", type: "uint256" },
                { internalType: "uint256", name: "amountETH", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "liquidity", type: "uint256" },
                { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
                { internalType: "uint256", name: "amountETHMin", type: "uint256" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "removeLiquidityETHSupportingFeeOnTransferTokens",
            outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "liquidity", type: "uint256" },
                { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
                { internalType: "uint256", name: "amountETHMin", type: "uint256" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
                { internalType: "bool", name: "approveMax", type: "bool" },
                { internalType: "uint8", name: "v", type: "uint8" },
                { internalType: "bytes32", name: "r", type: "bytes32" },
                { internalType: "bytes32", name: "s", type: "bytes32" },
            ],
            name: "removeLiquidityETHWithPermit",
            outputs: [
                { internalType: "uint256", name: "amountToken", type: "uint256" },
                { internalType: "uint256", name: "amountETH", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "liquidity", type: "uint256" },
                { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
                { internalType: "uint256", name: "amountETHMin", type: "uint256" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
                { internalType: "bool", name: "approveMax", type: "bool" },
                { internalType: "uint8", name: "v", type: "uint8" },
                { internalType: "bytes32", name: "r", type: "bytes32" },
                { internalType: "bytes32", name: "s", type: "bytes32" },
            ],
            name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
            outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "tokenA", type: "address" },
                { internalType: "address", name: "tokenB", type: "address" },
                { internalType: "uint256", name: "liquidity", type: "uint256" },
                { internalType: "uint256", name: "amountAMin", type: "uint256" },
                { internalType: "uint256", name: "amountBMin", type: "uint256" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
                { internalType: "bool", name: "approveMax", type: "bool" },
                { internalType: "uint8", name: "v", type: "uint8" },
                { internalType: "bytes32", name: "r", type: "bytes32" },
                { internalType: "bytes32", name: "s", type: "bytes32" },
            ],
            name: "removeLiquidityWithPermit",
            outputs: [
                { internalType: "uint256", name: "amountA", type: "uint256" },
                { internalType: "uint256", name: "amountB", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountOut", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "swapETHForExactTokens",
            outputs: [{ internalType: "uint256[]", name: "amounts", type: "uint256[]" }],
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountOutMin", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "swapExactETHForTokens",
            outputs: [{ internalType: "uint256[]", name: "amounts", type: "uint256[]" }],
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountOutMin", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
            outputs: [],
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountIn", type: "uint256" },
                { internalType: "uint256", name: "amountOutMin", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "swapExactTokensForETH",
            outputs: [{ internalType: "uint256[]", name: "amounts", type: "uint256[]" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountIn", type: "uint256" },
                { internalType: "uint256", name: "amountOutMin", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountIn", type: "uint256" },
                { internalType: "uint256", name: "amountOutMin", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "swapExactTokensForTokens",
            outputs: [{ internalType: "uint256[]", name: "amounts", type: "uint256[]" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountIn", type: "uint256" },
                { internalType: "uint256", name: "amountOutMin", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountOut", type: "uint256" },
                { internalType: "uint256", name: "amountInMax", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "swapTokensForExactETH",
            outputs: [{ internalType: "uint256[]", name: "amounts", type: "uint256[]" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amountOut", type: "uint256" },
                { internalType: "uint256", name: "amountInMax", type: "uint256" },
                { internalType: "address[]", name: "path", type: "address[]" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "deadline", type: "uint256" },
            ],
            name: "swapTokensForExactTokens",
            outputs: [{ internalType: "uint256[]", name: "amounts", type: "uint256[]" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        { stateMutability: "payable", type: "receive" },
    ],
    bar: [
        { inputs: [{ internalType: "contract IERC20", name: "_sushi", type: "address" }], stateMutability: "nonpayable", type: "constructor" },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "owner", type: "address" },
                { indexed: true, internalType: "address", name: "spender", type: "address" },
                { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "from", type: "address" },
                { indexed: true, internalType: "address", name: "to", type: "address" },
                { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            inputs: [
                { internalType: "address", name: "owner", type: "address" },
                { internalType: "address", name: "spender", type: "address" },
            ],
            name: "allowance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "account", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "subtractedValue", type: "uint256" },
            ],
            name: "decreaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
            name: "enter",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "addedValue", type: "uint256" },
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint256", name: "_share", type: "uint256" }],
            name: "leave",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
        {
            inputs: [],
            name: "sushi",
            outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "symbol",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "totalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "sender", type: "address" },
                { internalType: "address", name: "recipient", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
    ],
    maker: [
        {
            inputs: [
                { internalType: "address", name: "_factory", type: "address" },
                { internalType: "address", name: "_bar", type: "address" },
                { internalType: "address", name: "_sushi", type: "address" },
                { internalType: "address", name: "_weth", type: "address" },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "token", type: "address" },
                { indexed: true, internalType: "address", name: "bridge", type: "address" },
            ],
            name: "LogBridgeSet",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "server", type: "address" },
                { indexed: true, internalType: "address", name: "token0", type: "address" },
                { indexed: true, internalType: "address", name: "token1", type: "address" },
                { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "amountSUSHI", type: "uint256" },
            ],
            name: "LogConvert",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
                { indexed: true, internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            inputs: [],
            name: "bar",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "token", type: "address" }],
            name: "bridgeFor",
            outputs: [{ internalType: "address", name: "bridge", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "claimOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
            inputs: [
                { internalType: "address", name: "token0", type: "address" },
                { internalType: "address", name: "token1", type: "address" },
            ],
            name: "convert",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address[]", name: "token0", type: "address[]" },
                { internalType: "address[]", name: "token1", type: "address[]" },
            ],
            name: "convertMultiple",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "factory",
            outputs: [{ internalType: "contract IUniswapV2Factory", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "pendingOwner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "address", name: "bridge", type: "address" },
            ],
            name: "setBridge",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "newOwner", type: "address" },
                { internalType: "bool", name: "direct", type: "bool" },
                { internalType: "bool", name: "renounce", type: "bool" },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ],
    timelock: [
        {
            inputs: [
                { internalType: "address", name: "admin_", type: "address" },
                { internalType: "uint256", name: "delay_", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "bytes32", name: "txHash", type: "bytes32" },
                { indexed: true, internalType: "address", name: "target", type: "address" },
                { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
                { indexed: false, internalType: "string", name: "signature", type: "string" },
                { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
                { indexed: false, internalType: "uint256", name: "eta", type: "uint256" },
            ],
            name: "CancelTransaction",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "bytes32", name: "txHash", type: "bytes32" },
                { indexed: true, internalType: "address", name: "target", type: "address" },
                { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
                { indexed: false, internalType: "string", name: "signature", type: "string" },
                { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
                { indexed: false, internalType: "uint256", name: "eta", type: "uint256" },
            ],
            name: "ExecuteTransaction",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [{ indexed: true, internalType: "address", name: "newAdmin", type: "address" }],
            name: "NewAdmin",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [{ indexed: true, internalType: "uint256", name: "newDelay", type: "uint256" }],
            name: "NewDelay",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [{ indexed: true, internalType: "address", name: "newPendingAdmin", type: "address" }],
            name: "NewPendingAdmin",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "bytes32", name: "txHash", type: "bytes32" },
                { indexed: true, internalType: "address", name: "target", type: "address" },
                { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
                { indexed: false, internalType: "string", name: "signature", type: "string" },
                { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
                { indexed: false, internalType: "uint256", name: "eta", type: "uint256" },
            ],
            name: "QueueTransaction",
            type: "event",
        },
        {
            inputs: [],
            name: "GRACE_PERIOD",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "MAXIMUM_DELAY",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "MINIMUM_DELAY",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "acceptAdmin", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
            inputs: [],
            name: "admin",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "admin_initialized",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "target", type: "address" },
                { internalType: "uint256", name: "value", type: "uint256" },
                { internalType: "string", name: "signature", type: "string" },
                { internalType: "bytes", name: "data", type: "bytes" },
                { internalType: "uint256", name: "eta", type: "uint256" },
            ],
            name: "cancelTransaction",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "delay",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "target", type: "address" },
                { internalType: "uint256", name: "value", type: "uint256" },
                { internalType: "string", name: "signature", type: "string" },
                { internalType: "bytes", name: "data", type: "bytes" },
                { internalType: "uint256", name: "eta", type: "uint256" },
            ],
            name: "executeTransaction",
            outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [],
            name: "pendingAdmin",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "target", type: "address" },
                { internalType: "uint256", name: "value", type: "uint256" },
                { internalType: "string", name: "signature", type: "string" },
                { internalType: "bytes", name: "data", type: "bytes" },
                { internalType: "uint256", name: "eta", type: "uint256" },
            ],
            name: "queueTransaction",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            name: "queuedTransactions",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint256", name: "delay_", type: "uint256" }],
            name: "setDelay",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "pendingAdmin_", type: "address" }],
            name: "setPendingAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        { stateMutability: "payable", type: "receive" },
    ]
}

abis.bentobox = [{"inputs":[{"internalType":"contract IERC20","name":"wethToken_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"masterContract","type":"address"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"},{"indexed":true,"internalType":"address","name":"cloneAddress","type":"address"}],"name":"LogDeploy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"}],"name":"LogDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"feeAmount","type":"uint256"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"}],"name":"LogFlashLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"protocol","type":"address"}],"name":"LogRegisterProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"masterContract","type":"address"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"LogSetMasterContractApproval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogStrategyDivest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogStrategyInvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogStrategyLoss","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogStrategyProfit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":true,"internalType":"contract IStrategy","name":"strategy","type":"address"}],"name":"LogStrategyQueued","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":true,"internalType":"contract IStrategy","name":"strategy","type":"address"}],"name":"LogStrategySet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"targetPercentage","type":"uint256"}],"name":"LogStrategyTargetPercentage","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"}],"name":"LogTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"masterContract","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"LogWhiteListMasterContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"}],"name":"LogWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"calls","type":"bytes[]"},{"internalType":"bool","name":"revertOnFail","type":"bool"}],"name":"batch","outputs":[{"internalType":"bool[]","name":"successes","type":"bool[]"},{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract IBatchFlashBorrower","name":"borrower","type":"address"},{"internalType":"address[]","name":"receivers","type":"address[]"},{"internalType":"contract IERC20[]","name":"tokens","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"batchFlashLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"masterContract","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bool","name":"useCreate2","type":"bool"}],"name":"deploy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token_","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"share","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"shareOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract IFlashBorrower","name":"borrower","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flashLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"bool","name":"balance","type":"bool"},{"internalType":"uint256","name":"maxChangeAmount","type":"uint256"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"masterContractApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"masterContractOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"pendingStrategy","outputs":[{"internalType":"contract IStrategy","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permitToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registerProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"masterContract","type":"address"},{"internalType":"bool","name":"approved","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"setMasterContractApproval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"contract IStrategy","name":"newStrategy","type":"address"}],"name":"setStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint64","name":"targetPercentage_","type":"uint64"}],"name":"setStrategyTargetPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"strategy","outputs":[{"internalType":"contract IStrategy","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"strategyData","outputs":[{"internalType":"uint64","name":"strategyStartDate","type":"uint64"},{"internalType":"uint64","name":"targetPercentage","type":"uint64"},{"internalType":"uint128","name":"balance","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"share","type":"uint256"},{"internalType":"bool","name":"roundUp","type":"bool"}],"name":"toAmount","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"roundUp","type":"bool"}],"name":"toShare","outputs":[{"internalType":"uint256","name":"share","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"totals","outputs":[{"internalType":"uint128","name":"elastic","type":"uint128"},{"internalType":"uint128","name":"base","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"share","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address[]","name":"tos","type":"address[]"},{"internalType":"uint256[]","name":"shares","type":"uint256[]"}],"name":"transferMultiple","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"masterContract","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"whitelistMasterContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistedMasterContracts","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token_","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"share","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"shareOut","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

abis.peggedoracle = [
    {
        inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
        name: "get",
        outputs: [
            { internalType: "bool", name: "", type: "bool" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "rate", type: "uint256" }],
        name: "getDataParameter",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
        name: "peek",
        outputs: [
            { internalType: "bool", name: "", type: "bool" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
]
abis.compoundoracle = [
    {
        inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
        name: "get",
        outputs: [
            { internalType: "bool", name: "", type: "bool" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "collateralSymbol", type: "string" },
            { internalType: "string", name: "assetSymbol", type: "string" },
            { internalType: "uint256", name: "division", type: "uint256" },
        ],
        name: "getDataParameter",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
        name: "peek",
        outputs: [
            { internalType: "bool", name: "", type: "bool" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
]
abis.bentohelper = [
    {
        inputs: [
            { internalType: "address", name: "user", type: "address" },
            { internalType: "contract ILendingPair[]", name: "pairs", type: "address[]" },
        ],
        name: "getPairs",
        outputs: [
            {
                components: [
                    { internalType: "contract ILendingPair", name: "pair", type: "address" },
                    { internalType: "contract IOracle", name: "oracle", type: "address" },
                    { internalType: "contract IBentoBox", name: "bentoBox", type: "address" },
                    { internalType: "address", name: "masterContract", type: "address" },
                    { internalType: "bool", name: "masterContractApproved", type: "bool" },
                    { internalType: "contract IERC20", name: "tokenAsset", type: "address" },
                    { internalType: "contract IERC20", name: "tokenCollateral", type: "address" },
                    { internalType: "uint256", name: "latestExchangeRate", type: "uint256" },
                    { internalType: "uint256", name: "lastBlockAccrued", type: "uint256" },
                    { internalType: "uint256", name: "interestRate", type: "uint256" },
                    { internalType: "uint256", name: "totalCollateralShare", type: "uint256" },
                    { internalType: "uint256", name: "totalCollateralAmount", type: "uint256" },
                    { internalType: "uint256", name: "totalAssetShare", type: "uint256" },
                    { internalType: "uint256", name: "totalAssetAmount", type: "uint256" },
                    { internalType: "uint256", name: "totalBorrowShare", type: "uint256" },
                    { internalType: "uint256", name: "totalBorrowAmount", type: "uint256" },
                    { internalType: "uint256", name: "totalAssetFraction", type: "uint256" },
                    { internalType: "uint256", name: "totalBorrowFraction", type: "uint256" },
                    { internalType: "uint256", name: "interestPerBlock", type: "uint256" },
                    { internalType: "uint256", name: "feesPendingShare", type: "uint256" },
                    { internalType: "uint256", name: "userCollateralShare", type: "uint256" },
                    { internalType: "uint256", name: "userCollateralAmount", type: "uint256" },
                    { internalType: "uint256", name: "userAssetFraction", type: "uint256" },
                    { internalType: "uint256", name: "userAssetAmount", type: "uint256" },
                    { internalType: "uint256", name: "userBorrowFraction", type: "uint256" },
                    { internalType: "uint256", name: "userBorrowAmount", type: "uint256" },
                    { internalType: "uint256", name: "userAssetBalance", type: "uint256" },
                    { internalType: "uint256", name: "userCollateralBalance", type: "uint256" },
                    { internalType: "uint256", name: "userAssetAllowance", type: "uint256" },
                    { internalType: "uint256", name: "userCollateralAllowance", type: "uint256" },
                ],
                internalType: "struct BentoHelper.PairInfo[]",
                name: "info",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
]
abis.faucet = [{ inputs: [], name: "drip", outputs: [], stateMutability: "nonpayable", type: "function" }]
abis.sushiswapslporacle = [
    { inputs: [], name: "PERIOD", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
    {
        inputs: [
            { internalType: "contract IUniswapV2Pair", name: "pair", type: "address" },
            { internalType: "uint32", name: "blockTimestamp", type: "uint32" },
        ],
        name: "_get",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "callerInfo",
        outputs: [{ internalType: "contract IUniswapV2Pair", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
        name: "get",
        outputs: [
            { internalType: "bool", name: "", type: "bool" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "contract IUniswapV2Pair", name: "pair", type: "address" }],
        name: "getDataParameter",
        outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "contract IUniswapV2Pair", name: "", type: "address" }],
        name: "pairs",
        outputs: [
            { internalType: "uint256", name: "priceCumulativeLast", type: "uint256" },
            { internalType: "uint32", name: "blockTimestampLast", type: "uint32" },
            {
                components: [{ internalType: "uint224", name: "_x", type: "uint224" }],
                internalType: "struct FixedPoint.uq112x112",
                name: "priceAverage",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
        name: "peek",
        outputs: [
            { internalType: "bool", name: "", type: "bool" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
]
abis.multicall = [
    {
        constant: false,
        inputs: [
            {
                components: [
                    { internalType: "address", name: "target", type: "address" },
                    { internalType: "bytes", name: "callData", type: "bytes" },
                ],
                internalType: "struct Multicall.Call[]",
                name: "calls",
                type: "tuple[]",
            },
            { internalType: "bool", name: "strict", type: "bool" },
        ],
        name: "aggregate",
        outputs: [
            { internalType: "uint256", name: "blockNumber", type: "uint256" },
            {
                components: [
                    { internalType: "bool", name: "success", type: "bool" },
                    { internalType: "bytes", name: "data", type: "bytes" },
                ],
                internalType: "struct Multicall.Return[]",
                name: "returnData",
                type: "tuple[]",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ internalType: "uint256", name: "blockNumber", type: "uint256" }],
        name: "getBlockHash",
        outputs: [{ internalType: "bytes32", name: "blockHash", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "getCurrentBlockCoinbase",
        outputs: [{ internalType: "address", name: "coinbase", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "getCurrentBlockDifficulty",
        outputs: [{ internalType: "uint256", name: "difficulty", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "getCurrentBlockGasLimit",
        outputs: [{ internalType: "uint256", name: "gaslimit", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "getCurrentBlockTimestamp",
        outputs: [{ internalType: "uint256", name: "timestamp", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ internalType: "address", name: "addr", type: "address" }],
        name: "getEthBalance",
        outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "getLastBlockHash",
        outputs: [{ internalType: "bytes32", name: "blockHash", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
]
abis.kashipair = [{"inputs":[{"internalType":"contract IBentoBoxV1","name":"bentoBox_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"accruedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"feeFraction","type":"uint256"},{"indexed":false,"internalType":"uint64","name":"rate","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"utilization","type":"uint256"}],"name":"LogAccrue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fraction","type":"uint256"}],"name":"LogAddAsset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"}],"name":"LogAddCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"feeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"part","type":"uint256"}],"name":"LogBorrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"}],"name":"LogExchangeRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newFeeTo","type":"address"}],"name":"LogFeeTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fraction","type":"uint256"}],"name":"LogRemoveAsset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"}],"name":"LogRemoveCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"part","type":"uint256"}],"name":"LogRepay","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"feeTo","type":"address"},{"indexed":false,"internalType":"uint256","name":"feesEarnedFraction","type":"uint256"}],"name":"LogWithdrawFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"accrue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"accrueInfo","outputs":[{"internalType":"uint64","name":"interestPerSecond","type":"uint64"},{"internalType":"uint64","name":"lastAccrued","type":"uint64"},{"internalType":"uint128","name":"feesEarnedFraction","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"skim","type":"bool"},{"internalType":"uint256","name":"share","type":"uint256"}],"name":"addAsset","outputs":[{"internalType":"uint256","name":"fraction","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"skim","type":"bool"},{"internalType":"uint256","name":"share","type":"uint256"}],"name":"addCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"asset","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bentoBox","outputs":[{"internalType":"contract IBentoBoxV1","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"borrow","outputs":[{"internalType":"uint256","name":"part","type":"uint256"},{"internalType":"uint256","name":"share","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collateral","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8[]","name":"actions","type":"uint8[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"},{"internalType":"bytes[]","name":"datas","type":"bytes[]"}],"name":"cook","outputs":[{"internalType":"uint256","name":"value1","type":"uint256"},{"internalType":"uint256","name":"value2","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"collateral_","type":"address"},{"internalType":"contract IERC20","name":"asset_","type":"address"},{"internalType":"contract IOracle","name":"oracle_","type":"address"},{"internalType":"bytes","name":"oracleData_","type":"bytes"}],"name":"getInitData","outputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"init","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bool","name":"open","type":"bool"}],"name":"isSolvent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"uint256[]","name":"maxBorrowParts","type":"uint256[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"contract ISwapper","name":"swapper","type":"address"},{"internalType":"bool","name":"open","type":"bool"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"masterContract","outputs":[{"internalType":"contract KashiPairMediumRiskV1","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracle","outputs":[{"internalType":"contract IOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracleData","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner_","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"fraction","type":"uint256"}],"name":"removeAsset","outputs":[{"internalType":"uint256","name":"share","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"share","type":"uint256"}],"name":"removeCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"skim","type":"bool"},{"internalType":"uint256","name":"part","type":"uint256"}],"name":"repay","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newFeeTo","type":"address"}],"name":"setFeeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISwapper","name":"swapper","type":"address"},{"internalType":"bool","name":"enable","type":"bool"}],"name":"setSwapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISwapper","name":"","type":"address"}],"name":"swappers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAsset","outputs":[{"internalType":"uint128","name":"elastic","type":"uint128"},{"internalType":"uint128","name":"base","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBorrow","outputs":[{"internalType":"uint128","name":"elastic","type":"uint128"},{"internalType":"uint128","name":"base","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCollateralShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateExchangeRate","outputs":[{"internalType":"bool","name":"updated","type":"bool"},{"internalType":"uint256","name":"rate","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userBorrowPart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userCollateralShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawFees","outputs":[],"stateMutability":"nonpayable","type":"function"}]
abis.peggedoracle = [{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"get","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"rate","type":"uint256"}],"name":"getDataParameter","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"peek","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
abis.boringhelper = [{"inputs":[{"internalType":"contract IMasterChef","name":"chef_","type":"address"},{"internalType":"address","name":"maker_","type":"address"},{"internalType":"contract IERC20","name":"sushi_","type":"address"},{"internalType":"contract IERC20","name":"WETH_","type":"address"},{"internalType":"contract IERC20","name":"WBTC_","type":"address"},{"internalType":"contract IFactory","name":"sushiFactory_","type":"address"},{"internalType":"contract IFactory","name":"uniV2Factory_","type":"address"},{"internalType":"contract IERC20","name":"bar_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WBTC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bar","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chef","outputs":[{"internalType":"contract IMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"findBalances","outputs":[{"components":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"bentoBalance","type":"uint256"}],"internalType":"struct BoringHelper.Balance[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"findPools","outputs":[{"components":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"}],"internalType":"struct BoringHelper.PoolFound[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"getBalances","outputs":[{"components":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"internalType":"struct BoringHelper.BalanceFull[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"getETHRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IFactory","name":"factory","type":"address"},{"internalType":"uint256","name":"fromID","type":"uint256"},{"internalType":"uint256","name":"toID","type":"uint256"}],"name":"getPairs","outputs":[{"components":[{"internalType":"contract IPair","name":"token","type":"address"},{"internalType":"contract IERC20","name":"token0","type":"address"},{"internalType":"contract IERC20","name":"token1","type":"address"},{"internalType":"uint256","name":"totalSupply","type":"uint256"}],"internalType":"struct BoringHelper.PairBase[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"getPools","outputs":[{"components":[{"internalType":"uint256","name":"totalAllocPoint","type":"uint256"},{"internalType":"uint256","name":"poolLength","type":"uint256"}],"internalType":"struct BoringHelper.PoolsInfo","name":"","type":"tuple"},{"components":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"contract IPair","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"bool","name":"isPair","type":"bool"},{"internalType":"contract IFactory","name":"factory","type":"address"},{"internalType":"contract IERC20","name":"token0","type":"address"},{"internalType":"contract IERC20","name":"token1","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct BoringHelper.PoolInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"getTokenInfo","outputs":[{"components":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"decimals","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"internalType":"struct BoringHelper.TokenInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"contract IFactory[]","name":"factoryAddresses","type":"address[]"},{"internalType":"contract IERC20","name":"currency","type":"address"}],"name":"getUIInfo","outputs":[{"components":[{"internalType":"uint256","name":"ethBalance","type":"uint256"},{"internalType":"uint256","name":"sushiBalance","type":"uint256"},{"internalType":"uint256","name":"sushiBarBalance","type":"uint256"},{"internalType":"uint256","name":"xsushiBalance","type":"uint256"},{"internalType":"uint256","name":"xsushiSupply","type":"uint256"},{"internalType":"uint256","name":"sushiBarAllowance","type":"uint256"},{"components":[{"internalType":"contract IFactory","name":"factory","type":"address"},{"internalType":"uint256","name":"allPairsLength","type":"uint256"}],"internalType":"struct BoringHelper.Factory[]","name":"factories","type":"tuple[]"},{"internalType":"uint256","name":"ethRate","type":"uint256"},{"internalType":"uint256","name":"sushiRate","type":"uint256"},{"internalType":"uint256","name":"btcRate","type":"uint256"},{"internalType":"uint256","name":"pendingSushi","type":"uint256"}],"internalType":"struct BoringHelper.UIInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maker","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"contract IPair[]","name":"addresses","type":"address[]"}],"name":"pollPairs","outputs":[{"components":[{"internalType":"contract IPair","name":"token","type":"address"},{"internalType":"uint256","name":"reserve0","type":"uint256"},{"internalType":"uint256","name":"reserve1","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"}],"internalType":"struct BoringHelper.PairPoll[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"pollPools","outputs":[{"components":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"lpBalance","type":"uint256"},{"internalType":"uint256","name":"lpTotalSupply","type":"uint256"},{"internalType":"uint256","name":"lpAllowance","type":"uint256"},{"internalType":"uint256","name":"reserve0","type":"uint256"},{"internalType":"uint256","name":"reserve1","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"}],"internalType":"struct BoringHelper.UserPoolInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IMasterChef","name":"chef_","type":"address"},{"internalType":"address","name":"maker_","type":"address"},{"internalType":"contract IERC20","name":"sushi_","type":"address"},{"internalType":"contract IERC20","name":"WETH_","type":"address"},{"internalType":"contract IERC20","name":"WBTC_","type":"address"},{"internalType":"contract IFactory","name":"sushiFactory_","type":"address"},{"internalType":"contract IFactory","name":"uniV2Factory_","type":"address"},{"internalType":"contract IERC20","name":"bar_","type":"address"}],"name":"setContracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sushi","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sushiFactory","outputs":[{"internalType":"contract IFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniV2Factory","outputs":[{"internalType":"contract IFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
abis.salary = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "salaryId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "toBentoBox",
				"type": "bool"
			}
		],
		"name": "cancel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "cliffTimestamp",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "endTimestamp",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "cliffPercent",
				"type": "uint32"
			},
			{
				"internalType": "uint8",
				"name": "mode",
				"type": "uint8"
			},
			{
				"internalType": "uint128",
				"name": "amount",
				"type": "uint128"
			}
		],
		"name": "create",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "salaryId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IBentoBox",
				"name": "_bentoBox",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "salaryId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "LogCancel",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "funder",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "cliffTimestamp",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "endTimestamp",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "cliffPercent",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "totalShares",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "salaryId",
				"type": "uint256"
			}
		],
		"name": "LogCreate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "salaryId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "LogWithdraw",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "setBentoBoxApproval",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "salaryId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "toBentoBox",
				"type": "bool"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allSalaries",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "contract IERC20",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "withdrawnShares",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "cliffTimestamp",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "endTimestamp",
						"type": "uint32"
					},
					{
						"internalType": "uint64",
						"name": "cliffPercent",
						"type": "uint64"
					},
					{
						"internalType": "uint128",
						"name": "shares",
						"type": "uint128"
					}
				],
				"internalType": "struct Salary.UserSalary[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "salaryId",
				"type": "uint256"
			}
		],
		"name": "available",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "shares",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bentoBox",
		"outputs": [
			{
				"internalType": "contract IBentoBox",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "funder",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "salaries",
		"outputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "withdrawnShares",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "cliffTimestamp",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "endTimestamp",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "cliffPercent",
				"type": "uint64"
			},
			{
				"internalType": "uint128",
				"name": "shares",
				"type": "uint128"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "salariesLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]