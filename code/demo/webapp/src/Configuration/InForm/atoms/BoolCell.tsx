export function BoolCell<T extends {}, TKey extends keyof T>(props: {
  item: T;
  name: TKey;
  value: boolean;
}) {
  const { name, value } = props;
  return (
    <td>
      <input type="checkbox" checked={value} />
    </td>
  );
}
