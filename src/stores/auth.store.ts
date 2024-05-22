import { create } from "zustand";

interface AuthStore { 
    emailId: string;
    setEmailId: (emailId: string) => void;
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
}

const useAuthStore = create<AuthStore>(set => ({
    emailId: '',
    setEmailId: (emailId: string) => set(state => ({ ...state, emailId})),

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
}))

export default useAuthStore;