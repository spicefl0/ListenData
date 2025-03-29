import { ethers } from "ethers"

// CryptoCat token contract address on the Filecoin calibration network
const tokenAddress = "0x02822A0a55F46e4ccAfabD7f14b97924F7BF4973" 

// Minimal ABI to listen to Transfer events, you can use complete ABI as well
var abi = ["event Transfer(address indexed from, address indexed to, uint amount)"]

// Connect to Glif's public Filecoin RPC node
const fielcoin_url = 'https://api.calibration.node.glif.io/rpc/v1'
const provider = new ethers.providers.JsonRpcProvider(fielcoin_url)

//listen to the Transfer events in the Token contract
const token = new ethers.Contract(tokenAddress, abi, provider)
token.on("Transfer", (from, to, value, event)=>{
    let transferEvent ={
        from: from,
        to: to,
        value: value,
        eventData: event,
    }
    console.log(JSON.stringify(transferEvent, null, 4))
})