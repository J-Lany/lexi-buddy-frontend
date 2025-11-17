import { render } from '@testing-library/react';
import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

describe('Field UI — Snapshot', () => {
  it('renders a full field correctly', () => {
    const { container } = render(
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" placeholder="m@example.com" />
        <FieldDescription>We never share your email.</FieldDescription>
        <FieldError>Email is required.</FieldError>
      </Field>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders FieldGroup correctly', () => {
    const { container } = render(
      <FieldGroup>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input type="password" />
        </Field>
        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input type="password" />
        </Field>
      </FieldGroup>,
    );

    expect(container).toMatchSnapshot();
  });
});
