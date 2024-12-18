import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect } from "react";
import { orderDetailsReducer } from "../reducers/orderDetails";
import {initialCartState, OrderDetails} from "../types";

// Define the key for storage
const storageKey = "order";

// Initial state for the context
const initialOrderDetailsState: OrderDetails | null = null;

// Create the context
export const OrderDetailsStore = createContext<{
    order: OrderDetails | null;
    dispatch: Dispatch<any>;
}>({
    order: initialOrderDetailsState,
    dispatch: () => null,
});

OrderDetailsStore.displayName = "OrderDetailsContext";

// Provider to wrap the component tree
export const OrderDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [order, dispatch] = useReducer(
        orderDetailsReducer,
        initialOrderDetailsState,
        (initialState) => {
            try {
                // Try to retrieve the order data from localStorage and parse it
                const storedOrderDetails = localStorage.getItem(storageKey);
                return storedOrderDetails ? JSON.parse(storedOrderDetails) : initialState;
            } catch (error) {
                console.error('Error parsing order details from localStorage', error);
                return initialState;
            }
        }
    );

    useEffect(() => {
        // When the order state changes, update localStorage
        localStorage.setItem(storageKey, JSON.stringify(order));
    }, [order]);

    // @ts-ignore
    // @ts-ignore
    return (
        // @ts-ignore
        <OrderDetailsStore.Provider value={{ order, dispatch }}>
            {children}
        </OrderDetailsStore.Provider>
    );
};

// Hook for consuming the context
export const useOrderDetails = () => {
    const context = useContext(OrderDetailsStore);
    if (!context) {
        throw new Error("useOrderDetails must be used within an OrderDetailsProvider");
    }
    return context;
};
