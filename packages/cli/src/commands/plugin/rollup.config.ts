import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import image from 'rollup-plugin-image-files';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    image(),
    postcss(), //handles css files
    resolve({
      // resolves modules like node (looking in node_modules)
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs({
      include: ['node_modules/**', '../../node_modules/**'],
      exclude: ['**/*.stories.js'],
    }),
    typescript(),
  ],
};
