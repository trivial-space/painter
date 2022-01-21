# trivial space painter

A Typescript WebGL and WebGL2 rendering library, that enables to declaratively
define and change scenes. Rendering is organised as a graph of Layers, for easy
compositing and render-to-texture effects. There is no scenegraph here.
Optimized for live coding and post processing.

_This library is currently alpha state, in heavy development and APIs are
changing frequently!_

To get some impressions, have a look at the examples. You can run them locally
by cloning this repository, and executing

    npm install
    npm run examples

within the repository. The development server with the examples runs on
`localhost:8081`.

The API interfaces are defined in
[src/painter-types.ts](https://github.com/trivial-space/painter/blob/master/src/painter-types.ts).

Painter is used primarily in the
[trivial space playground](https://github.com/trivial-space/playground) to
experiment with live coding graphics inside browsers. Check it out for further
examples.

## TODO

- [x] enable sampled render targets (WebGL2 only)
- [x] add data texture support, with custom texture formats
- [ ] customize render target textures, with accessible depth texture
- [ ] add interleaved form buffer support

## License

MIT, see the LICENSE file in the repository.

Copyright (c) 2016 - 2021 Thomas Gorny
