import '@testing-library/jest-dom';

// jsdom doesn't implement ResizeObserver; Radix UI primitives (e.g. Checkbox) need it.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
