export function BoolInput<T extends {}, TKey extends keyof T>(props: {
  item: T;
  name: TKey;
  value: boolean | null;
}) {
  const { name, value } = props;
  return (
    <>
      <input type="checkbox" checked={value ?? false} />
    </>
  );
}
