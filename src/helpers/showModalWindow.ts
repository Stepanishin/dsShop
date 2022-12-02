export const showCart = () => {
    let basket = document.getElementById('basket')!
    let modalAll = document.getElementById('modalAll')!
    let cardList = document.getElementById('CardList')!
    basket.classList.toggle('showBasket')
    modalAll.classList.toggle('showModal')
    cardList.classList.toggle('display_none_cardList')
}