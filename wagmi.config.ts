import { Abi } from 'abitype'
import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import Omni from './artifacts/IOmni.sol/IOmni.json'
import OmniPortal from './artifacts/IOmniPortal.sol/IOmniPortal.json'

export default defineConfig([
  {
    out: 'src/omni.ts',
    contracts: [
      {
        abi: Omni.abi as Abi,
        name: 'Omni',
        address: '0x1212400000000000000000000000000000000001',
      },
    ],
    plugins: [react()],
  },
  {
    out: 'src/portal.ts',
    contracts: [
      {
        abi: OmniPortal.abi as Abi,
        name: 'OmniPortal',
        // when stable, we should realease with portal addresses by chain
        // address: {
        //  [chainId]: address
        // }
      },
    ],
    plugins: [react()],
  },
])
