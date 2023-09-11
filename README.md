# Omni Standard Library

Solidity contracts for building cross-rollup smart contract systems. Read more at the [documentation portal](https://docs.omni.network).

Simple examples of smart contract systems built with this library can be found at [omni-network/examples](https://github.com/omni-network/examples).

## Directory Overview

- `contracts/`: Omni solidity library implementation
- `src/`: typescript & react utilities for interacting with Omni contracts

## Usage

You'll need to import these contracts to your own repo to use them. You can use any of the following methods:


### npm


Install

```bash
yarn add @omni-network/contracts
pnpm add @omni-network/contract
npm install @omni-network/contracts
```


Import (solidity)


```solidity
import {OmniScient} from "@omni-network/contracts/contracts/OmniScient.sol";
import {OmniCodec} from "@omni-network/contracts/contracts/OmniCodec.sol";
import {IOmni} from "@omni-network/contracts/contracts/interfaces/IOmni.sol";
import {IOmniPortal} from "@omni-network/contracts/contracts/interfaces/IOmniPortal.sol";
```


Import (js)

```js
import {omniABI, omniPortalABI} from "@omni-network/contracts"
```


### forge


Install


```bash
forge install github.com/omni-network/omni-std
```

Import (solidity)

```solidity
import {OmniScient} from "lib/omni-std/contracts/OmniScient.sol";
import {OmniCodec} from "lib/omni-std/contracts/OmniCodec.sol";
import {IOmni} from "lib/omni-std/contracts/interfaces/IOmni.sol";
import {IOmniPortal} from "lib/omni-std/contracts/interfaces/IOmniPortal.sol";
```

Or, use [remappings](https://book.getfoundry.sh/projects/dependencies#remapping-dependencies)


```toml
# foundry.toml
remappings = [
  "omni-std/=lib/omni-std/contracts",
]
```

Update imports

```solidity
import {OmniScient} from "omni-std/OmniScient.sol";
import {OmniCodec} from "omni-std/OmniCodec.sol";
import {IOmni} from "omni-std/interfaces/IOmni.sol";
import {IOmniPortal} from "omni-std/contracts/interfaces/IOmniPortal.sol";
```
