// vite.config.js
import {defineConfig} from "vite";
import {ViteEjsPlugin} from "vite-plugin-ejs";

export default defineConfig({
	root: 'src',
	build: {
    outDir: '../dist'
  },
	plugins: [
    ViteEjsPlugin(
        {title: 'site-template'},
        {
          ejs: {
            // ejs options goes here.
            beautify: true,
          },
        }
    ),
  ],
});