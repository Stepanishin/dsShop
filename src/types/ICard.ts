export interface ICard {
    id?: number,
    _id?: any
    name?: string,
    image?: string,
    priceUSDC?:number,
    priceNCTR?:number,
    isQuantity?:boolean,
    quantity?:number,
    modelNumber?: string,
    category?: string,
    description?: string,
    size?: string[],
    selectedSize?:string | null,
}