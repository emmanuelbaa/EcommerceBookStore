// @ts-ignore
// @ts-ignore

import {ShoppingCartItem, BookItem} from "../types";
import {Dispatch, ReducerAction} from "react";


export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR'
};

type AppActions = {
    // @ts-ignore
    id: bookId;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item: BookItem;
}
// const initialCartState = localStorage.getItem("cart") || [];
const findItem = (array: any[], id: number) => array.find((item)=> // @ts-ignore
item.id == id);

export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    switch (action.type) {
        case CartTypes.ADD:


            if (findItem(state, action.id))
                return state.map((cartItem)=>
                cartItem.id === action.id? {...cartItem, quantity: cartItem.quantity +1}
            :cartItem
        );
            return [
                ...state,
                {id: action.id,items:action.item, quantity: 1 },
            ];

        case CartTypes.REMOVE:
            if (findItem(state, action.id))

            state = state.filter((item)=>{
                if (item.id === action.id){

                    if (item.quantity === 1){
                        return false;

                    }

                }
                return true;
            }).map ((cartItem)=> cartItem.id === action.id

                ? { ...cartItem, quantity: cartItem.quantity -1} : cartItem);
            return state;

        case CartTypes.CLEAR:
            return [];
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};


