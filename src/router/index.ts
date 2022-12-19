import React from "react";
import Basket from "../components/Basket/Basket";
import Card from "../components/Card/Card";
import ClothesCardsList from "../components/ClothesCardsList/ClothesCardsList";
import Profile from "../components/Profile/Profile";
import { IRoute } from "../types/IRoute";

export const MainRoutes: IRoute[] = [
    {path: "/", exact: true, component: ClothesCardsList},
    {path: "*", exact: true, component: ClothesCardsList},
    {path: "/Profile", exact: true, component: Profile},
    {path: "/Basket", exact: true, component: Basket},
    {path: "/:id", exact: true, component: Card},
]