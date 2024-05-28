import { create } from "zustand";

interface UserStore {
    loginUserEmailId: string,
    setLoginUserEmailId: (loginUserEmailId: string) => void,
    loginUserRole: string,
    setLoginUserRole: (loginUserRole: string) => void,
    restaurantId:number,
    setRestaurantId: (RestaurantId:number) => void,
    restaurantName:string,
    SetRestaurantName: (restaurantName:string) => void,
    userReservationStatus:boolean,
    setUserReservationStatus: (reservationStatus:boolean) => void,
    userFavoriteStatus:boolean,
    setUserFavoriteStatus: (favoriteStatus:boolean) => void
}

const useUserStore = create<UserStore>(set => ({
    loginUserEmailId: '',
    setLoginUserEmailId: (loginUserEmailId: string) => set(state => ({ ...state, loginUserEmailId})),
    loginUserRole: '',
    setLoginUserRole: (loginUserRole:string) => set(state => ({...state, loginUserRole})),
    restaurantId:0,
    setRestaurantId: (RestaurantId:number) => set(state => ({...state, RestaurantId})),
    restaurantName:'',
    SetRestaurantName: (restaurantName:string) => set(state => ({...state, restaurantName})),
    userReservationStatus:false,
    setUserReservationStatus: (reservationStatus:boolean) => set(state => ({...state, reservationStatus})),
    userFavoriteStatus:false,
    setUserFavoriteStatus: (favoriteStatus:boolean) => set(state => ({...state, favoriteStatus})),
}));

export default useUserStore;
