import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OmniPortal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const omniPortalABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'blockNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'block',
        internalType: 'struct OmniCodec.BlockChunk',
        type: 'tuple',
        components: [
          { name: 'destChain', internalType: 'string', type: 'string' },
          { name: 'parentHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'number', internalType: 'uint64', type: 'uint64' },
          {
            name: 'txs',
            internalType: 'struct OmniCodec.Tx[]',
            type: 'tuple[]',
            components: [
              {
                name: 'sourceTxHash',
                internalType: 'bytes32',
                type: 'bytes32',
              },
              { name: 'sourceChain', internalType: 'string', type: 'string' },
              { name: 'destChain', internalType: 'string', type: 'string' },
              { name: 'nonce', internalType: 'uint64', type: 'uint64' },
              { name: 'from', internalType: 'address', type: 'address' },
              { name: 'to', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'paid', internalType: 'uint256', type: 'uint256' },
              { name: 'gasLimit', internalType: 'uint64', type: 'uint64' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
            ],
          },
          { name: 'totalChunks', internalType: 'uint64', type: 'uint64' },
          { name: 'chunkIndex', internalType: 'uint64', type: 'uint64' },
        ],
        indexed: false,
      },
    ],
    name: 'OmniBlockAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'TransactionDeposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceTxHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'omniNonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'success', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'XChainTxResult',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_blockChunk',
        internalType: 'struct OmniCodec.BlockChunk',
        type: 'tuple',
        components: [
          { name: 'destChain', internalType: 'string', type: 'string' },
          { name: 'parentHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'number', internalType: 'uint64', type: 'uint64' },
          {
            name: 'txs',
            internalType: 'struct OmniCodec.Tx[]',
            type: 'tuple[]',
            components: [
              {
                name: 'sourceTxHash',
                internalType: 'bytes32',
                type: 'bytes32',
              },
              { name: 'sourceChain', internalType: 'string', type: 'string' },
              { name: 'destChain', internalType: 'string', type: 'string' },
              { name: 'nonce', internalType: 'uint64', type: 'uint64' },
              { name: 'from', internalType: 'address', type: 'address' },
              { name: 'to', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'paid', internalType: 'uint256', type: 'uint256' },
              { name: 'gasLimit', internalType: 'uint64', type: 'uint64' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
            ],
          },
          { name: 'totalChunks', internalType: 'uint64', type: 'uint64' },
          { name: 'chunkIndex', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: 'signatures', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'addOmniBlockChunk',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_blockChunks',
        internalType: 'struct OmniCodec.BlockChunk[]',
        type: 'tuple[]',
        components: [
          { name: 'destChain', internalType: 'string', type: 'string' },
          { name: 'parentHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'number', internalType: 'uint64', type: 'uint64' },
          {
            name: 'txs',
            internalType: 'struct OmniCodec.Tx[]',
            type: 'tuple[]',
            components: [
              {
                name: 'sourceTxHash',
                internalType: 'bytes32',
                type: 'bytes32',
              },
              { name: 'sourceChain', internalType: 'string', type: 'string' },
              { name: 'destChain', internalType: 'string', type: 'string' },
              { name: 'nonce', internalType: 'uint64', type: 'uint64' },
              { name: 'from', internalType: 'address', type: 'address' },
              { name: 'to', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'paid', internalType: 'uint256', type: 'uint256' },
              { name: 'gasLimit', internalType: 'uint64', type: 'uint64' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
            ],
          },
          { name: 'totalChunks', internalType: 'uint64', type: 'uint64' },
          { name: 'chunkIndex', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: 'signatures', internalType: 'bytes[][]', type: 'bytes[][]' },
    ],
    name: 'addOmniBlockChunks',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_orchestrator', internalType: 'address', type: 'address' },
    ],
    name: 'addOrchestrator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_chain', internalType: 'string', type: 'string' }],
    name: 'addSupportedChain',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'chain',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getLatestOmniBlockChunk',
    outputs: [
      {
        name: '',
        internalType: 'struct OmniCodec.BlockChunk',
        type: 'tuple',
        components: [
          { name: 'destChain', internalType: 'string', type: 'string' },
          { name: 'parentHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'number', internalType: 'uint64', type: 'uint64' },
          {
            name: 'txs',
            internalType: 'struct OmniCodec.Tx[]',
            type: 'tuple[]',
            components: [
              {
                name: 'sourceTxHash',
                internalType: 'bytes32',
                type: 'bytes32',
              },
              { name: 'sourceChain', internalType: 'string', type: 'string' },
              { name: 'destChain', internalType: 'string', type: 'string' },
              { name: 'nonce', internalType: 'uint64', type: 'uint64' },
              { name: 'from', internalType: 'address', type: 'address' },
              { name: 'to', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'paid', internalType: 'uint256', type: 'uint256' },
              { name: 'gasLimit', internalType: 'uint64', type: 'uint64' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
            ],
          },
          { name: 'totalChunks', internalType: 'uint64', type: 'uint64' },
          { name: 'chunkIndex', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isOmniTx',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'isOrchestrator',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'isTxFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
    ],
    name: 'isTxFromOneOf',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
    ],
    name: 'isTxFromOneOf',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
    ],
    name: 'isTxFromOneOf',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
    ],
    name: 'isTxFromOneOf',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isXChainTx',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_orchestrator', internalType: 'address', type: 'address' },
    ],
    name: 'removeOrchestrator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_chain', internalType: 'string', type: 'string' }],
    name: 'removeSupportedChain',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_block',
        internalType: 'struct OmniCodec.BlockChunk',
        type: 'tuple',
        components: [
          { name: 'destChain', internalType: 'string', type: 'string' },
          { name: 'parentHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'number', internalType: 'uint64', type: 'uint64' },
          {
            name: 'txs',
            internalType: 'struct OmniCodec.Tx[]',
            type: 'tuple[]',
            components: [
              {
                name: 'sourceTxHash',
                internalType: 'bytes32',
                type: 'bytes32',
              },
              { name: 'sourceChain', internalType: 'string', type: 'string' },
              { name: 'destChain', internalType: 'string', type: 'string' },
              { name: 'nonce', internalType: 'uint64', type: 'uint64' },
              { name: 'from', internalType: 'address', type: 'address' },
              { name: 'to', internalType: 'address', type: 'address' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
              { name: 'paid', internalType: 'uint256', type: 'uint256' },
              { name: 'gasLimit', internalType: 'uint64', type: 'uint64' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
            ],
          },
          { name: 'totalChunks', internalType: 'uint64', type: 'uint64' },
          { name: 'chunkIndex', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'resetState',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'sendOmniTx',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_chain', internalType: 'string', type: 'string' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'sendXChainTx',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'txSender',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'txSourceChain',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_blockNumber', internalType: 'uint64', type: 'uint64' },
      { name: '_storageProof', internalType: 'bytes', type: 'bytes' },
      { name: '_storageKey', internalType: 'bytes', type: 'bytes' },
      { name: '_storageValue', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyOmniState',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__.
 */
export function useOmniPortalRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"chain"`.
 */
export function useOmniPortalChain<
  TFunctionName extends 'chain',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'chain',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"getLatestOmniBlockChunk"`.
 */
export function useOmniPortalGetLatestOmniBlockChunk<
  TFunctionName extends 'getLatestOmniBlockChunk',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'getLatestOmniBlockChunk',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"isOmniTx"`.
 */
export function useOmniPortalIsOmniTx<
  TFunctionName extends 'isOmniTx',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'isOmniTx',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"isOrchestrator"`.
 */
export function useOmniPortalIsOrchestrator<
  TFunctionName extends 'isOrchestrator',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'isOrchestrator',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"isTxFrom"`.
 */
export function useOmniPortalIsTxFrom<
  TFunctionName extends 'isTxFrom',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'isTxFrom',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"isTxFromOneOf"`.
 */
export function useOmniPortalIsTxFromOneOf<
  TFunctionName extends 'isTxFromOneOf',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'isTxFromOneOf',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"isXChainTx"`.
 */
export function useOmniPortalIsXChainTx<
  TFunctionName extends 'isXChainTx',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'isXChainTx',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"nonce"`.
 */
export function useOmniPortalNonce<
  TFunctionName extends 'nonce',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'nonce',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"txSender"`.
 */
export function useOmniPortalTxSender<
  TFunctionName extends 'txSender',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'txSender',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"verifyOmniState"`.
 */
export function useOmniPortalVerifyOmniState<
  TFunctionName extends 'verifyOmniState',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'verifyOmniState',
    ...config,
  } as UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__.
 */
export function useOmniPortalWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof omniPortalABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, TFunctionName, TMode>({
    abi: omniPortalABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"addOmniBlockChunk"`.
 */
export function useOmniPortalAddOmniBlockChunk<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'addOmniBlockChunk'
        >['request']['abi'],
        'addOmniBlockChunk',
        TMode
      > & { functionName?: 'addOmniBlockChunk' }
    : UseContractWriteConfig<
        typeof omniPortalABI,
        'addOmniBlockChunk',
        TMode
      > & {
        abi?: never
        functionName?: 'addOmniBlockChunk'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'addOmniBlockChunk', TMode>({
    abi: omniPortalABI,
    functionName: 'addOmniBlockChunk',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"addOmniBlockChunks"`.
 */
export function useOmniPortalAddOmniBlockChunks<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'addOmniBlockChunks'
        >['request']['abi'],
        'addOmniBlockChunks',
        TMode
      > & { functionName?: 'addOmniBlockChunks' }
    : UseContractWriteConfig<
        typeof omniPortalABI,
        'addOmniBlockChunks',
        TMode
      > & {
        abi?: never
        functionName?: 'addOmniBlockChunks'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'addOmniBlockChunks', TMode>({
    abi: omniPortalABI,
    functionName: 'addOmniBlockChunks',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"addOrchestrator"`.
 */
export function useOmniPortalAddOrchestrator<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'addOrchestrator'
        >['request']['abi'],
        'addOrchestrator',
        TMode
      > & { functionName?: 'addOrchestrator' }
    : UseContractWriteConfig<typeof omniPortalABI, 'addOrchestrator', TMode> & {
        abi?: never
        functionName?: 'addOrchestrator'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'addOrchestrator', TMode>({
    abi: omniPortalABI,
    functionName: 'addOrchestrator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"addSupportedChain"`.
 */
export function useOmniPortalAddSupportedChain<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'addSupportedChain'
        >['request']['abi'],
        'addSupportedChain',
        TMode
      > & { functionName?: 'addSupportedChain' }
    : UseContractWriteConfig<
        typeof omniPortalABI,
        'addSupportedChain',
        TMode
      > & {
        abi?: never
        functionName?: 'addSupportedChain'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'addSupportedChain', TMode>({
    abi: omniPortalABI,
    functionName: 'addSupportedChain',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"removeOrchestrator"`.
 */
export function useOmniPortalRemoveOrchestrator<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'removeOrchestrator'
        >['request']['abi'],
        'removeOrchestrator',
        TMode
      > & { functionName?: 'removeOrchestrator' }
    : UseContractWriteConfig<
        typeof omniPortalABI,
        'removeOrchestrator',
        TMode
      > & {
        abi?: never
        functionName?: 'removeOrchestrator'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'removeOrchestrator', TMode>({
    abi: omniPortalABI,
    functionName: 'removeOrchestrator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"removeSupportedChain"`.
 */
export function useOmniPortalRemoveSupportedChain<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'removeSupportedChain'
        >['request']['abi'],
        'removeSupportedChain',
        TMode
      > & { functionName?: 'removeSupportedChain' }
    : UseContractWriteConfig<
        typeof omniPortalABI,
        'removeSupportedChain',
        TMode
      > & {
        abi?: never
        functionName?: 'removeSupportedChain'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'removeSupportedChain', TMode>({
    abi: omniPortalABI,
    functionName: 'removeSupportedChain',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"resetState"`.
 */
export function useOmniPortalResetState<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'resetState'
        >['request']['abi'],
        'resetState',
        TMode
      > & { functionName?: 'resetState' }
    : UseContractWriteConfig<typeof omniPortalABI, 'resetState', TMode> & {
        abi?: never
        functionName?: 'resetState'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'resetState', TMode>({
    abi: omniPortalABI,
    functionName: 'resetState',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"sendOmniTx"`.
 */
export function useOmniPortalSendOmniTx<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'sendOmniTx'
        >['request']['abi'],
        'sendOmniTx',
        TMode
      > & { functionName?: 'sendOmniTx' }
    : UseContractWriteConfig<typeof omniPortalABI, 'sendOmniTx', TMode> & {
        abi?: never
        functionName?: 'sendOmniTx'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'sendOmniTx', TMode>({
    abi: omniPortalABI,
    functionName: 'sendOmniTx',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"sendXChainTx"`.
 */
export function useOmniPortalSendXChainTx<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'sendXChainTx'
        >['request']['abi'],
        'sendXChainTx',
        TMode
      > & { functionName?: 'sendXChainTx' }
    : UseContractWriteConfig<typeof omniPortalABI, 'sendXChainTx', TMode> & {
        abi?: never
        functionName?: 'sendXChainTx'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'sendXChainTx', TMode>({
    abi: omniPortalABI,
    functionName: 'sendXChainTx',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"txSourceChain"`.
 */
export function useOmniPortalTxSourceChain<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniPortalABI,
          'txSourceChain'
        >['request']['abi'],
        'txSourceChain',
        TMode
      > & { functionName?: 'txSourceChain' }
    : UseContractWriteConfig<typeof omniPortalABI, 'txSourceChain', TMode> & {
        abi?: never
        functionName?: 'txSourceChain'
      } = {} as any,
) {
  return useContractWrite<typeof omniPortalABI, 'txSourceChain', TMode>({
    abi: omniPortalABI,
    functionName: 'txSourceChain',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__.
 */
export function usePrepareOmniPortalWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniPortalABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"addOmniBlockChunk"`.
 */
export function usePrepareOmniPortalAddOmniBlockChunk(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'addOmniBlockChunk'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'addOmniBlockChunk',
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniPortalABI, 'addOmniBlockChunk'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"addOmniBlockChunks"`.
 */
export function usePrepareOmniPortalAddOmniBlockChunks(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'addOmniBlockChunks'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'addOmniBlockChunks',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof omniPortalABI,
    'addOmniBlockChunks'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"addOrchestrator"`.
 */
export function usePrepareOmniPortalAddOrchestrator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'addOrchestrator'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'addOrchestrator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniPortalABI, 'addOrchestrator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"addSupportedChain"`.
 */
export function usePrepareOmniPortalAddSupportedChain(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'addSupportedChain'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'addSupportedChain',
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniPortalABI, 'addSupportedChain'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"removeOrchestrator"`.
 */
export function usePrepareOmniPortalRemoveOrchestrator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'removeOrchestrator'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'removeOrchestrator',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof omniPortalABI,
    'removeOrchestrator'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"removeSupportedChain"`.
 */
export function usePrepareOmniPortalRemoveSupportedChain(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'removeSupportedChain'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'removeSupportedChain',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof omniPortalABI,
    'removeSupportedChain'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"resetState"`.
 */
export function usePrepareOmniPortalResetState(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'resetState'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'resetState',
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniPortalABI, 'resetState'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"sendOmniTx"`.
 */
export function usePrepareOmniPortalSendOmniTx(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'sendOmniTx'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'sendOmniTx',
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniPortalABI, 'sendOmniTx'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"sendXChainTx"`.
 */
export function usePrepareOmniPortalSendXChainTx(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'sendXChainTx'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'sendXChainTx',
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniPortalABI, 'sendXChainTx'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"txSourceChain"`.
 */
export function usePrepareOmniPortalTxSourceChain(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniPortalABI, 'txSourceChain'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniPortalABI,
    functionName: 'txSourceChain',
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniPortalABI, 'txSourceChain'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link omniPortalABI}__.
 */
export function useOmniPortalEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof omniPortalABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: omniPortalABI,
    ...config,
  } as UseContractEventConfig<typeof omniPortalABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link omniPortalABI}__ and `eventName` set to `"OmniBlockAdded"`.
 */
export function useOmniPortalOmniBlockAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof omniPortalABI, 'OmniBlockAdded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: omniPortalABI,
    eventName: 'OmniBlockAdded',
    ...config,
  } as UseContractEventConfig<typeof omniPortalABI, 'OmniBlockAdded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link omniPortalABI}__ and `eventName` set to `"TransactionDeposited"`.
 */
export function useOmniPortalTransactionDepositedEvent(
  config: Omit<
    UseContractEventConfig<typeof omniPortalABI, 'TransactionDeposited'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: omniPortalABI,
    eventName: 'TransactionDeposited',
    ...config,
  } as UseContractEventConfig<typeof omniPortalABI, 'TransactionDeposited'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link omniPortalABI}__ and `eventName` set to `"XChainTxResult"`.
 */
export function useOmniPortalXChainTxResultEvent(
  config: Omit<
    UseContractEventConfig<typeof omniPortalABI, 'XChainTxResult'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: omniPortalABI,
    eventName: 'XChainTxResult',
    ...config,
  } as UseContractEventConfig<typeof omniPortalABI, 'XChainTxResult'>)
}
