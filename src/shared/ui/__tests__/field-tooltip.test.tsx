import { render, screen } from '@testing-library/react';

import { FieldTooltip } from '@/shared/ui/field-tooltip';

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
});
