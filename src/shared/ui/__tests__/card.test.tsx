import { render } from '@testing-library/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

describe('Card UI — Snapshot', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>This is a great description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Amazing content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>,
    );

    expect(container).toMatchSnapshot();
  });
});
