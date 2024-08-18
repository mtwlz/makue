import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.jsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(
        {
            extensions: ['.js', '.jsx'],
        }
    ),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // Don't transpile node_modules
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'], // Ensure both presets are used
    }),
    postcss({
      minimize: true,
    }),
    terser(),
  ],
  external: ['react', 'react-dom'], // Keep React as a peer dependency
};
