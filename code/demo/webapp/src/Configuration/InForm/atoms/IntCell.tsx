import { useMemo } from "react";

export function IntCell<T extends {}, TKey extends keyof T>(props: {
  item: T;
  name: TKey;
  value: number | null | undefined;
}) {
  const { name, value } = props;
  return <td>{value}</td>;
}
export function IntInput<
  T extends {},
  TKey extends keyof T,
  TV extends T[TKey] | number | null | undefined
>(props: {
  required?: boolean;
  item: T;
  name: TKey;
  value: TV;
  onChange: (next: TV) => any;
}) {
  const { name, required, value } = props;
  const id = useMemo(() => Math.floor(Math.random() * 10000) + "", []);
  return (
    <div>
      <label htmlFor={id}>{typeof name === "string" ? name : ""}</label>
      <input
        required={required}
        type="number"
        id={id}
        value={value ?? ""}
        onChange={(e) =>
          e.target.value !== ""
            ? props.onChange(Number(e.target.value) as TV)
            : undefined
        }
      ></input>
    </div>
  );
}
