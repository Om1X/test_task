import type { Apartment } from "~/types/flat";

export enum Directions {
    Asc = 'asc',
    Desc = 'desc',
}
export type Direction = Directions | null
export type SortState = { key: keyof Apartment | null; direction: Direction }