import { Painter } from '../lib/painter';
import { getContext } from '../lib/utils/context';
export var canvas = document.getElementById('canvas');
export var gl = getContext(canvas);
export var painter = new Painter(gl);
//# sourceMappingURL=painter.js.map