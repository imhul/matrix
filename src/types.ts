export interface Symbol { d: string; }
export interface Link { [key: number]: number; }
export type Chain = number[]
export interface MatrixUnit { chain: Chain; speed: number; y: number; }
export type Matrix = MatrixUnit[]
