import { fireEvent, render, screen } from '@testing-library/react';

import { I18nProvider } from '@/shared/i18n';
import { FieldTooltip } from '@/shared/ui/field-tooltip';

function renderTooltip(node: React.ReactNode) {
  return render(<I18nProvider>{node}</I18nProvider>);
}

describe('FieldTooltip', () => {
  it('opens the hint on click', async () => {
    renderTooltip(<FieldTooltip content="Tapping the icon opens this hint." />);
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByText('Tapping the icon opens this hint.')).toBeInTheDocument();
  });

  it('closes the hint on a second click', async () => {
    renderTooltip(<FieldTooltip content="Tapping the icon opens this hint." />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    await screen.findByText('Tapping the icon opens this hint.');
    fireEvent.click(trigger);
    expect(screen.queryByText('Tapping the icon opens this hint.')).not.toBeInTheDocument();
  });

  it('closes the hint when clicking outside', async () => {
    renderTooltip(<FieldTooltip content="Tapping the icon opens this hint." />);
    fireEvent.click(screen.getByRole('button'));
    await screen.findByText('Tapping the icon opens this hint.');

    // Radix registers its outside-pointerdown listener in a setTimeout(0);
    // let it flush before simulating the outside click.
    await new Promise((resolve) => setTimeout(resolve, 0));

    fireEvent.pointerDown(document.body);
    fireEvent.click(document.body);
    expect(screen.queryByText('Tapping the icon opens this hint.')).not.toBeInTheDocument();
  });

  it('closes the hint on Escape', async () => {
    renderTooltip(<FieldTooltip content="Tapping the icon opens this hint." />);
    fireEvent.click(screen.getByRole('button'));
    const content = await screen.findByText('Tapping the icon opens this hint.');
    fireEvent.keyDown(content, { key: 'Escape' });
    expect(screen.queryByText('Tapping the icon opens this hint.')).not.toBeInTheDocument();
  });

  it('is a real button, so Enter and Space open it natively', () => {
    // jsdom does not dispatch the browser's default action (a click) when a
    // focused <button> receives Enter/Space, so this can't be exercised via
    // fireEvent here. What we *can* assert is the invariant that makes the
    // native behaviour guaranteed by the HTML spec: the trigger must be a
    // real <button type="button">, not a div/span with a synthetic handler.
    renderTooltip(<FieldTooltip content="Shown on click, tap or keyboard." />);
    const trigger = screen.getByRole('button');
    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger).toHaveAttribute('type', 'button');
  });

  it('does not open on hover or focus alone', () => {
    renderTooltip(<FieldTooltip content="Shown on click, tap or keyboard." />);
    const trigger = screen.getByRole('button');
    fireEvent.pointerEnter(trigger);
    fireEvent.mouseOver(trigger);
    fireEvent.focus(trigger);
    expect(screen.queryByText('Shown on click, tap or keyboard.')).not.toBeInTheDocument();
  });

  it('renders the exact tooltip text, including embedded newlines', async () => {
    const content = 'Line one\nLine two';
    renderTooltip(<FieldTooltip content={content} />);
    fireEvent.click(screen.getByRole('button'));

    // getByText's default normalizer collapses newlines to spaces, which would
    // hide a regression that mangles the raw string. Compare textContent directly.
    const popoverContent = await screen.findByRole('dialog');
    expect(popoverContent.textContent).toBe(content);
  });

  it('closes the first hint when a second one is opened', async () => {
    renderTooltip(
      <>
        <FieldTooltip content="First hint" />
        <FieldTooltip content="Second hint" />
      </>,
    );
    const [firstTrigger, secondTrigger] = screen.getAllByRole('button');

    fireEvent.click(firstTrigger);
    expect(await screen.findByText('First hint')).toBeInTheDocument();

    fireEvent.pointerDown(secondTrigger);
    fireEvent.click(secondTrigger);

    expect(await screen.findByText('Second hint')).toBeInTheDocument();
    expect(screen.queryByText('First hint')).not.toBeInTheDocument();
  });

  it('uses a short accessible name instead of the full tooltip text', () => {
    renderTooltip(
      <FieldTooltip content="Additional context for the student\nA much longer explanation shown in the tooltip body." />,
    );
    expect(screen.getByRole('button', { name: 'More information' })).toBeInTheDocument();
  });

  it('does not read matchMedia', async () => {
    const spy = jest.spyOn(window, 'matchMedia');
    renderTooltip(<FieldTooltip content="Tapping the icon opens this hint." />);
    fireEvent.click(screen.getByRole('button'));
    await screen.findByText('Tapping the icon opens this hint.');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('exposes the expected ARIA contract', async () => {
    renderTooltip(<FieldTooltip content="Tapping the icon opens this hint." />);
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    const content = await screen.findByText('Tapping the icon opens this hint.');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const controlsId = trigger.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
    expect(content.closest(`#${controlsId}`)).not.toBeNull();
  });
});
