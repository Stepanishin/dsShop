import React from "react";
import ClothesCardsList from "../components/ClothesCardsList/ClothesCardsList";
import NFTCardsList from "../components/NFTCardsList/NFTCardsList";
import { IRoute } from "../types/IRoute";

export const MainRoutes: IRoute[] = [
    {path: "/", exact: true, component: ClothesCardsList},
    {path: "*", exact: true, component: ClothesCardsList},
    {path: "/NFT", exact: true, component: NFTCardsList},
    // {path: "/:id", exact: true, component: CardPage},
]