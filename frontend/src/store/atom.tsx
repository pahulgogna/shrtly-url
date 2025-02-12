import { atom, RecoilState } from "recoil";


export const UrlsAtom: RecoilState<string[] | null> = atom({
    key: "UrlsAtom",
    default: localStorage.getItem("urls") ? JSON.parse(localStorage.getItem("urls") ?? "[]") : null
})