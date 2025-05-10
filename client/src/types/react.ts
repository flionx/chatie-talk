import type { Dispatch, ReactNode, SetStateAction } from "react";

export type TSetState<T> = Dispatch<SetStateAction<T>>;

export interface IWithChildren {
    children: ReactNode
}