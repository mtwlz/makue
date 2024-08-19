import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.jsx', // Your entry point
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',    // CommonJS format for Node
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',    // ES module format for bundlers
      exports: 'named',
      sourcemap: true,
    }
  ],
  plugins: [
    peerDepsExternal(),  // Exclude peer dependencies from the bundle (React, React DOM)
    resolve({
      extensions: ['.js', '.jsx'],  // Resolve .jsx files
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    postcss(),
    terser(),  // Minify the output
  ],
  external: ['react', 'react-dom'],  // Treat React and ReactDOM as peer dependencies
};