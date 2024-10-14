import localforage from "localforage";
import { create } from "zustand";

interface IAuth {
  uid: string;
  email: string;
  displayName?: string;
  accessToken: string;
}

interface IUseCache {
  auth: IAuth | null;
  setAuth: (auth: IAuth | null) => void;
}

/**
 * useCache : 전역 client, user 설정
 */
export const useCache = create<IUseCache>(set => ({
  auth: null,
  setAuth: async (auth: IAuth | null) => {
    set(state => ({ ...state, auth: auth }));
    await localforage.setItem("auth", auth);
  },
}));

export const setInitAuth = async () => {
  const localAuth: IAuth | null = await localforage.getItem("auth");
  return localAuth;
};
