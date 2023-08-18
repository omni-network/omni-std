# Omni Standard Library

Solidity contracts for building cross-rollup smart contract systems. Read more at the [documentation portal](https://docs.omni.network).

A simple example of a smart contract system built with this library is shown under the `examples/counter` directory.

## Directory Overview

- `contracts/`: Omni solidity library implementation
- `examples/`: example smart contract systems that utilize the Omni library
    - `counter`: a "counter" example for tracking a global count across rollups
- `src/`: typescript utilities for interacting with Omni contracts

## How to Use for your own contracts

You'll need to import these contracts to your own repo to use them. You can use any of the following methods:
- With a yarn repo (as in the example):
  - `yarn add https://github.com/omni-network/omni-std`
  - Import with `@omni/contracts/{...}`
- With forge:
    - `forge install github.com/omni-network/omni-std`
    - Import with `lib/omni-std/{...}`, or use remappings
- Clone this repo and replace the Example with your own code

## Instructions

1. Set required env variables from the `.env.example` in your own `.env`. You'll also need to set Vite specific RPC URLs from `examples/counter/ui/.env.example` under `examples/counter/ui/.env`

2. Set the portal addresses based on the Omni documentation under `examples/counter/ui/src/addresses.ts`

3. Install dependencies

    ```bash
    yarn install
    cd examples/counter/contracts && yarn install
    cd ../ui/ && yarn install && cd ..
    ```

4. Deploy GlobalCounter to Omni Testnet and record the deployed address to your `.env`

    ```bash
    make deploy-omni
    ```

5. Deploy local counters to rollup testnets

    ```bash
    make deploy-testnets
    ```

6. Run the UI

    ```bash
    make serve
    ```
