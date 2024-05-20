import { create } from "zustand";

interface UserStore 
{
    loginUserEmailId: string,
    setLoginUserId: (loginUserEmailId: string) => void,
    loginUserRole: string,
    setLoginUserRole: (loginUserRole:string) => void,
}

const useUserStore = create<UserStore>(set => ({
    loginUserEmailId: '',
    setLoginUserId: (loginUserEmailId:string) => set(state => ({ ...state, loginUserEmailId})),
    loginUserRole: '',
    setLoginUserRole: (loginUserRole:string) => set(state => ({...state,loginUserRole}))
}));

export default useUserStore;
