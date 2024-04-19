export function BoolCell<T extends {}, TKey extends keyof T>(props: {
  item: T;
  name: TKey;
  value: boolean | null | undefined;
}) {
  const { name, value } = props;
  return (
    <td>
      <input type="checkbox" checked={value ?? false} readOnly />
    </td>
  );
}
