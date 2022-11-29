import {combineReducers, configureStore} from "@reduxjs/toolkit";
import addCardSlice from './reducers/getProductToBasket'

const rootReducer = combineReducers({
    addCardSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']