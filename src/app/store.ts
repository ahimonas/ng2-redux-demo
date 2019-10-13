import { tassign } from 'tassign';
import { Action } from "rxjs/scheduler/Action";
import { CALCULATE, FETCH } from './actions';
import { stringify } from '@angular/core/src/facade/lang';


export interface IAppState {
    init: any; //Should make interfaces for these to ensure type safety
    baskets: any[];
}

export const INITIAL_STATE: IAppState = {
    init: [],
    baskets: []
}

export function Calculate(basket) {
    let retArr = [];
    let basketNumber = 0; 
    basket.forEach(function (itemsList) {
        let total = 0;
        let taxedItemList = '';
        let salesTax = 0; 
        itemsList.items.forEach(function (items) { //Should simplify & break up this logic a bit, kind of messy 
            let tempItemsArr = items.split(' ');
            let amountIndex = tempItemsArr.length - 1;
            let amount = tempItemsArr[amountIndex];
            let itemsTaxed = processTax(items, Number(amount));
            salesTax += Number(itemsTaxed[1]);
            tempItemsArr[amountIndex] = itemsTaxed[0];
            taxedItemList += [...tempItemsArr].join(' ') + ' ';
            total += Number(tempItemsArr[amountIndex]);
        });
        basketNumber++; 
        retArr = retArr.concat(("Output " + basketNumber + ":")).concat(taxedItemList).concat("Sales Tax: " + (Math.round(100 * salesTax) / 100).toFixed(2)).concat("total: " + (Math.round(100 * total) / 100).toFixed(2));
    });
    return retArr;
}

export function processTax(itemName: any, amount: number) {
    let total = 0;
    if (!(itemName.includes('Snickers') || itemName.includes('Skittles') || itemName.includes('Popcorn') || itemName.includes('Coffee'))) {
        total = Number(total) + Number((Math.ceil((amount * .1) * 20) / 20).toFixed(2));
    }
    if ((itemName.toUpperCase().includes('IMPORTED'))) {
        total = Number(total) + Number((Math.ceil((amount * .05) * 20) / 20).toFixed(2));
    }
    return [(total + amount).toFixed(2), total];
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case CALCULATE:
            return tassign(state, { baskets: Calculate(state.init) }); //Using .concat returns new array which follows redux design patterns 

        case FETCH:
            return tassign(state, {
                init: state.init.concat(action.init)
            });
    }
    return state;

}
