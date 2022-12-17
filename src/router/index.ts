import React from "react";
import ClothesCardsList from "../components/ClothesCardsList/ClothesCardsList";
import NFTCardsList from "../components/NFTCardsList/NFTCardsList";
import Profile from "../components/Profile/Profile";
import { IRoute } from "../types/IRoute";

export const MainRoutes: IRoute[] = [
    {path: "/", exact: true, component: ClothesCardsList},
    {path: "*", exact: true, component: ClothesCardsList},
    {path: "/NFT", exact: true, component: NFTCardsList},
    {path: "/Profile", exact: true, component: Profile},
]