import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { I18nProvider } from '@/shared/i18n';
import { FieldTooltip } from '@/shared/ui/field-tooltip';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';

const STEP_ONE_HINT = 'Step one hint';

function Harness({ initialOpen = true }: { initialOpen?: boolean } = {}) {
  const [open, setOpen] = React.useState(initialOpen);
  const [step, setStep] = React.useState<1 | 2>(1);

  return (
    <I18nProvider>
      <ResponsiveModal
        trigger={<button type="button">Open modal</button>}
        title="Test modal"
        open={open}
        onOpenChange={setOpen}
        footer={
          <>
            <button type="button" onClick={() => setStep(2)}>
              Go to step 2
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              Close modal
            </button>
          </>
        }
      >
        {step === 1 ? (
          <FieldTooltip content={STEP_ONE_HINT} />
        ) : (
          <div>Step two, no tooltip here</div>
        )}
      </ResponsiveModal>
    </I18nProvider>
  );
}

function dialogContent() {
  return document.querySelector('[data-slot="dialog-content"]');
}

function popoverContent() {
  return document.querySelector('[data-slot="popover-content"]');
}

describe('FieldTooltip inside ResponsiveModal (Radix Dialog)', () => {
  it('opens the hint from a trigger rendered inside the modal', async () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'More information' }));
    expect(await screen.findByText(STEP_ONE_HINT)).toBeInTheDocument();
  });

  it('does not close the Dialog when clicking the hint content', async () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'More information' }));
    const hint = await screen.findByText(STEP_ONE_HINT);

    fireEvent.pointerDown(hint);
    fireEvent.click(hint);

    expect(dialogContent()).not.toBeNull();
    expect(screen.getByText(STEP_ONE_HINT)).toBeInTheDocument();
  });

  it('Escape closes only the hint, a second Escape closes the Dialog', async () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'More information' }));
    await screen.findByText(STEP_ONE_HINT);

    fireEvent.keyDown(popoverContent() as Element, { key: 'Escape' });
    expect(screen.queryByText(STEP_ONE_HINT)).not.toBeInTheDocument();
    expect(dialogContent()).not.toBeNull();

    fireEvent.keyDown(dialogContent() as Element, { key: 'Escape' });
    expect(dialogContent()).toBeNull();
  });

  it('closing the Dialog removes the hint portal', async () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'More information' }));
    await screen.findByText(STEP_ONE_HINT);

    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(dialogContent()).toBeNull();
    expect(popoverContent()).toBeNull();
    expect(screen.queryByText(STEP_ONE_HINT)).not.toBeInTheDocument();
  });

  it('switching the wizard step removes an open hint', async () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'More information' }));
    await screen.findByText(STEP_ONE_HINT);

    fireEvent.click(screen.getByRole('button', { name: 'Go to step 2' }));

    expect(screen.queryByText(STEP_ONE_HINT)).not.toBeInTheDocument();
    expect(popoverContent()).toBeNull();
    expect(dialogContent()).not.toBeNull();
  });
});
