export function StringInput<T extends {},
TKey extends keyof T,
TV extends T[TKey] | string | null | undefined
>(props: { item: T; name: TKey; value: TV; onChange: (next: TV) => any }) {
  const { name, value } = props;
  return (
    <input
      value={value ?? ""}
      onChange={(e) =>
        e.target.value !== ""
          ? props.onChange(Number(e.target.value) as TV)
          : undefined
      }
    ></input>
  );
}
