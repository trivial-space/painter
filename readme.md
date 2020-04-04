# trivial space painter

A library that enables to declaratively define and change WebGL scenes.
Optimized for live coding and post processing.

Developed and build for usage with TypeScript.

_This library is currently alpha state, in heavy development and APIs are
changing frequently!_

To get some impressions, have a look at the examples. You can run them locally
by cloning this repository, and executing

    yarn install
    yarn examples

within the repository. The development server with the examples runs on
`localhost:8081`.

The API is defined in
[lib/painter-types.ts](https://github.com/trivial-space/painter/blob/master/lib/painter-types.ts).

Painter is used primarily in the
[trivial space playground](https://github.com/trivial-space/playground) to
experiment with live coding graphics inside browsers. Check it out for further
examples.

## TODO

- [ ] customize render target textures, with accessible depth texture
- [ ] enable sampled render targets
- [ ] add data texture support, with custom texture formats
- [ ] migrate to vertex array objects

## License

MIT, see the LICENSE file in the repository.

Copyright (c) 2016 - 2017 Thomas Gorny
