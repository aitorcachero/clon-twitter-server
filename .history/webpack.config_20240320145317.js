import path from 'path';

const config = {
  mode: 'production',
  entry: 'src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
};
