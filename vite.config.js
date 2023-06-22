import { defineConfig } from 'vite'
import { directoryPlugin } from 'vite-plugin-list-directory-contents'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = defineConfig(async () => {
	return {
		root: 'examples',
		plugins: [
			directoryPlugin({ baseDir: path.resolve(__dirname, 'examples') }),
		],
		server: {
			port: 8081,
		},
	}
})

export default config
