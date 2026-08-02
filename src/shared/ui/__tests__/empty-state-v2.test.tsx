import { fireEvent, render, screen } from '@testing-library/react';

import { EmptyStateV2 } from '@/shared/ui/empty-state-v2';

describe('EmptyStateV2 responsive composition', () => {
  it('renders the primary action before onboarding and applies responsive order classes', () => {
    const onAction = jest.fn();

    render(
      <EmptyStateV2
        icon={<svg aria-label="illustration" />}
        title="Nothing here"
        description="Create the first item."
        steps={[
          { id: 'first', title: 'First', desc: 'First description' },
          { id: 'second', title: 'Second', desc: 'Second description' },
          { id: 'third', title: 'Third', desc: 'Third description' },
        ]}
        primaryAction={<button onClick={onAction}>Create item</button>}
      />,
    );

    const actions = screen.getByTestId('empty-state-actions');
    const onboarding = screen.getByTestId('empty-state-onboarding');

    const actionIsBeforeOnboarding = Boolean(
      actions.compareDocumentPosition(onboarding) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(actionIsBeforeOnboarding).toBe(true);
    expect(actions).toHaveClass('order-1', 'sm:order-2');
    expect(onboarding).toHaveClass('order-2', 'sm:order-1');
    expect(onboarding).toHaveClass('rounded-2xl', 'sm:rounded-none');

    const section = screen.getByRole('region', { name: 'Nothing here' });
    expect(section).toHaveAttribute('aria-labelledby', screen.getByText('Nothing here').id);
    expect(section).toHaveAttribute(
      'aria-describedby',
      screen.getByText('Create the first item.').id,
    );
    expect(section).not.toHaveAttribute('role', 'status');

    fireEvent.click(screen.getByRole('button', { name: 'Create item' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
