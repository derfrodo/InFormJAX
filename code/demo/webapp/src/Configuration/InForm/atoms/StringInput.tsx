export function StringInput<T extends {}, TKey extends keyof T>(props: {
  item: T;
  name: TKey;
  value: string | null | undefined;
}) {
  const { name, value } = props;
  return (
    <td>
      {value}
    </td>
  );
}
