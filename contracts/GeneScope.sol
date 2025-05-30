// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GeneScope {
    enum AccessScope {
        Research,         // General scientific use
        Clinical,         // Diagnostic or treatment-related use
        Academic,         // Educational / scholarly use
        PrivateRequest    // Requires individual permission
    }

    struct DataClaim {
        address owner;
        string ipfsHash;
        AccessScope scope;
        uint256 validUntil;
        string[] tags;
    }

    mapping(uint256 => DataClaim) public claims;
    uint256 public claimCount;

    event ClaimCreated(
        uint256 indexed claimId,
        address indexed owner,
        string ipfsHash,
        AccessScope scope,
        uint256 validUntil,
        string[] tags
    );

    function createClaim(
        string memory _ipfsHash,
        AccessScope _scope,
        uint256 _validUntil,
        string[] memory _tags
    ) public {
        claims[claimCount] = DataClaim({
            owner: msg.sender,
            ipfsHash: _ipfsHash,
            scope: _scope,
            validUntil: _validUntil,
            tags: _tags
        });

        emit ClaimCreated(
            claimCount,
            msg.sender,
            _ipfsHash,
            _scope,
            _validUntil,
            _tags
        );

        claimCount++;
    }

    function getClaim(uint256 _id) public view returns (DataClaim memory) {
        return claims[_id];
    }
}
