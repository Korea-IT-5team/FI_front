import { create } from "zustand";

interface UserStore 
{
    loginUserEmailId: string,
    setLoginUserEmailId: (loginUserEmailId: string) => void,
    loginUserRole: string,
    setLoginUserRole: (loginUserRole:string) => void,
    restaurantId:number,
    setRestaurantId: (restaurantId:number) => void,
    reservationStatus:boolean,
    setReservationStatus: (reservationStatus:boolean) => void,
}

const useUserStore = create<UserStore>(set => ({
    loginUserEmailId: '',
    setLoginUserEmailId: (loginUserEmailId:string) => set(state => ({ ...state, loginUserEmailId})),
    loginUserRole: '',
    setLoginUserRole: (loginUserRole:string) => set(state => ({...state,loginUserRole})),
    restaurantId:0,
    setRestaurantId: (restaurantId:number) => set(state => ({...state,restaurantId})),
    reservationStatus:false,
    setReservationStatus: (reservationStatus:boolean) => set(state => ({...state,reservationStatus})),
}));

export default useUserStore;
