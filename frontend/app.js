// Contract details (replace with deployed values)
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [
  {
    "inputs": [{"internalType":"string","name":"_encryptedData","type":"string"}],
    "name":"addTransaction",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],
    "name":"getTransaction",
    "outputs":[
      {"components":[
        {"internalType":"uint256","name":"id","type":"uint256"},
        {"internalType":"address","name":"sender","type":"address"},
        {"internalType":"string","name":"encryptedData","type":"string"},
        {"internalType":"uint256","name":"timestamp","type":"uint256"}],
        "internalType":"struct Project.QuantumTx",
        "name":"",
        "type":"tuple"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],
    "name":"transferOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"owner",
    "outputs":[{"internalType":"address","name":"","type":"address"}],
    "stateMutability":"view",
    "type":"function"
  }
];

let provider, signer, contract;

// Connect Wallet
document.getElementById("connectWallet").onclick = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = `Connected: ${address}`;
  } else {
    alert("Please install MetaMask!");
  }
};

// Add Transaction
document.getElementById("addTxBtn").onclick = async () => {
  const data = document.getElementById("txData").value;
  try {
    const tx = await contract.addTransaction(data);
    await tx.wait();
    document.getElementById("addTxStatus").innerText = "✅ Transaction added!";
  } catch (error) {
    console.error(error);
    document.getElementById("addTxStatus").innerText = "❌ Failed to add transaction.";
  }
};

// Get Transaction
document.getElementById("getTxBtn").onclick = async () => {
  const id = document.getElementById("txId").value;
  try {
    const tx = await contract.getTransaction(id);
    document.getElementById("txDetails").innerText = JSON.stringify(tx, null, 2);
  } catch (error) {
    console.error(error);
    document.getElementById("txDetails").innerText = "❌ Transaction not found.";
  }
};

// Transfer Ownership
document.getElementById("transferOwnerBtn").onclick = async () => {
  const newOwner = document.getElementById("newOwner").value;
  try {
    const tx = await contract.transferOwnership(newOwner);
    await tx.wait();
    document.getElementById("ownerStatus").innerText = "✅ Ownership transferred!";
  } catch (error) {
    console.error(error);
    document.getElementById("ownerStatus").innerText = "❌ Failed to transfer ownership.";
  }
};
