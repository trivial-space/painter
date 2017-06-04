declare var _default: {
    defaultSettings: {
        clearColor: number[];
        minFilter: string;
        magFilter: string;
        wrap: string;
        clearBuffers: string[];
        clearBits: number;
        enable: string[];
        blend: string[];
        width: number;
        height: number;
    };
    geometries: {
        renderQuad: {
            attribs: {
                [x: string]: {
                    buffer: Float32Array;
                    storeType: any;
                };
            };
            drawType: any;
            itemCount: number;
        };
    };
    shaders: {
        basicEffect: {
            vert: string;
            frag: string;
        };
    };
};
export default _default;
