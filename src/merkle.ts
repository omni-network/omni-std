import { ethers } from 'ethers'

export type StorageProof = {
  storageProof: string
  storageValue: string
  storageKey: string
  storageHash: string
}

export const toRpcHexString = (n: number) => '0x' + n.toString(16)

export const getStorageProof = async (
  provider: ethers.providers.JsonRpcProvider,
  blockNumber: number,
  address: string,
  slot: string,
): Promise<StorageProof> => {
  const proof = await provider.send('eth_getProof', [
    address,
    [slot],
    toRpcHexString(blockNumber),
  ])

  return {
    storageHash: proof.storageHash,
    storageProof: proof.storageProof[0].proof[0],
    storageValue: proof.storageProof[0].value,
    storageKey: proof.storageProof[0].key,
  }
}
