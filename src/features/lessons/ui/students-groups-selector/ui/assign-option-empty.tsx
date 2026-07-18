type Props = {
  children: string;
};

export function AssignOptionEmpty({ children }: Props) {
  return <div className="ui-meta px-4 py-8 text-center">{children}</div>;
}
