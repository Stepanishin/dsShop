import { ICard } from "./ICard";

export interface ISubmitFormResult {
    name?: string,
    surname?: string,
    nickname?: string,
    mail?: string,
    country?: string,
    city?: string,
    zip?: string,
    adress?: string,
    wallet?: string,
    sumUSDC?: number,
    sumNCTR?: number,
    sumSOL?: number,
    userOrder?:ICard[],
    status?: string,
    phone?: string,
    statusPayment?: string
}