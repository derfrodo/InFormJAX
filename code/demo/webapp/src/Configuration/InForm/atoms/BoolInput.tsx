export function BoolInput<
  T extends {},
  TKey extends keyof T,
  TV extends T[TKey] | boolean | null | undefined
>(props: {
  required?: boolean;
  item: T;
  name: TKey;
  value: TV;
  onChange: (next: TV) => any;
}) {
  const { name, value, required, onChange } = props;
  return (
    <>
      <input
      required={required}
        type="checkbox"
        checked={value ?? false}
        onChange={(e) => onChange(!value as TV)}
      />
    </>
  );
}
