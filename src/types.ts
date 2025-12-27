import { Sprite } from 'pixi.js';

export interface Symbol {
	d: string;
}
export interface Link {
	[key: number]: number;
}
export type Chain = number[];
export interface MatrixUnit {
	chain: Chain;
	speed: number;
	y: number;
}
export type Matrix = MatrixUnit[];
export type Head = {
	sprite: Sprite;
	index: number;
	length: number;
	moveCounter: number;
	shuffleCounter: number;
	moveDelay: number;
	maxLength: number;
	alphaStep: number;
	particles: (Sprite | null)[];
};
