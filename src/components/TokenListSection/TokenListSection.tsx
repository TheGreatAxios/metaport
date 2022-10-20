import React from 'react';


import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import TokenData from '../../core/dataclasses/TokenData';
import { clsNames } from '../../core/helper';

import TokenBalance from '../TokenList/TokenBalance';

import styles from "../WidgetUI/WidgetUI.scss";
import localStyles from "./TokenListSection.scss";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const icons = importAll(require.context('../../icons', false, /\.(png|jpe?g|svg)$/));


function iconPath(name) {
  if (!name) return;
  const key = name.toLowerCase() + '.svg';
  if (icons[key]) {
    return icons[key];
  } else {
    return icons['eth.svg'];
  }
}


export default function TokenListSection(props) {

  function handle(tokenData: TokenData): void {
    props.setExpanded(false);
    props.setToken(tokenData);
  }

  if (Object.keys(props.tokens).length === 0) return;

  return (
    <div className={styles.mp__margBott5}>
      <p className={clsNames(styles.mp__flex, styles.mp__p3, styles.mp__p, styles.mp__flexGrow, styles.mp__margBott5)}>
        {props.type}
      </p>
      {Object.keys(props.tokens).map((key, i) => (
        <Typography key={key}>
          <Button
            color="secondary"
            size="small"
            className={styles.mp__btnChain}
            onClick={() => handle(props.tokens[key])}
          >
            <div className={clsNames(styles.mp__flex, styles.mp__btnChain)}>
              <div className={clsNames(styles.mp__flex, styles.mp__flexCentered)}>
                <img
                  className={clsNames(localStyles.mp__iconToken, localStyles.mp__iconTokenAccent)}
                  src={props.tokens[key].iconUrl ? props.tokens[key].iconUrl : iconPath(props.tokens[key].symbol)}
                />
              </div>
              <p className={clsNames(
                styles.mp__chainName,
                styles.mp__flex,
                styles.mp__flexGrow,
                styles.mp__margRi10
              )}>
                {props.tokens[key].name}
              </p>
              <TokenBalance token={props.tokens[key]} />
            </div>
          </Button>
        </Typography>
      ))}
    </div>
  )
}