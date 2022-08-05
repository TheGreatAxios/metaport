/**
 * @license
 * SKALE Metaport
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file events.ts
 * @copyright SKALE Labs 2022-Present
 */

import debug from './debug';


function dispatchEvent(name: string, data = {}) {
    window.dispatchEvent(new CustomEvent(name, {detail: data}));
    debug('event sent: ' + name);
}


export namespace externalEvents {    
    export function balance(tokenSymbol: string, schainName: string, balance: string) {
        dispatchEvent('metaport_balance', {
            "tokenSymbol": tokenSymbol,
            "schainName": schainName,
            "balance": balance
        });
    }

    export function transferComplete(
        tx: string,
        chainName1: string,
        chainName2: string,
        tokenSymbol: string,
        unwrap: boolean = false
    ) {
        dispatchEvent('metaport_transferComplete', {
            'tokenSymbol': tokenSymbol,
            'from': chainName1,
            'to': chainName2,
            'tx': tx,
            'unwrap': unwrap
        });
    }

    export function unwrapComplete(
        tx: string,
        chainName1: string,
        tokenSymbol: string,
    ) {
        dispatchEvent('metaport_unwrapComplete', {
            'tokenSymbol': tokenSymbol,
            'chain': chainName1,
            'tx': tx
        });
    }

    export function ethUnlocked(tx: string) {
        dispatchEvent('metaport_ethUnlocked', {
            'tx': tx
        });
    }

    export function connected() {
        dispatchEvent('metaport_connected');
    }
}

export namespace internalEvents {
    export function updateParams(params) {
        dispatchEvent('_metaport_updateParams', {
            'tokens': params.tokens,
            'schains': params.schains
        });
    }

    export function transfer(params) {
        dispatchEvent('_metaport_transfer', {
            'amount': params.amount,
            'schains': params.schains,
            'tokens': params.tokens
        });
    }

    export function wrap(params) {
        dispatchEvent('_metaport_wrap', {
            'amount': params.amount,
            'chain': params.chain,
            'tokens': params.tokens
        });
    }

    export function unwrap(params) {
        dispatchEvent('_metaport_unwrap', {
            'amount': params.amount,
            'chain': params.chain,
            'tokens': params.tokens
        });
    }

    export function swap(params) {
        dispatchEvent('_metaport_swap', {
            'amount': params.amount,
            'chain': params.chain,
            'tokens': params.tokens // todo!
        });
    }

    export function close() {
        dispatchEvent('_metaport_close');
    }

    export function open() {
        dispatchEvent('_metaport_open');
    }

    export function reset() {
        dispatchEvent('_metaport_reset');
    }

    export function requestBalance(params) {
        dispatchEvent('_metaport_requestBalance', {
            'schainName': params.schainName,
            'tokenSymbol': params.tokenSymbol
        });
    }

    export function setTheme(theme) {
        dispatchEvent('_metaport_setTheme', {
            'theme': theme
        });
    }
}