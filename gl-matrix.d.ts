// Type definitions for gl-matrix 2.3.2
// Project: http://glmatrix.net/
// Definitions by: chuntaro <https://github.com/chuntaro/>
// Definitions: https://github.com/chuntaro/gl-matrix.d.ts

declare module "gl-matrix" {

export type GLMat = Float32Array | number[];
export type GLVec = GLMat;

/**
 * @class Common utilities
 * @name glMatrix
 */
export interface glMatrix {
  EPSILON: number;
  ARRAY_TYPE: GLMat;
  RANDOM: () => number;
  ENABLE_SIMD: boolean;
  SIMD_AVAILABLE: boolean;
  USE_SIMD: boolean;

  /**
   * Sets the type of array used when creating new vectors and matrices
   *
   * @param {Type} type Array type, such as Float32Array or Array
   */
  setMatrixArrayType<T>(type: T): void;

  /**
  * Convert Degree To Radian
  *
  * @param {Number} Angle in Degrees
  */
  toRadian(a: number): number;

  /**
   * Tests whether or not the arguments have approximately the same value, within an absolute
   * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
   * than or equal to 1.0, and a relative tolerance is used for larger values)
   *
   * @param {Number} a The first number to test.
   * @param {Number} b The second number to test.
   * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
   */
  equals(a: number, b: number): boolean;
}

export var glMatrix: glMatrix;


/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
export interface vec2 {
  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */
  create(): GLVec;

  /**
   * Creates a new vec2 initialized with values from an existing vector
   *
   * @param {vec2} a vector to clone
   * @returns {vec2} a new 2D vector
   */
  clone(a: GLVec): GLVec;

  /**
   * Creates a new vec2 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} a new 2D vector
   */
  fromValues(x: number, y: number): GLVec;

  /**
   * Copy the values from one vec2 to another
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the source vector
   * @returns {vec2} out
   */
  copy(out: GLVec, a: GLVec): GLVec;

  /**
   * Set the components of a vec2 to the given values
   *
   * @param {vec2} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} out
   */
  set(out: GLVec, x: number, y: number): GLVec; // not Float32Array compatible

  /**
   * Adds two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  add(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  subtract(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  sub(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Multiplies two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  multiply(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Multiplies two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  mul(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Divides two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  divide(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Divides two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  div(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Math.ceil the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to ceil
   * @returns {vec2} out
   */
  ceil(out: GLVec, a: GLVec): GLVec;

  /**
   * Math.floor the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to floor
   * @returns {vec2} out
   */
  floor(out: GLVec, a: GLVec): GLVec;

  /**
   * Returns the minimum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  min(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Returns the maximum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  max(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Math.round the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to round
   * @returns {vec2} out
   */
  round(out: GLVec, a: GLVec): GLVec;

  /**
   * Scales a vec2 by a scalar number
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec2} out
   */
  scale(out: GLVec, a: GLVec, b: number): GLVec;

  /**
   * Adds two vec2's after scaling the second operand by a scalar value
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec2} out
   */
  scaleAndAdd(out: GLVec, a: GLVec, b: GLVec, scale: number): GLVec;

  /**
   * Calculates the euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} distance between a and b
   */
  distance(a: GLVec, b: GLVec): number;

  /**
   * Calculates the euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} distance between a and b
   */
  dist(a: GLVec, b: GLVec): number;

  /**
   * Calculates the squared euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} squared distance between a and b
   */
  squaredDistance(a: GLVec, b: GLVec): number;

  /**
   * Calculates the squared euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} squared distance between a and b
   */
  sqrDist(a: GLVec, b: GLVec): number;

  /**
   * Calculates the length of a vec2
   *
   * @param {vec2} a vector to calculate length of
   * @returns {Number} length of a
   */
  length(a: GLVec): number; // not Float32Array compatible

  /**
   * Calculates the length of a vec2
   *
   * @param {vec2} a vector to calculate length of
   * @returns {Number} length of a
   */
  len(a: GLVec): number;

  /**
   * Calculates the squared length of a vec2
   *
   * @param {vec2} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  squaredLength(a: GLVec): number;

  /**
   * Calculates the squared length of a vec2
   *
   * @param {vec2} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  sqrLen(a: GLVec): number;

  /**
   * Negates the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to negate
   * @returns {vec2} out
   */
  negate(out: GLVec, a: GLVec): GLVec;

  /**
   * Returns the inverse of the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to invert
   * @returns {vec2} out
   */
  inverse(out: GLVec, a: GLVec): GLVec;

  /**
   * Normalize a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to normalize
   * @returns {vec2} out
   */
  normalize(out: GLVec, a: GLVec): GLVec;

  /**
   * Calculates the dot product of two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} dot product of a and b
   */
  dot(a: GLVec, b: GLVec): number;

  /**
   * Computes the cross product of two vec2's
   * Note that the cross product must by definition produce a 3D vector
   *
   * @param {vec3} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec3} out
   */
  cross(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Performs a linear interpolation between two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {vec2} out
   */
  lerp(out: GLVec, a: GLVec, b: GLVec, t: number): GLVec;

  /**
   * Generates a random vector with the given scale
   *
   * @param {vec2} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec2} out
   */
  random(out: GLVec, scale: number): GLVec;

  /**
   * Transforms the vec2 with a mat2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat2} m matrix to transform with
   * @returns {vec2} out
   */
  transformMat2(out: GLVec, a: GLVec, m: GLMat): GLVec;

  /**
   * Transforms the vec2 with a mat2d
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat2d} m matrix to transform with
   * @returns {vec2} out
   */
  transformMat2d(out: GLVec, a: GLVec, m: GLMat): GLVec;

  /**
   * Transforms the vec2 with a mat3
   * 3rd vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat3} m matrix to transform with
   * @returns {vec2} out
   */
  transformMat3(out: GLVec, a: GLVec, m: GLMat): GLVec;

  /**
   * Transforms the vec2 with a mat4
   * 3rd vector component is implicitly '0'
   * 4th vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec2} out
   */
  transformMat4(out: GLVec, a: GLVec, m: GLMat): GLVec;

  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */
  forEach<T>(a: GLVec[], stride: number, offset: number, count: number, fn: (a: GLVec, b: GLVec, arg: T) => void, arg: T): GLVec[]; // not Float32Array compatible

  /**
   * Returns a string representation of a vector
   *
   * @param {vec2} GLVec vector to represent as a string
   * @returns {String} string representation of the vector
   */
  str(a: GLVec): string;

  /**
   * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
   *
   * @param {vec2} a The first vector.
   * @param {vec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  exactEquals(a: GLVec, b: GLVec): boolean;

  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {vec2} a The first vector.
   * @param {vec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  equals(a: GLVec, b: GLVec): boolean;
}
export var vec2: vec2;


/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
export interface vec3 {
  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */
  create(): GLVec;

  /**
   * Creates a new vec3 initialized with values from an existing vector
   *
   * @param {vec3} a vector to clone
   * @returns {vec3} a new 3D vector
   */
  clone(a: GLVec): GLVec;

  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */
  fromValues(x: number, y: number, z: number): GLVec;

  /**
   * Copy the values from one vec3 to another
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the source vector
   * @returns {vec3} out
   */
  copy(out: GLVec, a: GLVec): GLVec;

  /**
   * Set the components of a vec3 to the given values
   *
   * @param {vec3} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} out
   */
  // set(out: GLVec, x: number, y: number, z: number): GLVec; // not Float32Array compatible

  /**
   * Adds two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  add(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  subtract(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  sub(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Multiplies two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  multiply(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Multiplies two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  mul(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Divides two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  divide(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Divides two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  div(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Math.ceil the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to ceil
   * @returns {vec3} out
   */
  ceil(out: GLVec, a: GLVec): GLVec;

  /**
   * Math.floor the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to floor
   * @returns {vec3} out
   */
  floor(out: GLVec, a: GLVec): GLVec;

  /**
   * Returns the minimum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  min(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Returns the maximum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  max(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Math.round the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to round
   * @returns {vec3} out
   */
  round(out: GLVec, a: GLVec): GLVec;

  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */
  scale(out: GLVec, a: GLVec, b: number): GLVec;

  /**
   * Adds two vec3's after scaling the second operand by a scalar value
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec3} out
   */
  scaleAndAdd(out: GLVec, a: GLVec, b: GLVec, scale: number): GLVec;

  /**
   * Calculates the euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} distance between a and b
   */
  distance(a: GLVec, b: GLVec): number;

  /**
   * Calculates the euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} distance between a and b
   */
  dist(a: GLVec, b: GLVec): number;

  /**
   * Calculates the squared euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} squared distance between a and b
   */
  squaredDistance(a: GLVec, b: GLVec): number;

  /**
   * Calculates the squared euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} squared distance between a and b
   */
  sqrDist(a: GLVec, b: GLVec): number;

  /**
   * Calculates the length of a vec3
   *
   * @param {vec3} a vector to calculate length of
   * @returns {Number} length of a
   */
  // length(a: GLVec): number; // not Float32Array compatible

  /**
   * Calculates the length of a vec3
   *
   * @param {vec3} a vector to calculate length of
   * @returns {Number} length of a
   */
  len(a: GLVec): number;

  /**
   * Calculates the squared length of a vec3
   *
   * @param {vec3} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  squaredLength(a: GLVec): number;

  /**
   * Calculates the squared length of a vec3
   *
   * @param {vec3} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  sqrLen(a: GLVec): number;

  /**
   * Negates the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to negate
   * @returns {vec3} out
   */
  negate(out: GLVec, a: GLVec): GLVec;

  /**
   * Returns the inverse of the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to invert
   * @returns {vec3} out
   */
  inverse(out: GLVec, a: GLVec): GLVec;

  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to normalize
   * @returns {vec3} out
   */
  normalize(out: GLVec, a: GLVec): GLVec;

  /**
   * Calculates the dot product of two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} dot product of a and b
   */
  dot(a: GLVec, b: GLVec): number;

  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  cross(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Performs a linear interpolation between two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {vec3} out
   */
  lerp(out: GLVec, a: GLVec, b: GLVec, t: number): GLVec;

  /**
   * Performs a hermite interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {vec3} c the third operand
   * @param {vec3} d the fourth operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {vec3} out
   */
  hermite(out: GLVec, a: GLVec, b: GLVec, c: GLVec, d: GLVec, t: number): GLVec;

  /**
   * Performs a bezier interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {vec3} c the third operand
   * @param {vec3} d the fourth operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {vec3} out
   */
  bezier(out: GLVec, a: GLVec, b: GLVec, c: GLVec, d: GLVec, t: number): GLVec;

  /**
   * Generates a random vector with the given scale
   *
   * @param {vec3} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec3} out
   */
  random(out: GLVec, scale: number): GLVec;

  /**
   * Transforms the vec3 with a mat4.
   * 4th vector component is implicitly '1'
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec3} out
   */
  transformMat4(out: GLVec, a: GLVec, m: GLMat): GLVec;

  /**
   * Transforms the vec3 with a mat3.
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {mat4} m the 3x3 matrix to transform with
   * @returns {vec3} out
   */
  transformMat3(out: GLVec, a: GLVec, m: GLMat): GLVec;

  /**
   * Transforms the vec3 with a quat
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec3} out
   */
  transformQuat(out: GLVec, a: GLVec, q: quat): GLVec;

  /**
   * Rotate a 3D vector around the x-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */
  rotateX(out: GLVec, a: GLVec, b: GLVec, c: number): GLVec;

  /**
   * Rotate a 3D vector around the y-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */
  rotateY(out: GLVec, a: GLVec, b: GLVec, c: number): GLVec;

  /**
   * Rotate a 3D vector around the z-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */
  rotateZ(out: GLVec, a: GLVec, b: GLVec, c: number): GLVec;

  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */
  // forEach<T>(a: GLVec[], stride: number, offset: number, count: number, fn: (a: GLVec, b: GLVec, arg: T) => void, arg: T): GLVec[]; // not Float32Array compatible

  /**
   * Get the angle between two 3D vectors
   * @param {vec3} a The first operand
   * @param {vec3} b The second operand
   * @returns {Number} The angle in radians
   */
  angle(a: GLVec, b: GLVec): number;

  /**
   * Returns a string representation of a vector
   *
   * @param {vec3} GLVec vector to represent as a string
   * @returns {String} string representation of the vector
   */
  str(a: GLVec): string;

  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {vec3} a The first vector.
   * @param {vec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  exactEquals(a: GLVec, b: GLVec): boolean;

  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {vec3} a The first vector.
   * @param {vec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  equals(a: GLVec, b: GLVec): boolean;
}
export var vec3: vec3;


/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
export interface vec4 {
  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */
  create(): GLVec;

  /**
   * Creates a new vec4 initialized with values from an existing vector
   *
   * @param {vec4} a vector to clone
   * @returns {vec4} a new 4D vector
   */
  clone(a: GLVec): GLVec;

  /**
   * Creates a new vec4 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} a new 4D vector
   */
  fromValues(x: number, y: number, z: number, w: number): GLVec;

  /**
   * Copy the values from one vec4 to another
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the source vector
   * @returns {vec4} out
   */
  copy(out: GLVec, a: GLVec): GLVec;

  /**
   * Set the components of a vec4 to the given values
   *
   * @param {vec4} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} out
   */
  // set(out: GLVec, x: number, y: number, z: number, w: number): GLVec; // not Float32Array compatible

  /**
   * Adds two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  add(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  subtract(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  sub(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Multiplies two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  multiply(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Multiplies two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  mul(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Divides two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  divide(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Divides two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  div(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Math.ceil the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to ceil
   * @returns {vec4} out
   */
  ceil(out: GLVec, a: GLVec): GLVec;

  /**
   * Math.floor the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to floor
   * @returns {vec4} out
   */
  floor(out: GLVec, a: GLVec): GLVec;

  /**
   * Returns the minimum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  min(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Returns the maximum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  max(out: GLVec, a: GLVec, b: GLVec): GLVec;

  /**
   * Math.round the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to round
   * @returns {vec4} out
   */
  round(out: GLVec, a: GLVec): GLVec;

  /**
   * Scales a vec4 by a scalar number
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec4} out
   */
  scale(out: GLVec, a: GLVec, b: number): GLVec;

  /**
   * Adds two vec4's after scaling the second operand by a scalar value
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec4} out
   */
  scaleAndAdd(out: GLVec, a: GLVec, b: GLVec, scale: number): GLVec;

  /**
   * Calculates the euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} distance between a and b
   */
  distance(a: GLVec, b: GLVec): number;

  /**
   * Calculates the euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} distance between a and b
   */
  dist(a: GLVec, b: GLVec): number;

  /**
   * Calculates the squared euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} squared distance between a and b
   */
  squaredDistance(a: GLVec, b: GLVec): number;

  /**
   * Calculates the squared euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} squared distance between a and b
   */
  sqrDist(a: GLVec, b: GLVec): number;

  /**
   * Calculates the length of a vec4
   *
   * @param {vec4} a vector to calculate length of
   * @returns {Number} length of a
   */
  // length(a: GLVec): number; // not Float32Array compatible

  /**
   * Calculates the length of a vec4
   *
   * @param {vec4} a vector to calculate length of
   * @returns {Number} length of a
   */
  len(a: GLVec): number;

  /**
   * Calculates the squared length of a vec4
   *
   * @param {vec4} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  squaredLength(a: GLVec): number;

  /**
   * Calculates the squared length of a vec4
   *
   * @param {vec4} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  sqrLen(a: GLVec): number;

  /**
   * Negates the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to negate
   * @returns {vec4} out
   */
  negate(out: GLVec, a: GLVec): GLVec;

  /**
   * Returns the inverse of the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to invert
   * @returns {vec4} out
   */
  inverse(out: GLVec, a: GLVec): GLVec;

  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to normalize
   * @returns {vec4} out
   */
  normalize(out: GLVec, a: GLVec): GLVec;

  /**
   * Calculates the dot product of two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} dot product of a and b
   */
  dot(a: GLVec, b: GLVec): number;

  /**
   * Performs a linear interpolation between two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {vec4} out
   */
  lerp(out: GLVec, a: GLVec, b: GLVec, t: number): GLVec;

  /**
   * Generates a random vector with the given scale
   *
   * @param {vec4} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec4} out
   */
  random(out: GLVec, scale: number): GLVec;

  /**
   * Transforms the vec4 with a mat4.
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec4} out
   */
  transformMat4(out: GLVec, a: GLVec, m: GLMat): GLVec;

  /**
   * Transforms the vec4 with a quat
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec4} out
   */
  transformQuat(out: GLVec, a: GLVec, q: quat): GLVec;

  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */
  // forEach<T>(a: GLVec[], stride: number, offset: number, count: number, fn: (a: GLVec, b: GLVec, arg: T) => void, arg: T): GLVec[]; // not Float32Array compatible

  /**
   * Returns a string representation of a vector
   *
   * @param {vec4} GLVec vector to represent as a string
   * @returns {String} string representation of the vector
   */
  str(a: GLVec): string;

  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {vec4} a The first vector.
   * @param {vec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  exactEquals(a: GLVec, b: GLVec): boolean;

  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {vec4} a The first vector.
   * @param {vec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  equals(a: GLVec, b: GLVec): boolean;
}
export var vec4: vec4;


/**
 * @class 2x2 Matrix
 * @name mat2
 */
export interface mat2 {
  /**
   * Creates a new identity mat2
   *
   * @returns {mat2} a new 2x2 matrix
   */
  create(): GLMat;

  /**
   * Creates a new mat2 initialized with values from an existing matrix
   *
   * @param {mat2} a matrix to clone
   * @returns {mat2} a new 2x2 matrix
   */
  clone(a: GLMat): GLMat;

  /**
   * Copy the values from one mat2 to another
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */
  copy(out: GLMat, a: GLMat): GLMat;

  /**
   * Set a mat2 to the identity matrix
   *
   * @param {mat2} out the receiving matrix
   * @returns {mat2} out
   */
  identity(out: GLMat): GLMat;

  /**
   * Create a new mat2 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out A new 2x2 matrix
   */
  fromValues(m00: number, m01: number, m10: number, m11: number): GLMat;

  /**
   * Set the components of a mat2 to the given values
   *
   * @param {mat2} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out
   */
  // set(out: GLMat, m00: number, m01: number, m10: number, m11: number): GLMat; // not Float32Array compatible

  /**
   * Transpose the values of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */
  transpose(out: GLMat, a: GLMat): GLMat;

  /**
   * Inverts a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */
  invert(out: GLMat, a: GLMat): GLMat;

  /**
   * Calculates the adjugate of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */
  adjoint(out: GLMat, a: GLMat): GLMat;

  /**
   * Calculates the determinant of a mat2
   *
   * @param {mat2} a the source matrix
   * @returns {Number} determinant of a
   */
  determinant(a: GLMat): number;

  /**
   * Multiplies two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */
  multiply(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Multiplies two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */
  mul(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Rotates a mat2 by the given angle
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */
  rotate(out: GLMat, a: GLMat, rad: number): GLMat;

  /**
   * Scales the mat2 by the dimensions in the given vec2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the matrix to rotate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat2} out
   **/
  scale(out: GLMat, a: GLMat, v: GLVec): GLMat;

  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.rotate(dest, dest, rad);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */
  fromRotation(out: GLMat, rad: number): GLMat;

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.scale(dest, dest, GLVec);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {vec2} v Scaling vector
   * @returns {mat2} out
   */
  fromScaling(out: GLMat, v: GLVec): GLMat;

  /**
   * Returns a string representation of a mat2
   *
   * @param {mat2} GLMat matrix to represent as a string
   * @returns {String} string representation of the matrix
   */
  str(a: GLMat): string;

  /**
   * Returns Frobenius norm of a mat2
   *
   * @param {mat2} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */
  frob(a: GLMat): number;

  /**
   * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
   * @param {mat2} L the lower triangular matrix
   * @param {mat2} D the diagonal matrix
   * @param {mat2} U the upper triangular matrix
   * @param {mat2} a the input matrix to factorize
   */
  LDU(L: GLMat, D: GLMat, U: GLMat, a: GLMat): GLMat[];

  /**
   * Adds two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */
  add(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */
  subtract(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */
  sub(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat2} a The first matrix.
   * @param {mat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  exactEquals(a: GLMat, b: GLMat): boolean;

  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat2} a The first matrix.
   * @param {mat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  equals(a: GLMat, b: GLMat): boolean;

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2} out
   */
  multiplyScalar(out: GLMat, a: GLMat, b: number): GLMat;

  /**
   * Adds two mat2's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2} out the receiving vector
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2} out
   */
  multiplyScalarAndAdd(out: GLMat, a: GLMat, b: GLMat, scale: number): GLMat;
}
export var mat2: mat2;


/**
 * @class 2x3 Matrix
 * @name mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */
export interface mat2d {
  /**
   * Creates a new identity mat2d
   *
   * @returns {mat2d} a new 2x3 matrix
   */
  create(): GLMat;

  /**
   * Creates a new mat2d initialized with values from an existing matrix
   *
   * @param {mat2d} a matrix to clone
   * @returns {mat2d} a new 2x3 matrix
   */
  clone(a: GLMat): GLMat;

  /**
   * Copy the values from one mat2d to another
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the source matrix
   * @returns {mat2d} out
   */
  copy(out: GLMat, a: GLMat): GLMat;

  /**
   * Set a mat2d to the identity matrix
   *
   * @param {mat2d} out the receiving matrix
   * @returns {mat2d} out
   */
  identity(out: GLMat): GLMat;

  /**
   * Create a new mat2d with the given values
   *
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} A new mat2d
   */
  fromValues(a: number, b: number, c: number, d: number, tx: number, ty: number): GLMat;

  /**
   * Set the components of a mat2d to the given values
   *
   * @param {mat2d} out the receiving matrix
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} out
   */
  // set(out: GLMat, a: number, b: number, c: number, d: number, tx: number, ty: number): GLMat; // not Float32Array compatible

  /**
   * Inverts a mat2d
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the source matrix
   * @returns {mat2d} out
   */
  invert(out: GLMat, a: GLMat): GLMat;

  /**
   * Calculates the determinant of a mat2d
   *
   * @param {mat2d} a the source matrix
   * @returns {Number} determinant of a
   */
  determinant(a: GLMat): number;

  /**
   * Multiplies two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */
  multiply(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Multiplies two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */
  mul(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Rotates a mat2d by the given angle
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */
  rotate(out: GLMat, a: GLMat, rad: number): GLMat;

  /**
   * Scales the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to translate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat2d} out
   **/
  scale(out: GLMat, a: GLMat, v: GLVec): GLMat;

  /**
   * Translates the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to translate
   * @param {vec2} v the vec2 to translate the matrix by
   * @returns {mat2d} out
   **/
  translate(out: GLMat, a: GLMat, v: GLVec): GLMat;

  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.rotate(dest, dest, rad);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */
  fromRotation(out: GLMat, rad: number): GLMat;

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.scale(dest, dest, GLVec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {vec2} v Scaling vector
   * @returns {mat2d} out
   */
  fromScaling(out: GLMat, v: GLVec): GLMat;

  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.translate(dest, dest, GLVec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {vec2} v Translation vector
   * @returns {mat2d} out
   */
  fromTranslation(out: GLMat, v: GLVec): GLMat;

  /**
   * Returns a string representation of a mat2d
   *
   * @param {mat2d} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */
  str(a: GLMat): string;

  /**
   * Returns Frobenius norm of a mat2d
   *
   * @param {mat2d} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */
  frob(a: GLMat): number;

  /**
   * Adds two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */
  add(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */
  subtract(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */
  sub(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2d} out
   */
  multiplyScalar(out: GLMat, a: GLMat, b: number): GLMat;

  /**
   * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2d} out the receiving vector
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2d} out
   */
  multiplyScalarAndAdd(out: GLMat, a: GLMat, b: GLMat, scale: number): GLMat;

  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat2d} a The first matrix.
   * @param {mat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  exactEquals(a: GLMat, b: GLMat): boolean;

  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat2d} a The first matrix.
   * @param {mat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  equals(a: GLMat, b: GLMat): boolean;
}
export var mat2d: mat2d;


/**
 * @class 3x3 Matrix
 * @name mat3
 */
export interface mat3 {
  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */
  create(): GLMat;

  /**
   * Copies the upper-left 3x3 values into the given mat3.
   *
   * @param {mat3} out the receiving 3x3 matrix
   * @param {mat4} a   the source 4x4 matrix
   * @returns {mat3} out
   */
  fromMat4(out: GLMat, a: GLMat): GLMat;

  /**
   * Creates a new mat3 initialized with values from an existing matrix
   *
   * @param {mat3} a matrix to clone
   * @returns {mat3} a new 3x3 matrix
   */
  clone(a: GLMat): GLMat;

  /**
   * Copy the values from one mat3 to another
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  copy(out: GLMat, a: GLMat): GLMat;

  /**
   * Create a new mat3 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} A new mat3
   */
  fromValues(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): GLMat;

  /**
   * Set the components of a mat3 to the given values
   *
   * @param {mat3} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} out
   */
  // set(out: GLMat, m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): GLMat; // not Float32Array compatible

  /**
   * Set a mat3 to the identity matrix
   *
   * @param {mat3} out the receiving matrix
   * @returns {mat3} out
   */
  identity(out: GLMat): GLMat;

  /**
   * Transpose the values of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  transpose(out: GLMat, a: GLMat): GLMat;

  /**
   * Inverts a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  invert(out: GLMat, a: GLMat): GLMat;

  /**
   * Calculates the adjugate of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */
  adjoint(out: GLMat, a: GLMat): GLMat;

  /**
   * Calculates the determinant of a mat3
   *
   * @param {mat3} a the source matrix
   * @returns {Number} determinant of a
   */
  determinant(a: GLMat): number;

  /**
   * Multiplies two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */
  multiply(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Multiplies two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */
  mul(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Translate a mat3 by the given vector
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to translate
   * @param {vec2} v vector to translate by
   * @returns {mat3} out
   */
  translate(out: GLMat, a: GLMat, v: GLVec): GLMat;

  /**
   * Rotates a mat3 by the given angle
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */
  rotate(out: GLMat, a: GLMat, rad: number): GLMat;

  /**
   * Scales the mat3 by the dimensions in the given vec2
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to rotate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat3} out
   **/
  scale(out: GLMat, a: GLMat, v: GLVec): GLMat;

  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.translate(dest, dest, GLVec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {vec2} v Translation vector
   * @returns {mat3} out
   */
  fromTranslation(out: GLMat, v: GLVec): GLMat;

  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.rotate(dest, dest, rad);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */
  fromRotation(out: GLMat, rad: number): GLMat;

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.scale(dest, dest, GLVec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {vec2} v Scaling vector
   * @returns {mat3} out
   */
  fromScaling(out: GLMat, v: GLVec): GLMat;

  /**
   * Copies the values from a mat2d into a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat2d} a the matrix to copy
   * @returns {mat3} out
   **/
  fromMat2d(out: GLMat, a: GLMat): GLMat;

  /**
  * Calculates a 3x3 matrix from the given quaternion
  *
  * @param {mat3} out mat3 receiving operation result
  * @param {quat} q Quaternion to create matrix from
  *
  * @returns {mat3} out
  */
  fromQuat(out: GLMat, q: quat): GLMat;

  /**
  * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
  *
  * @param {mat3} out mat3 receiving operation result
  * @param {mat4} a Mat4 to derive the normal matrix from
  *
  * @returns {mat3} out
  */
  normalFromMat4(out: GLMat, a: GLMat): GLMat;

  /**
   * Returns a string representation of a mat3
   *
   * @param {mat3} GLMat matrix to represent as a string
   * @returns {String} string representation of the matrix
   */
  str(a: GLMat): string;

  /**
   * Returns Frobenius norm of a mat3
   *
   * @param {mat3} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */
  frob(a: GLMat): number;

  /**
   * Adds two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */
  add(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */
  subtract(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */
  sub(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat3} out
   */
  multiplyScalar(out: GLMat, a: GLMat, b: number): GLMat;

  /**
   * Adds two mat3's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat3} out the receiving vector
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat3} out
   */
  multiplyScalarAndAdd(out: GLMat, a: GLMat, b: GLMat, scale: number): GLMat;

  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat3} a The first matrix.
   * @param {mat3} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  equals(a: GLMat, b: GLMat): boolean;
}
export var mat3: mat3;


/**
 * @class 4x4 Matrix
 * @name mat4
 */
export interface mat4 {
  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */
  create(): GLMat;

  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {mat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */
  clone(a: GLMat): GLMat;

  /**
   * Copy the values from one mat4 to another
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  copy(out: GLMat, a: GLMat): GLMat;

  /**
   * Create a new mat4 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} A new mat4
   */
  fromValues(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): GLMat;

  /**
   * Set the components of a mat4 to the given values
   *
   * @param {mat4} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} out
   */
  // set(out: GLMat, m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): GLMat; // not Float32Array compatible

  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */
  identity(out: GLMat): GLMat;

  /**
   * Transpose the values of a mat4 using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  transpose(out: GLMat, a: GLMat): GLMat;

  /**
   * Inverts a mat4 using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  invert(out: GLMat, a: GLMat): GLMat;

  /**
   * Calculates the adjugate of a mat4 using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */
  adjoint(out: GLMat, a: GLMat): GLMat;

  /**
   * Calculates the determinant of a mat4
   *
   * @param {mat4} a the source matrix
   * @returns {Number} determinant of a
   */
  determinant(a: GLMat): number;

  /**
   * Multiplies two mat4's explicitly not using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
  multiply(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Multiplies two mat4's explicitly not using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
  mul(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Translates a mat4 by the given vector using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to translate
   * @param {vec3} v vector to translate by
   * @returns {mat4} out
   */
  translate(out: GLMat, a: GLMat, v: GLVec): GLMat;

  /**
   * Scales the mat4 by the dimensions in the given vec3 using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to scale
   * @param {vec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/
  scale(out: GLMat, a: GLMat, v: GLVec): GLMat;

  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  rotate(out: GLMat, a: GLMat, rad: number, axis: GLVec): GLMat;

  /**
   * Rotates a matrix by the given angle around the X axis using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  rotateX(out: GLMat, a: GLMat, rad: number): GLMat;

  /**
   * Rotates a matrix by the given angle around the Y axis using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  rotateY(out: GLMat, a: GLMat, rad: number): GLMat;

  /**
   * Rotates a matrix by the given angle around the Z axis using SIMD
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  rotateZ(out: GLMat, a: GLMat, rad: number): GLMat;

  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, dest, GLVec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {vec3} v Translation vector
   * @returns {mat4} out
   */
  fromTranslation(out: GLMat, v: GLVec): GLMat;

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.scale(dest, dest, GLVec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {vec3} v Scaling vector
   * @returns {mat4} out
   */
  fromScaling(out: GLMat, v: GLVec): GLMat;

  /**
   * Creates a matrix from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  fromRotation(out: GLMat, rad: number, axis: GLVec): GLMat;

  /**
   * Creates a matrix from the given angle around the X axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateX(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  fromXRotation(out: GLMat, rad: number): GLMat;

  /**
   * Creates a matrix from the given angle around the Y axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  fromYRotation(out: GLMat, rad: number): GLMat;

  /**
   * Creates a matrix from the given angle around the Z axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateZ(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  fromZRotation(out: GLMat, rad: number): GLMat;

  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, GLVec);
   *     var quatGLMat = mat4.create();
   *     quat4.toMat4(quat, quatGLMat);
   *     mat4.multiply(dest, quatGLMat);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @returns {mat4} out
   */
  fromRotationTranslation(out: GLMat, q: quat, v: GLVec): GLMat;

  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive translation component
   * @param  {mat4} GLMat Matrix to be decomposed (input)
   * @return {vec3} out
   */
  getTranslation(out: GLVec, GLMat: GLMat): GLVec;

  /**
   * Returns a quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned quaternion will be the
   *  same as the quaternion originally supplied.
   * @param {quat} out Quaternion to receive the rotation component
   * @param {mat4} GLMat Matrix to be decomposed (input)
   * @return {quat} out
   */
  getRotation(out: quat, GLMat: GLMat): quat;

  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, GLVec);
   *     var quatGLMat = mat4.create();
   *     quat4.toMat4(quat, quatGLMat);
   *     mat4.multiply(dest, quatGLMat);
   *     mat4.scale(dest, scale)
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @param {vec3} s Scaling vector
   * @returns {mat4} out
   */
  fromRotationTranslationScale(out: GLMat, q: quat, v: GLVec, s: GLVec): GLMat;

  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, GLVec);
   *     mat4.translate(dest, origin);
   *     var quatGLMat = mat4.create();
   *     quat4.toMat4(quat, quatGLMat);
   *     mat4.multiply(dest, quatGLMat);
   *     mat4.scale(dest, scale)
   *     mat4.translate(dest, negativeOrigin);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @param {vec3} s Scaling vector
   * @param {vec3} o The origin vector around which to scale and rotate
   * @returns {mat4} out
   */
  fromRotationTranslationScaleOrigin(out: GLMat, q: quat, v: GLVec, s: GLVec, o: GLVec): GLMat;

  /**
   * Calculates a 4x4 matrix from the given quaternion
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat} q Quaternion to create matrix from
   *
   * @returns {mat4} out
   */
  fromQuat(out: GLMat, q: quat): GLMat;

  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Number} left Left bound of the frustum
   * @param {Number} right Right bound of the frustum
   * @param {Number} bottom Bottom bound of the frustum
   * @param {Number} top Top bound of the frustum
   * @param {Number} near Near bound of the frustum
   * @param {Number} far Far bound of the frustum
   * @returns {mat4} out
   */
  frustum(out: GLMat, left: number, right: number, bottom: number, top: number, near: number, far: number): GLMat;

  /**
   * Generates a perspective projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  perspective(out: GLMat, fovy: number, aspect: number, near: number, far: number): GLMat;

  /**
   * Generates a perspective projection matrix with the given field of view.
   * This is primarily useful for generating projection matrices to be used
   * with the still experiemental WebVR API.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  perspectiveFromFieldOfView(out: GLMat, fov: {upDegrees: number, downDegrees: number, leftDegrees: number, rightDegrees: number}, near: number, far: number): GLMat;

  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  ortho(out: GLMat, left: number, right: number, bottom: number, top: number, near: number, far: number): GLMat;

  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing up
   * @returns {mat4} out
   */
  lookAt(out: GLMat, eye: GLVec, center: GLVec, up: GLVec): GLMat;

  /**
   * Returns a string representation of a mat4
   *
   * @param {mat4} GLMat matrix to represent as a string
   * @returns {String} string representation of the matrix
   */
  str(a: GLMat): string;

  /**
   * Returns Frobenius norm of a mat4
   *
   * @param {mat4} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */
  frob(a: GLMat): number;

  /**
   * Adds two mat4's
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
  add(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
  subtract(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
  sub(out: GLMat, a: GLMat, b: GLMat): GLMat;

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat4} out
   */
  multiplyScalar(out: GLMat, a: GLMat, b: number): GLMat;

  /**
   * Adds two mat4's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat4} out the receiving vector
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat4} out
   */
  multiplyScalarAndAdd(out: GLMat, a: GLMat, b: GLMat, scale: number): GLMat;

  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat4} a The first matrix.
   * @param {mat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  exactEquals(a: GLMat, b: GLMat): boolean;

  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat4} a The first matrix.
   * @param {mat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */
  equals(a: GLMat, b: GLMat): boolean;
}
export var mat4: mat4;


/**
 * @class Quaternion
 * @name quat
 */
export interface quat {
  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */
  create(): quat;

  /**
   * Sets a quaternion to represent the shortest rotation from one
   * vector to another.
   *
   * Both vectors are assumed to be unit length.
   *
   * @param {quat} out the receiving quaternion.
   * @param {vec3} a the initial vector
   * @param {vec3} b the destination vector
   * @returns {quat} out
   */
  rotationTo(out: quat, a: GLVec, b: GLVec): quat;

  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {vec3} view  the vector representing the viewing direction
   * @param {vec3} right the vector representing the local "right" direction
   * @param {vec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */
  setAxes(out: GLVec, view: GLVec, right: GLVec, up: quat): quat;

  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {quat} a quaternion to clone
   * @returns {quat} a new quaternion
   * @function
   */
  clone(a: quat): quat;

  /**
   * Creates a new quat initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} a new quaternion
   * @function
   */
  fromValues(x: number, y: number, z: number, w: number): quat;

  /**
   * Copy the values from one quat to another
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the source quaternion
   * @returns {quat} out
   * @function
   */
  copy(out: quat, a: quat): quat;

  /**
   * Set the components of a quat to the given values
   *
   * @param {quat} out the receiving quaternion
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} out
   * @function
   */
  // set(out: quat, x: number, y: number, z: number, w: number): quat; // not Float32Array compatible

  /**
   * Set a quat to the identity quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */
  identity(out: quat): quat;

  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {vec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/
  setAxisAngle(out: quat, axis: GLVec, rad: number): quat;

  /**
   * Gets the rotation axis and angle for a given
   *  quaternion. If a quaternion is created with
   *  setAxisAngle, this method will return the same
   *  values as providied in the original parameter list
   *  OR functionally equivalent values.
   * Example: The quaternion formed by axis [0, 0, 1] and
   *  angle -90 is the same as the quaternion formed by
   *  [0, 0, 1] and 270. This method favors the latter.
   * @param  {vec3} out_axis  Vector receiving the axis of rotation
   * @param  {quat} q     Quaternion to be decomposed
   * @return {Number}     Angle, in radians, of the rotation
   */
  getAxisAngle(out_axis: GLVec, q: quat): number;

  /**
   * Adds two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   * @function
   */
  add(out: quat, a: quat, b: quat): quat;

  /**
   * Multiplies two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   */
  multiply(out: quat, a: quat, b: quat): quat;

  /**
   * Multiplies two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   */
  mul(out: quat, a: quat, b: quat): quat;

  /**
   * Scales a quat by a scalar number
   *
   * @param {quat} out the receiving vector
   * @param {quat} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {quat} out
   * @function
   */
  scale(out: quat, a: quat, b: number): quat;

  /**
   * Rotates a quaternion by the given angle about the X axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
  rotateX(out: quat, a: quat, rad: number): quat;

  /**
   * Rotates a quaternion by the given angle about the Y axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
  rotateY(out: quat, a: quat, rad: number): quat;

  /**
   * Rotates a quaternion by the given angle about the Z axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
  rotateZ(out: quat, a: quat, rad: number): quat;

  /**
   * Calculates the W component of a quat from the X, Y, and Z components.
   * Assumes that quaternion is 1 unit in length.
   * Any existing W component will be ignored.
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate W component of
   * @returns {quat} out
   */
  calculateW(out: quat, a: quat): quat;

  /**
   * Calculates the dot product of two quat's
   *
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */
  dot(a: quat, b: quat): number;

  /**
   * Performs a linear interpolation between two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {quat} out
   * @function
   */
  lerp(out: quat, a: quat, b: quat, t: number): quat;

  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {quat} out
   */
  slerp(out: quat, a: quat, b: quat, t: number): quat;

  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {quat} c the third operand
   * @param {quat} d the fourth operand
   * @param {Number} t interpolation amount
   * @returns {quat} out
   */
  sqlerp(out: quat, a: quat, b: quat, c: quat, d: quat, t: number): quat;

  /**
   * Calculates the inverse of a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate inverse of
   * @returns {quat} out
   */
  invert(out: quat, a: quat): quat;

  /**
   * Calculates the conjugate of a quat
   * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate conjugate of
   * @returns {quat} out
   */
  conjugate(out: quat, a: quat): quat;

  /**
   * Calculates the length of a quat
   *
   * @param {quat} a vector to calculate length of
   * @returns {Number} length of a
   * @function
   */
  // length(a: quat): number; // not Float32Array compatible

  /**
   * Calculates the length of a quat
   *
   * @param {quat} a vector to calculate length of
   * @returns {Number} length of a
   * @function
   */
  len(a: quat): number;

  /**
   * Calculates the squared length of a quat
   *
   * @param {quat} a vector to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */
  squaredLength(a: quat): number;

  /**
   * Calculates the squared length of a quat
   *
   * @param {quat} a vector to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */
  sqrLen(a: quat): number;

  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */
  normalize(out: quat, a: quat): quat;

  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {mat3} m rotation matrix
   * @returns {quat} out
   * @function
   */
  fromMat3(out: quat, m: GLMat): quat;

  /**
   * Returns a string representation of a quatenion
   *
   * @param {quat} GLVec vector to represent as a string
   * @returns {String} string representation of the vector
   */
  str(a: quat): string;

  /**
   * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {quat} a The first quaternion.
   * @param {quat} b The second quaternion.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  exactEquals(a: quat, b: quat): boolean;

  /**
   * Returns whether or not the quaternions have approximately the same elements in the same position.
   *
   * @param {quat} a The first vector.
   * @param {quat} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */
  equals(a: quat, b: quat): boolean;
}
export var quat: quat;

}
