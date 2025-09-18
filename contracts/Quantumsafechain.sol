// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title QuantumSafe Chain: Post-Quantum Secure Blockchain Network
 * @notice This contract is a prototype representation of a blockchain
 *         designed with post-quantum secure principles in mind.
 * @dev For demonstration, it simulates secure data storage and verification.
 */
contract Project {
    address public owner;

    // Struct to represent quantum-safe transactions
    struct QuantumTx {
        uint256 id;
        address sender;
        string encryptedData; // Placeholder for PQ-encrypted data
        uint256 timestamp;
    }

    mapping(uint256 => QuantumTx) private transactions;
    uint256 private txCounter;

    event TransactionAdded(uint256 id, address indexed sender, string encryptedData, uint256 timestamp);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        txCounter = 0;
    }

    /**
     * @notice Adds a new quantum-safe transaction
     * @param _encryptedData Encrypted data (simulated as string)
     */
    function addTransaction(string memory _encryptedData) external {
        txCounter++;
        transactions[txCounter] = QuantumTx(txCounter, msg.sender, _encryptedData, block.timestamp);
        emit TransactionAdded(txCounter, msg.sender, _encryptedData, block.timestamp);
    }

    /**
     * @notice Retrieves transaction details
     * @param _id Transaction ID
     */
    function getTransaction(uint256 _id) external view returns (QuantumTx memory) {
        require(_id > 0 && _id <= txCounter, "Transaction not found");
        return transactions[_id];
    }

    /**
     * @notice Transfers ownership of the contract
     * @param _newOwner Address of new owner
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner);
    }
}

