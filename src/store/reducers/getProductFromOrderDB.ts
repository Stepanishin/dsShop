import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../types/ICard";

// type DefaultCardType = {
//     orders: ICard[]
// }

const initialState : any = {  
    orders: []
}

export const getOrdersSlice = createSlice({
    name: "getOrders",
    initialState,
    reducers: {
            getOrders(state, action) {
                state.orders = [...action.payload]
                localStorage.setItem('userData', JSON.stringify(state.orders));
            },
        },
})

export default getOrdersSlice.reducer