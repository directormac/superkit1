import matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';
import { readable } from 'svelte/store';
expect.extend(matchers);
import type * as environments from '$app/environment';
import type * as navigation from '$app/navigation';
import type * as stores from '$app/stores';
import type { Navigation, Page } from '@sveltejs/kit';

vi.mock('$app/environment', (): typeof environments => ({
	browser: true,
	dev: true,
	building: false,
	version: 'any'
}));

// Mock SvelteKit runtime module $app/navigation
vi.mock('$app/navigation', (): typeof navigation => ({
	afterNavigate: () => {},
	beforeNavigate: () => {},
	disableScrollHandling: () => {},
	goto: () => Promise.resolve(),
	invalidate: () => Promise.resolve(),
	invalidateAll: () => Promise.resolve(),
	preloadData: () => Promise.resolve(),
	preloadCode: () => Promise.resolve()
}));

// Mock SvelteKit runtime module $app/stores
vi.mock('$app/stores', (): typeof stores => {
	const getStores: typeof stores.getStores = () => {
		const navigating = readable<Navigation | null>(null);
		const page = readable<Page>({
			url: new URL('http://localhost'),
			params: {},
			route: {
				id: null
			},
			status: 200,
			error: null,
			data: {},
			form: undefined
		});
		const updated = {
			subscribe: readable(false).subscribe,
			check: async () => false
		};

		return { navigating, page, updated };
	};

	const page: typeof stores.page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		}
	};
	const navigating: typeof stores.navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		}
	};
	const updated: typeof stores.updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		},
		check: async () => false
	};

	return {
		getStores,
		navigating,
		page,
		updated
	};
});
