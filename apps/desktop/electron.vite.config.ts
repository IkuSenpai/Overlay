import { resolve } from 'node:path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts')
        }
      }
    }
  },

  preload: {
    build: {
      rollupOptions: {
        input: {
          control: resolve(__dirname, 'src/preload/control.ts'),
          overlay: resolve(__dirname, 'src/preload/overlay.ts')
        },
        output: {
          format: 'cjs',
          entryFileNames: '[name].js'
        }
      }
    }
  },

  renderer: {
    root: resolve(__dirname, 'src/renderer'),
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          control: resolve(
            __dirname,
            'src/renderer/control/index.html'
          ),
          overlay: resolve(
            __dirname,
            'src/renderer/overlay/index.html'
          )
        }
      }
    }
  }
})