import { render } from '@testing-library/react';
import { Label } from '@/components/ui/label';

describe('Label UI — Snapshot', () => {
  it('renders default label', () => {
    const { container } = render(<Label>Email</Label>);
    expect(container).toMatchSnapshot();
  });

  it('renders label with htmlFor attribute', () => {
    const { container } = render(<Label htmlFor="email">Email</Label>);
    expect(container).toMatchSnapshot();
  });

  it('renders disabled label styling', () => {
    const { container } = render(<Label className="opacity-50 cursor-not-allowed">Disabled</Label>);
    expect(container).toMatchSnapshot();
  });

  it('renders label with custom class', () => {
    const { container } = render(<Label className="text-primary text-lg">Custom Style</Label>);
    expect(container).toMatchSnapshot();
  });
});
