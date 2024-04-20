import { useRandomId } from "../hooks/useRandomId";

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
  const id = useRandomId();
  return (
    <>
      <label htmlFor={id}>{typeof name === "string" ? name : ""}</label>
      <input
        id={id}
        // required={required}

        type="checkbox"
        checked={value ?? false}
        onChange={() => onChange(!value as TV)}
      />
    </>
  );
}
