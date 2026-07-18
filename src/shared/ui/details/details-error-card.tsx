import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { NavBack } from '@/shared/ui/nav-back';

type Props = {
  backHref: string;
  backLabel: string;
  title?: string;
  description?: string;
};

export function DetailsErrorCard({
  backHref,
  backLabel,
  title = 'Something went wrong',
  description = 'We couldn’t load the requested data. Please try again later.',
}: Props) {
  return (
    <Card className="ui-radius-card">
      <div className="-mt-1">
        <NavBack href={backHref} label={backLabel} />
      </div>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="ui-meta">{description}</CardContent>
    </Card>
  );
}
