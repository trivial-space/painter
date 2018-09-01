import { Painter } from '../lib/painter';
import { getContext } from '../lib/utils/context';
export const canvas = document.getElementById('canvas');
export const gl = getContext(canvas);
export const painter = new Painter(gl);
//# sourceMappingURL=painter.js.map