import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	base: './',
	server: {
		port: 8080,
		open: true
	},
	build: {
		rollupOptions: {
			output: {
				entryFileNames: 'matrix-rain.js',
				assetFileNames: 'matrix-rain.[ext]',
				inlineDynamicImports: true
			}
		},
		cssCodeSplit: false,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['console.log', 'console.info', 'console.debug'],
				passes: 4
			},
			mangle: {
				toplevel: true,
				properties: {
					regex: /^_/
				}
			},
			format: {
				comments: false
			}
		},
		target: 'es2020',
		modulePreload: false
	}
})
