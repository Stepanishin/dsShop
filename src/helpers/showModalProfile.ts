export const useShowProfile = () => {

    let profile = document.getElementById('profile')!
    let modalAll = document.getElementById('modalAllProfile')!
    let cardList = document.getElementById('CardList')!
    profile.classList.toggle('showProfile')
    modalAll.classList.toggle('showModal')
    cardList.classList.toggle('display_none_cardList')
}