## Packages Added

```bash
# Vitest Extras
pnpm i -D @vitest/ui

# Testing Library Dependencies
pnpm i -D jsdom @testing-library/jest-dom @testing-library/svelte @testing-library/user-event @types/testing-library__jest-dom

# Adapter Static && svelte vite plugin
pnpm i -D @sveltejs/adapter-static

```

## Aditional modifications after template

Added `--ui` to the test scripts;

```json
"script" : {
  "test:integration": "playwright test --ui",
  "test:unit": "vitest --ui"

}
```

```js
		alias: {
			$components: 'src/lib/components', // Where we keep our Svelte components
			$store: 'src/lib/stores', // Define our stores to be reused
			$utils: 'src/lib/utils' // Utility Helper Functions should be defined here
		}
```
