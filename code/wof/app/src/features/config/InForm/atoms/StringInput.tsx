import { useRandomId } from "../hooks/useRandomId";

export function StringInput<
  T extends {},
  TKey extends keyof T,
  TV extends T[TKey] | string | null | undefined
>(props: {
  required?: boolean;
  item: T;
  name: TKey;
  value: TV;
  onChange: (next: TV) => any;
}) {
  const { name, value, required } = props;
  const id = useRandomId();
  return (
    <div>
      <input
        id={id}
        required={required}
        value={value ?? ""}
        onChange={(e) =>
          e.target.value !== ""
            ? props.onChange(e.target.value as TV)
            : undefined
        }
      ></input>
      <label style={{ display: "block", fontSize: "smaller", marginTop: -2 }} htmlFor={id}>{typeof name === "string" ? name : ""}</label>
    </div>
  );
}
