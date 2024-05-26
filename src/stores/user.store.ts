import { create } from "zustand";

interface UserStore {
    loginUserEmailId: string,
    setLoginUserEmailId: (loginUserEmailId: string) => void,
    loginUserRole: string,
    setLoginUserRole: (loginUserRole: string) => void,
    RestaurantId:number,
    setRestaurantId: (RestaurantId:number) => void,
    reservationStatus:boolean,
    setReservationStatus: (reservationStatus:boolean) => void,
}

const useUserStore = create<UserStore>(set => ({
    loginUserEmailId: '',
    setLoginUserEmailId: (loginUserEmailId: string) => set(state => ({ ...state, loginUserEmailId})),
    loginUserRole: '',
    setLoginUserRole: (loginUserRole:string) => set(state => ({...state,loginUserRole})),
    RestaurantId:0,
    setRestaurantId: (RestaurantId:number) => set(state => ({...state,RestaurantId})),
    reservationStatus:false,
    setReservationStatus: (reservationStatus:boolean) => set(state => ({...state,reservationStatus})),
}));

export default useUserStore;
