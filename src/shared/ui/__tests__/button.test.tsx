import { render } from '@testing-library/react';

import { Button } from '@/shared/ui/button';

describe('Button Snapshot', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
});
