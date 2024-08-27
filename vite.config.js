import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {CONSTANTS} from './src/utility/constants'
const {BASE_URL} = CONSTANTS

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-MealApp/',
  plugins: [react()],
})
