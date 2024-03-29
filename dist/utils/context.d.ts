import { GL } from '../painter-types';
export declare function makeClear(gl: GL, ...clearArray: string[]): number;
export declare function setBlendFunc(gl: GL, blendOpts: [string, string]): void;
/**
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] optional `window.devicePixelRatio`.
 * @return {boolean} true if the canvas was resized.
 */
export declare function resizeCanvas(canvas: HTMLCanvasElement, multiplier?: number): boolean;
