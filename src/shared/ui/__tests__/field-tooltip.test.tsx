import { fireEvent, render, screen } from '@testing-library/react';

import { FieldTooltip } from '@/shared/ui/field-tooltip';

const COARSE_QUERY = '(hover: none) and (pointer: coarse)';

function mockPointer(isCoarse: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: isCoarse && query === COARSE_QUERY,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

describe('FieldTooltip', () => {
  it('uses the full content as the accessible name when no ariaLabel is given', () => {
    render(<FieldTooltip content="A fairly long explanation of what this field does." />);
    expect(
      screen.getByRole('button', { name: 'A fairly long explanation of what this field does.' }),
    ).toBeInTheDocument();
  });

  it('uses a short ariaLabel for the button while keeping the full tooltip content', () => {
    render(
      <FieldTooltip
        content="Additional context for the student\nA much longer explanation shown in the tooltip body."
        ariaLabel="More information"
      />,
    );

    expect(screen.getByRole('button', { name: 'More information' })).toBeInTheDocument();
  });

  describe('on coarse (touch) pointers', () => {
    beforeEach(() => mockPointer(true));

    it('opens the hint on tap', async () => {
      render(<FieldTooltip content="Tapping the icon opens this hint." />);
      fireEvent.click(screen.getByRole('button'));
      expect(await screen.findByRole('dialog')).toHaveTextContent(
        'Tapping the icon opens this hint.',
      );
    });

    it('closes the hint on a second tap', async () => {
      render(<FieldTooltip content="Tapping the icon opens this hint." />);
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      expect(await screen.findByRole('dialog')).toBeInTheDocument();
      fireEvent.click(trigger);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes the hint on Escape', async () => {
      render(<FieldTooltip content="Tapping the icon opens this hint." />);
      fireEvent.click(screen.getByRole('button'));
      const dialog = await screen.findByRole('dialog');
      fireEvent.keyDown(dialog, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes the hint when tapping outside', async () => {
      render(<FieldTooltip content="Tapping the icon opens this hint." />);
      fireEvent.click(screen.getByRole('button'));
      await screen.findByRole('dialog');

      // Radix registers its outside-pointerdown listener in a setTimeout(0);
      // let it flush before simulating the outside tap.
      await new Promise((resolve) => setTimeout(resolve, 0));

      fireEvent.pointerDown(document.body);
      fireEvent.click(document.body);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes the first hint when a second one is opened', async () => {
      render(
        <>
          <FieldTooltip content="First hint" ariaLabel="First" />
          <FieldTooltip content="Second hint" ariaLabel="Second" />
        </>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'First' }));
      expect(await screen.findByRole('dialog')).toHaveTextContent('First hint');

      fireEvent.pointerDown(screen.getByRole('button', { name: 'Second' }));
      fireEvent.click(screen.getByRole('button', { name: 'Second' }));

      expect(await screen.findByRole('dialog')).toHaveTextContent('Second hint');
      expect(screen.queryByText('First hint')).not.toBeInTheDocument();
    });

    it('reflects open state via aria-expanded on the trigger', async () => {
      render(<FieldTooltip content="Tapping the icon opens this hint." />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(trigger);
      await screen.findByRole('dialog');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('on fine (mouse) pointers', () => {
    beforeEach(() => mockPointer(false));

    it('opens the hint on keyboard focus', async () => {
      render(<FieldTooltip content="Shown on hover or focus." />);
      fireEvent.focus(screen.getByRole('button'));
      expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    });

    it('does not open on a plain click', () => {
      render(<FieldTooltip content="Shown on hover or focus." />);
      fireEvent.click(screen.getByRole('button'));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
