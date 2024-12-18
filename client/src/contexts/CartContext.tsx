import {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import {cartReducer, CartTypes,} from "../reducers/CartReducer";
import { ShoppingCartItem} from "../types";


const storageKey = "cart";
export const activeCategoryKey= "lastCategory";

const initialCartState:ShoppingCartItem[] =  []
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';



export const CartProvider = ({ children }: { children: ReactNode }) => {
    // @ts-ignore
    const [cart, dispatch] = useReducer(cartReducer, initialCartState, (initialState)=>{
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },


    );
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }, [cart]);

    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
};


