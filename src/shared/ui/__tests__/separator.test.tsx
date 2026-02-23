import { render } from '@testing-library/react';

import { Separator } from '@/shared/ui/separator';

describe('Separator UI — Snapshot', () => {
  it('renders default horizontal separator', () => {
    const { container } = render(<Separator />);
    expect(container).toMatchSnapshot();
  });

  it('renders vertical separator', () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container).toMatchSnapshot();
  });

  it('renders separator with custom class', () => {
    const { container } = render(<Separator className="bg-primary h-1" />);
    expect(container).toMatchSnapshot();
  });
});
