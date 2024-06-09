import { create } from "zustand";

interface UserStore {
    loginUserEmailId: string,
    setLoginUserEmailId: (loginUserEmailId: string) => void,
    loginUserRole: string,
    setLoginUserRole: (loginUserRole: string) => void,
    restaurantId:number,
    setRestaurantId: (RestaurantId:number) => void,
    userReservationStatus:boolean,
    setUserReservationStatus: (reservationStatus:boolean) => void,
    userFavoriteStatus:boolean,
    setUserFavoriteStatus: (userFavoriteStatus:boolean) => void
}

const useUserStore = create<UserStore>(set => ({
    loginUserEmailId: '',
    setLoginUserEmailId: (loginUserEmailId: string) => set(state => ({ ...state, loginUserEmailId})),
    loginUserRole: '',
    setLoginUserRole: (loginUserRole:string) => set(state => ({...state, loginUserRole})),
    restaurantId:0,
    setRestaurantId: (RestaurantId:number) => set(state => ({...state, RestaurantId})),
    userReservationStatus:false,
    setUserReservationStatus: (userReservationStatus:boolean) => set(state => ({...state, userReservationStatus})),
    userFavoriteStatus:false,
    setUserFavoriteStatus: (userFavoriteStatus:boolean) => set(state => ({...state, userFavoriteStatus})),
}));

export default useUserStore;
