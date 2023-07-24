import { sveltekit } from '@sveltejs/kit/vite';
import { configDefaults, defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'import.meta.vitest': 'undefined'
	},
	test: {
		globals: true,
		environment: 'jsdom',
		includeSource: ['sr/**/*.{test,spec}.{js,ts}'],
		exclude: [...configDefaults.exclude, 'tests'],
		setupFiles: ['./src/test.config.ts'],
		coverage: {
			exclude: ['./src/test.config.ts']
		}
	}
});
