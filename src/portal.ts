import { ethers } from 'ethers'
import { getStorageProof, StorageProof } from './merkle'
import { OmniPortal } from './abis'

export async function getStateRoot(
  provider: ethers.providers.JsonRpcProvider,
  portalAddress: string,
  blockNumber: number,
): Promise<string> {
  const portal = new ethers.Contract(portalAddress, OmniPortal.abi, provider)
  return portal.stateRoots(blockNumber)
}

export async function getOmniHead(
  provider: ethers.providers.JsonRpcProvider,
  portalAddress: string,
  blockNumber: number,
): Promise<{ blockNumber: ethers.BigNumber; stateRoot: string }> {
  const portal = new ethers.Contract(portalAddress, OmniPortal.abi, provider)
  return portal.getOmniHead(blockNumber)
}

export async function getStateProof({
  provider,
  blockNumber,
  storageSlot,
  address,
}: {
  provider: ethers.providers.JsonRpcProvider
  blockNumber: number
  storageSlot: string
  address: string
}): Promise<
  {
    blockNumber: number
    storageSlot: string
    address: string
  } & StorageProof
> {
  const p = await getStorageProof(provider, blockNumber, address, storageSlot)

  return {
    blockNumber,
    address,
    storageSlot,
    ...p,
  }
}
