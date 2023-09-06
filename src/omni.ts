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
// Omni
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const omniABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceTxHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'TransactionMarkReverted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceTxHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'TransactionMarkSuccess',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'destChain',
        internalType: 'string',
        type: 'string',
        indexed: true,
      },
      { name: 'nonce', internalType: 'uint64', type: 'uint64', indexed: true },
      { name: 'tx', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'TransactionSent',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isExternalTx',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'sendTx',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'txSourceChain',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const

export const omniAddress = '0x1212400000000000000000000000000000000001' as const

export const omniConfig = { address: omniAddress, abi: omniABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniABI}__.
 */
export function useOmniRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof omniABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractRead({
    abi: omniABI,
    address: omniAddress,
    ...config,
  } as UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniABI}__ and `functionName` set to `"isExternalTx"`.
 */
export function useOmniIsExternalTx<
  TFunctionName extends 'isExternalTx',
  TSelectData = ReadContractResult<typeof omniABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniABI,
    address: omniAddress,
    functionName: 'isExternalTx',
    ...config,
  } as UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniABI}__ and `functionName` set to `"isOmniTx"`.
 */
export function useOmniIsOmniTx<
  TFunctionName extends 'isOmniTx',
  TSelectData = ReadContractResult<typeof omniABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniABI,
    address: omniAddress,
    functionName: 'isOmniTx',
    ...config,
  } as UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniABI}__ and `functionName` set to `"isTxFrom"`.
 */
export function useOmniIsTxFrom<
  TFunctionName extends 'isTxFrom',
  TSelectData = ReadContractResult<typeof omniABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniABI,
    address: omniAddress,
    functionName: 'isTxFrom',
    ...config,
  } as UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link omniABI}__ and `functionName` set to `"isTxFromOneOf"`.
 */
export function useOmniIsTxFromOneOf<
  TFunctionName extends 'isTxFromOneOf',
  TSelectData = ReadContractResult<typeof omniABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: omniABI,
    address: omniAddress,
    functionName: 'isTxFromOneOf',
    ...config,
  } as UseContractReadConfig<typeof omniABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniABI}__.
 */
export function useOmniWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof omniABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof omniABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof omniABI, TFunctionName, TMode>({
    abi: omniABI,
    address: omniAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniABI}__ and `functionName` set to `"sendTx"`.
 */
export function useOmniSendTx<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof omniABI, 'sendTx'>['request']['abi'],
        'sendTx',
        TMode
      > & { functionName?: 'sendTx' }
    : UseContractWriteConfig<typeof omniABI, 'sendTx', TMode> & {
        abi?: never
        functionName?: 'sendTx'
      } = {} as any,
) {
  return useContractWrite<typeof omniABI, 'sendTx', TMode>({
    abi: omniABI,
    address: omniAddress,
    functionName: 'sendTx',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link omniABI}__ and `functionName` set to `"txSourceChain"`.
 */
export function useOmniTxSourceChain<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof omniABI,
          'txSourceChain'
        >['request']['abi'],
        'txSourceChain',
        TMode
      > & { functionName?: 'txSourceChain' }
    : UseContractWriteConfig<typeof omniABI, 'txSourceChain', TMode> & {
        abi?: never
        functionName?: 'txSourceChain'
      } = {} as any,
) {
  return useContractWrite<typeof omniABI, 'txSourceChain', TMode>({
    abi: omniABI,
    address: omniAddress,
    functionName: 'txSourceChain',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniABI}__.
 */
export function usePrepareOmniWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniABI,
    address: omniAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniABI}__ and `functionName` set to `"sendTx"`.
 */
export function usePrepareOmniSendTx(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniABI, 'sendTx'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniABI,
    address: omniAddress,
    functionName: 'sendTx',
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniABI, 'sendTx'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link omniABI}__ and `functionName` set to `"txSourceChain"`.
 */
export function usePrepareOmniTxSourceChain(
  config: Omit<
    UsePrepareContractWriteConfig<typeof omniABI, 'txSourceChain'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: omniABI,
    address: omniAddress,
    functionName: 'txSourceChain',
    ...config,
  } as UsePrepareContractWriteConfig<typeof omniABI, 'txSourceChain'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link omniABI}__.
 */
export function useOmniEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof omniABI, TEventName>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractEvent({
    abi: omniABI,
    address: omniAddress,
    ...config,
  } as UseContractEventConfig<typeof omniABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link omniABI}__ and `eventName` set to `"TransactionMarkReverted"`.
 */
export function useOmniTransactionMarkRevertedEvent(
  config: Omit<
    UseContractEventConfig<typeof omniABI, 'TransactionMarkReverted'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: omniABI,
    address: omniAddress,
    eventName: 'TransactionMarkReverted',
    ...config,
  } as UseContractEventConfig<typeof omniABI, 'TransactionMarkReverted'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link omniABI}__ and `eventName` set to `"TransactionMarkSuccess"`.
 */
export function useOmniTransactionMarkSuccessEvent(
  config: Omit<
    UseContractEventConfig<typeof omniABI, 'TransactionMarkSuccess'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: omniABI,
    address: omniAddress,
    eventName: 'TransactionMarkSuccess',
    ...config,
  } as UseContractEventConfig<typeof omniABI, 'TransactionMarkSuccess'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link omniABI}__ and `eventName` set to `"TransactionSent"`.
 */
export function useOmniTransactionSentEvent(
  config: Omit<
    UseContractEventConfig<typeof omniABI, 'TransactionSent'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: omniABI,
    address: omniAddress,
    eventName: 'TransactionSent',
    ...config,
  } as UseContractEventConfig<typeof omniABI, 'TransactionSent'>)
}
