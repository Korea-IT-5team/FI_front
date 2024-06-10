import { create } from "zustand";

interface UserStore {
    loginUserEmailId: string,
    setLoginUserEmailId: (loginUserEmailId: string) => void,
    loginUserRole: string,
    setLoginUserRole: (loginUserRole: string) => void,
    businessRegistrationNumber: string,
    setBusinessRegistrationNumber: (businessRegistrationNumber: string) => void,

}

const useUserStore = create<UserStore>(set => ({
    loginUserEmailId: '',
    setLoginUserEmailId: (loginUserEmailId: string) => set(state => ({ ...state, loginUserEmailId})),
    loginUserRole: '',
    setLoginUserRole: (loginUserRole:string) => set(state => ({...state, loginUserRole})),
    businessRegistrationNumber: '',
    setBusinessRegistrationNumber: (businessRegistrationNumber:string) => set(state => ({...state, businessRegistrationNumber})),
}));

export default useUserStore;
<<<<<<< HEAD
//수정###
=======

>>>>>>> de7177a110b5358e2a1fdc50c09871c098d3fd30
