import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
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
    name: 'getLatestOmniBlock',
    outputs: [
      {
        name: '',
        internalType: 'struct OmniCodec.Block',
        type: 'tuple',
        components: [
          { name: 'sourceChain', internalType: 'string', type: 'string' },
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
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isXChainTx',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
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
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'supportedChains',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'txSender',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"getLatestOmniBlock"`.
 */
export function useOmniPortalGetLatestOmniBlock<
  TFunctionName extends 'getLatestOmniBlock',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'getLatestOmniBlock',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"supportedChains"`.
 */
export function useOmniPortalSupportedChains<
  TFunctionName extends 'supportedChains',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'supportedChains',
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniPortalABI}__ and `functionName` set to `"txSourceChain"`.
 */
export function useOmniPortalTxSourceChain<
  TFunctionName extends 'txSourceChain',
  TSelectData = ReadContractResult<typeof omniPortalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniPortalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniPortalABI,
    functionName: 'txSourceChain',
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
