import { BookItem } from "../types";

export const OrderDetails = {
    UPDATE: 'UPDATE',
    CLEAR: 'CLEAR'
};

type OrderDetailsState = Record<string, any>;

type AppActions =
    | { type: typeof OrderDetails.UPDATE; payload: OrderDetailsState }
    | { type: typeof OrderDetails.CLEAR };

const initialState: OrderDetailsState = {};

export const orderDetailsReducer = (state: OrderDetailsState = initialState, action: AppActions): OrderDetailsState => {
    switch (action.type) {
        case OrderDetails.UPDATE:
            // @ts-ignore
            // @ts-ignore
            return { ...(action )?.payload };

        case OrderDetails.CLEAR:
            return {};

        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
};
