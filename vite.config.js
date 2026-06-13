import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          const normalizedId = id.replace(/\\/g, '/')
          const nodeModulesIndex = normalizedId.lastIndexOf('/node_modules/')
          const packagePath = nodeModulesIndex >= 0
            ? normalizedId.slice(nodeModulesIndex + '/node_modules/'.length)
            : normalizedId.split('node_modules/').pop()

          if (!packagePath) return

          const parts = packagePath.split('/')
          const packageName = parts[0].startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0]

          if (packageName === 'axios') return

          return packageName
        },
      },
    },
  },
})
