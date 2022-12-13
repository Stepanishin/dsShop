import {combineReducers, configureStore} from "@reduxjs/toolkit";
import addCardSlice from './reducers/getProductToBasket'
import getOrdersSlice from './reducers/getProductFromOrderDB'

const rootReducer = combineReducers({
    addCardSlice,
    getOrdersSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']