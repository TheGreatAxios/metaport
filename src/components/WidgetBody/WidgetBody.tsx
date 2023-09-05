import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'

import { useCollapseStore } from '../../store/Store'
import { useMetaportStore } from '../../store/MetaportState'
import { useSFuelStore } from '../../store/SFuelStore'
import { useUIStore } from '../../store/Store'

import ChainsList from '../ChainsList'
import AmountInput from '../AmountInput'
import SkStepper from '../Stepper'
import SkPaper from '../SkPaper'
import AmountErrorMessage from '../AmountErrorMessage'
import SwitchDirection from '../SwitchDirection'
import { TokenBalance } from '../TokenList'
import DestTokenBalance from '../DestTokenBalance'
import ErrorMessage from '../ErrorMessage'
import CommunityPool from '../CommunityPool'
import SFuelWarning from '../SFuelWarning'
import SkConnect from '../SkConnect'
import WrappedTokens from '../WrappedTokens'

import cmn from '../../styles/cmn.module.scss'
import { cls } from '../../core/helper'
import { Collapse } from '@mui/material'
import { MAINNET_CHAIN_NAME } from '../../core/constants'
import { chainBg } from '../../core/metadata'

export function WidgetBody(props) {
  const expandedFrom = useCollapseStore((state) => state.expandedFrom)
  const setExpandedFrom = useCollapseStore((state) => state.setExpandedFrom)

  const expandedTo = useCollapseStore((state) => state.expandedTo)
  const setExpandedTo = useCollapseStore((state) => state.setExpandedTo)

  const expandedCP = useCollapseStore((state) => state.expandedCP)
  const expandedWT = useCollapseStore((state) => state.expandedWT)
  const expandedTokens = useCollapseStore((state) => state.expandedTokens)

  const destChains = useMetaportStore((state) => state.destChains)

  const token = useMetaportStore((state) => state.token)
  const chainName1 = useMetaportStore((state) => state.chainName1)
  const chainName2 = useMetaportStore((state) => state.chainName2)

  const setChainName1 = useMetaportStore((state) => state.setChainName1)
  const setChainName2 = useMetaportStore((state) => state.setChainName2)

  const mpc = useMetaportStore((state) => state.mpc)
  const tokens = useMetaportStore((state) => state.tokens)
  const setToken = useMetaportStore((state) => state.setToken)
  const tokenBalances = useMetaportStore((state) => state.tokenBalances)

  const errorMessage = useMetaportStore((state) => state.errorMessage)
  const loading = useMetaportStore((state) => state.loading)

  const transferInProgress = useMetaportStore((state) => state.transferInProgress)

  const sFuelOk = useSFuelStore((state) => state.sFuelOk)

  const theme = useUIStore((state) => state.theme)

  const { address } = useAccount()

  useEffect(() => {
    setChainName1(mpc.config.chains ? mpc.config.chains[0] : '')
    setChainName2(mpc.config.chains ? mpc.config.chains[1] : '')
  }, [])

  useEffect(() => {
    if (tokens && tokens.erc20 && Object.values(tokens.erc20)[0]) {
      setToken(Object.values(tokens.erc20)[0])
    }
  }, [tokens])

  const showFrom = !expandedTo && !expandedTokens && !errorMessage && !expandedCP
  const showTo = !expandedFrom && !expandedTokens && !errorMessage && !expandedCP && !expandedWT
  const showInput = !expandedFrom && !expandedTo && !errorMessage && !expandedCP && !expandedWT
  const showSwitch = !expandedFrom && !expandedTo && !expandedTokens && !errorMessage && !expandedCP && !expandedWT
  const showStepper =
    !expandedFrom &&
    !expandedTo &&
    !expandedTokens &&
    !errorMessage &&
    !expandedCP &&
    sFuelOk &&
    !expandedWT &&
    !!address
  const showCP =
    !expandedFrom && !expandedTo && !expandedTokens && chainName2 === MAINNET_CHAIN_NAME && !expandedWT
  const showWT = !expandedFrom &&
    !expandedTo &&
    !expandedTokens &&
    !errorMessage &&
    !expandedCP &&
    sFuelOk &&
    !!address
  const showError = !!errorMessage

  const grayBg = 'rgb(136 135 135 / 15%)'
  const sourceBg = theme.vibrant ? chainBg(mpc.config.skaleNetwork, chainName1) : grayBg
  const destBg = theme.vibrant ? chainBg(mpc.config.skaleNetwork, chainName2) : grayBg

  return (
    <div>
      <Collapse in={showError}>
        <ErrorMessage errorMessage={errorMessage} />
      </Collapse>
      <SkPaper background={sourceBg} className={cmn.nop}>
        <SkPaper background="transparent" className={cmn.nop}>
          <Collapse in={showFrom}>
            <div className={cls(cmn.ptop20, cmn.mleft20, cmn.mri20, cmn.flex)}>
              <p className={cls(cmn.nom, cmn.p, cmn.p4, cmn.pSec, cmn.flex, cmn.flexg)}>From</p>
              <div>
                {token ? (
                  <TokenBalance
                    balance={tokenBalances[token.keyname]}
                    symbol={token.meta.symbol}
                    decimals={token.meta.decimals}
                    truncate={9}
                  />
                ) : null}
              </div>
            </div>
            <ChainsList
              config={props.config}
              expanded={expandedFrom}
              setExpanded={setExpandedFrom}
              chain={chainName1}
              chains={props.config.chains}
              setChain={setChainName1}
              disabledChain={chainName2}
              disabled={transferInProgress || loading}
              from={true}
            />
          </Collapse>
        </SkPaper>
        <Collapse in={showInput}>
          <SkPaper gray className={cls()}>
            <AmountInput />
          </SkPaper>
        </Collapse>
      </SkPaper>

      <Collapse in={showSwitch}>
        <SwitchDirection />
      </Collapse>

      <Collapse in={showTo}>
        <SkPaper background={destBg} className={cmn.nop}>
          <div className={cls(cmn.ptop20, cmn.mleft20, cmn.mri20, cmn.flex)}>
            <p className={cls(cmn.nom, cmn.p, cmn.p4, cmn.pSec, cmn.flex, cmn.flexg)}>To</p>
            <DestTokenBalance />
          </div>
          <ChainsList
            config={props.config}
            expanded={expandedTo}
            setExpanded={setExpandedTo}
            chain={chainName2}
            chains={destChains}
            setChain={setChainName2}
            disabledChain={chainName1}
            disabled={transferInProgress || loading}
          />
        </SkPaper>
      </Collapse>
      <AmountErrorMessage />

      <Collapse in={showCP}>
        <SkPaper gray className={cmn.nop}>
          <CommunityPool />
        </SkPaper>
      </Collapse>

      <Collapse in={showWT}>
        <SkPaper gray className={cmn.nop}>
          <WrappedTokens />
        </SkPaper>
      </Collapse>

      <Collapse in={!!address}>
        <SFuelWarning />
      </Collapse>
      <Collapse in={showStepper}>
        <SkPaper background="transparent">
          <SkStepper skaleNetwork={props.config.skaleNetwork} />
        </SkPaper>
      </Collapse>
      {!address ? <SkConnect /> : null}
    </div>
  )
}

export default WidgetBody
