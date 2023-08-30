# Omni Standard Library

Solidity contracts for building cross-rollup smart contract systems. Read more at the [documentation portal](https://docs.omni.network).

Simple examples of smart contract systems built with this library can be found at [omni-network/examples](https://github.com/omni-network/examples).

## Directory Overview

- `contracts/`: Omni solidity library implementation
- `src/`: typescript utilities for interacting with Omni contracts

## How to Use for your own contracts

You'll need to import these contracts to your own repo to use them. You can use any of the following methods:
- With yarn:
  - `yarn add https://github.com/omni-network/omni-std`
  - or, for later versions of yarn, `yarn add @omni/contracts@https://github.com/omni-network/omni-std`
  - Import with `@omni/contracts/{...}`
- With forge:
    - `forge install github.com/omni-network/omni-std`
    - Import with `lib/omni-std/{...}`, or use remappings
