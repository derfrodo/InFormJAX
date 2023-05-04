export function StringInput<
  T extends {},
  TKey extends keyof T,
  TV extends T[TKey] | string | null | undefined
>(props: {
  item: T;
  name: TKey;
  value: TV;
  onChange: (next: TV) => any;
  required: boolean;
}) {
  const { name, value, required } = props;
  return (
    <input
      required={required}
      value={value ?? ""}
      onChange={(e) => props.onChange(e.target.value as TV)}
      placeholder={typeof name === "string" ? name : ""}
    ></input>
  );
}
