import '@testing-library/jest-dom';

// jsdom doesn't implement ResizeObserver; Radix UI primitives (e.g. Checkbox) need it.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// jsdom doesn't implement matchMedia; components like ResponsiveSelect, ResponsiveModal,
// and useMediaQuery rely on it. Defaults to "no match" (desktop/fine pointer);
// individual tests can reassign window.matchMedia to flip a specific query to true.
// Some test files opt into the "node" environment (no window/document at all), so guard
// for that too.
if (typeof window !== 'undefined' && typeof window.matchMedia === 'undefined') {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}
