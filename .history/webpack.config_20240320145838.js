// import path from 'path';

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

console.log(__dirname);

// const config = {
//   mode: 'production',
//   entry: 'src/app.js',
//   output: {
//     path: path.join(__dirname, 'dist'),
//     publicPath: '/',
//     filename: 'final.js',
//   },
//   target: 'node',
// };

// export default config;
