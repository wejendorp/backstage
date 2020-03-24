/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import { Command } from 'commander';
// import fs from 'fs-extra';
// import recursive from 'recursive-readdir';
// import path from 'path';
// import { run } from '../../helpers/run';

import rollup, { OutputOptions } from 'rollup';
import rollupConfig from './rollup.config';

const inputOptions = {
  input: rollupConfig.input,
  plugins: rollupConfig.plugins,
};

const outputOptions = rollupConfig.output[0];

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  console.log(bundle.watchFiles); // an array of file names this bundle depends on

  // generate code
  const { output } = await bundle.generate(outputOptions as OutputOptions);

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      // For assets, this contains
      // {
      //   fileName: string,              // the asset file name
      //   source: string | UInt8Array    // the asset source
      //   type: 'asset'                  // signifies that this is an asset
      // }
      console.log('Asset', chunkOrAsset);
    } else {
      // For chunks, this contains
      // {
      //   code: string,                  // the generated JS code
      //   dynamicImports: string[],      // external modules imported dynamically by the chunk
      //   exports: string[],             // exported variable names
      //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
      //   fileName: string,              // the chunk file name
      //   imports: string[],             // external modules imported statically by the chunk
      //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
      //   isEntry: boolean,              // is this chunk a static entry point
      //   map: string | null,            // sourcemaps if present
      //   modules: {                     // information about the modules in this chunk
      //     [id: string]: {
      //       renderedExports: string[]; // exported variable names that were included
      //       removedExports: string[];  // exported variable names that were removed
      //       renderedLength: number;    // the length of the remaining code in this module
      //       originalLength: number;    // the original length of the code in this module
      //     };
      //   },
      //   name: string                   // the name of this chunk as used in naming patterns
      //   type: 'chunk',                 // signifies that this is a chunk
      // }
      console.log('Chunk', chunkOrAsset.modules);
    }
  }

  // or write the bundle to disk
  await bundle.write(outputOptions as OutputOptions);
}

export default build;

// async (cmd: Command) => {
//   const args = [
//     '--outDir',
//     'dist/cjs',
//     '--noEmit',
//     'false',
//     '--module',
//     'CommonJS',
//   ];

//   if (cmd.watch) {
//     args.push('--watch');
//   }

//   await copyStaticAssets();
//   await run('tsc', args);
//   await rollup(args, rollupConfig);
// };

// const copyStaticAssets = async () => {
//   const pluginRoot = fs.realpathSync(process.cwd());
//   const source = path.resolve(pluginRoot, 'src');
//   const destination = path.resolve(pluginRoot, 'dist', 'cjs');
//   const assetFiles = await recursive(source, [
//     '**/*.tsx',
//     '**/*.ts',
//     '**/*.js',
//   ]);
//   assetFiles.forEach(file => {
//     const fileToBeCopied = file.replace(source, destination);
//     const dirForFileToBeCopied = path.dirname(fileToBeCopied);
//     fs.ensureDirSync(dirForFileToBeCopied);
//     fs.copyFileSync(file, file.replace(source, destination).toString());
//   });
// };
