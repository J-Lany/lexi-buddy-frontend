import { render } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input UI — Snapshot', () => {
  it('renders default input correctly', () => {
    const { container } = render(<Input placeholder="Email" />);
    expect(container).toMatchSnapshot();
  });

  it('renders input with type password', () => {
    const { container } = render(<Input type="password" placeholder="••••••••" />);
    expect(container).toMatchSnapshot();
  });

  it('renders disabled input', () => {
    const { container } = render(<Input disabled placeholder="Disabled" />);
    expect(container).toMatchSnapshot();
  });

  it('renders input with error class', () => {
    const { container } = render(
      <Input className="border-red-500 focus-visible:ring-red-500" placeholder="Error state" />,
    );
    expect(container).toMatchSnapshot();
  });
});
