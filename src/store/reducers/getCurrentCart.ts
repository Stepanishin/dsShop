import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../types/ICard";
import db from '../../assets/db.json'

// type DefaultGetCurrentCard = {
//     card: ICard
// }

const initialState : any = {
    card: {
        "id": 1,
        "name": "Gift Set Hoodie S size + T-shirt S size",
        "image": "https://i.ibb.co/BwZPkyh/box3.png",
        "priceUSDC": 1,
        "priceNCTR": 2,
        "modelNumber": "MT91547",
        "category": "clothes"
    }
}


export const getCurrentCardSlice = createSlice({
    name: "getCurrentCard",
    initialState,
    reducers: {
        getCurrentCard(state:any, action) {
                state.card = action.payload
            },
        },
})

export default getCurrentCardSlice.reducer