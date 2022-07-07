import React, { useEffect } from 'react';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import skaleLogo from './skale_logo_short.svg';
import WidgetBody from '../WidgetBody';
import { Connector } from '../WalletConnector';

import "./Widget.scss";


let theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#000000'
    },
    primary: {
      main: '#000000',
    },
    secondary: {
      // main: '#edf2ff',
      main: '#d9e021'
    },
  },
});


export function WidgetUI(props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const divRef = React.useRef();

  const [disabledChains, setDisabledChains] = React.useState(undefined);

  useEffect(() => {
    if (props.open) {
      setAnchorEl(divRef.current);
    } else {
      setAnchorEl(null);
    }
  }, [props.open]);


  useEffect(() => {
    if (props.schains.length == 2) {
        props.setChain1(props.schains[0]);
        props.setChain2(props.schains[1]);
        setDisabledChains(true);
    }
  }, [props.schains]);

  useEffect(() => {
    if (props.tokens == undefined) return;
    if (Object.keys(props.tokens['erc20']).length == 1) {
      props.setToken(Object.keys(props.tokens['erc20'])[0]);
    }
  }, [props.tokens]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // setAnchorEl(anchorEl ? null : event.currentTarget);
    // setAnchorEl(anchorEl ? null : divRef.current);
    props.setOpen(props.open ? false : true);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'widget-body-popup' : undefined;

  return (
    <ThemeProvider theme={theme}>
      <div className="ima-widget-body">
        <Fab ref={divRef} color="primary" className='btn-bg' aria-label="add" aria-describedby={id} type="button" onClick={handleClick}>
          {open ? (
            <CloseIcon />
          ) : (
           
              <img className='skale-logo-sm' src={skaleLogo}/>
           
            
            
          )
          }
        </Fab>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className="ima-widget-popup-wrapper">
            <Paper elevation={3} className='widget-paper'>
              <div className='ima-widget-popup'>
                {props.walletConnected ? (
                  <WidgetBody
                    schains={props.schains}
                    setChain1={props.setChain1}
                    setChain2={props.setChain2}
                    chain1={props.chain1}
                    chain2={props.chain2}

                    schainAliases={props.schainAliases}

                    setToken={props.setToken}
                    token={props.token}
                    tokens={props.tokens}

                    balance={props.balance}
                    allowance={props.allowance}

                    disabledChains={disabledChains}

                    amount={props.amount}
                    setAmount={props.setAmount}

                    approveTransfer={props.approveTransfer}
                    transfer={props.transfer}

                    loading={props.loading}
                    setLoading={props.setLoading}

                    loadingTokens={props.loadingTokens}
                
                    activeStep={props.activeStep}
                    setActiveStep={props.setActiveStep}

                    setAmountLocked={props.setAmountLocked}
                    amountLocked={props.amountLocked}
                  />
                ) : (
                <Connector
                  connectMetamask={props.connectMetamask}
                />
              )}
              </div>
            </Paper>
          </div>
        </Popper>
      </div>
    </ThemeProvider>
  );
}


export default WidgetUI;
