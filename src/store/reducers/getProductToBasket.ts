import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../types/ICard";

type DefaultBasketType = {
    cards: ICard[]
}

const initialState : DefaultBasketType = {  
    cards: JSON.parse(sessionStorage?.getItem('cards')!) ? JSON.parse(sessionStorage?.getItem('cards')!) : []
}

export const addCardSlice = createSlice({
    name: "addCard",
    initialState,
    reducers: {
            addCard(state, action) {
                state.cards = [...action.payload]
                sessionStorage.setItem('cards', JSON.stringify(state.cards));
            },
        },
})

export default addCardSlice.reducer