import { create } from "zustand";

interface AuthStore { 
    userEmailId: string;
    setEmailId: (userEmailId: string) => void;
    password: string;
    setPassword: (password: string) => void;
    nickname: string;
    setNickname: (nickname: string) => void;
    userTelNumber: string;
    setUserTelNumber: (userTelNumber: string) => void;
    authNumber: string;
    setAuthNumber: (authNumber: string) => void;
    userAddress: string;
    setUserAddress: (userAddress: string) => void;
    userName: string;
    setUserName: (userName: string) => void;
    joinPath: string;
    setJoinPath: (joinPath: string) => void;
    snsId: string | undefined;
    setSnsId: (snsId: string | undefined) => void;
}

const useAuthStore = create<AuthStore>(set => ({
    userEmailId: '',
    setEmailId: (userEmailId: string) => set(state => ({ ...state, userEmailId})),

    password: '',
    setPassword: (password: string) => set(state => ({ ...state, password})),

    nickname: '',
    setNickname: (nickname: string) => set(state => ({ ...state, nickname})),

    userTelNumber: '',
    setUserTelNumber: (userTelNumber: string) => set(state => ({ ...state, userTelNumber})),

    authNumber: '',
    setAuthNumber: (authNumber: string) => set(state => ({ ...state, authNumber})),

    userAddress: '',
    setUserAddress: (userAddress: string) => set(state => ({ ...state, userAddress})),
    
    userName: '',
    setUserName: (userName: string) => set(state => ({...state, userName})),

    joinPath: 'HOME',
    setJoinPath: (joinPath: string) => set(state => ({...state, joinPath})),
    
    snsId: undefined,
    setSnsId: (snsId: string | undefined) => set(state => ({...state, snsId})),

}))

export default useAuthStore;
