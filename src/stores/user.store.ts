import { create } from "zustand";

interface UserStore {
    loginUserEmailId: string,
    setLoginUserEmailId: (loginUserEmailId: string) => void,
    loginUserRole: string,
    setLoginUserRole: (loginUserRole: string) => void,
    restaurantId:number,
    setRestaurantId: (RestaurantId:number) => void,
    reservationStatus:boolean,
    setReservationStatus: (reservationStatus:boolean) => void,
    restaurantName:string,
    SetRestaurantName: (restaurantName:string) => void,
    favoriteStatus:boolean,
    setFavoriteStatus: (favoriteStatus:boolean) => void
}

const useUserStore = create<UserStore>(set => ({
    loginUserEmailId: '',
    setLoginUserEmailId: (loginUserEmailId: string) => set(state => ({ ...state, loginUserEmailId})),
    loginUserRole: '',
    setLoginUserRole: (loginUserRole:string) => set(state => ({...state, loginUserRole})),
    restaurantId:0,
    setRestaurantId: (RestaurantId:number) => set(state => ({...state, RestaurantId})),
    reservationStatus:false,
    setReservationStatus: (reservationStatus:boolean) => set(state => ({...state, reservationStatus})),
    favoriteStatus:false,
    setFavoriteStatus: (favoriteStatus:boolean) => set(state => ({...state, favoriteStatus})),
    restaurantName:'',
    SetRestaurantName: (restaurantName:string) => set(state => ({...state, restaurantName})),
}));

export default useUserStore;
