import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'build/index.js',
  output: {
    file: 'build/index.umd.js',
    format: 'umd',
    name: 'PineClientFetch',
  },
  plugins: [
    resolve({ browser: true }),
    commonjs({ extensions: ['.js'] })
  ],
};
