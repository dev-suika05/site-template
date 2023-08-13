import { defineConfig } from 'vite';
import { resolve } from 'path';

import handlebars from 'vite-plugin-handlebars';
import fs from 'fs';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

const fileNameList = fs.readdirSync(resolve(__dirname, './src/'));
const htmlFileList = fileNameList.filter(file => /.html$/.test(file));
const inputFiles = {};
for (let i = 0; i < htmlFileList.length; i++) {
  const file = htmlFileList[i];
  inputFiles[file.slice(0,-5)] = resolve(__dirname, './src/' + file );
}

const pageData = {
  '/index.html': {
    isHome: true,
    title: 'TOP',
    directory: '.',
  },
  '/sample.html': {
    isHome: false,
    title: 'Sample Page',
    directory: '.'
  },
  '/detail/index.html': {
    isHome: false,
    title: 'Detail',
    directory: '../..'
  },
};

export default defineConfig({
	base: './',
	root,
	build: {
		outDir,
		rollupOptions: {
			input: inputFiles,
			output: {
				entryFileNames: `assets/js/script.js`,
				assetFileNames: `assets/css/style.[ext]`,
			}
		},
	},
	plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './src/inc'),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
	server: {
		port: 8080
	}
})