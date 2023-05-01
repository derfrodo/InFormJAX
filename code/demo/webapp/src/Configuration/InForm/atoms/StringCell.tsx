/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export function StringCell<T extends {}, TKey extends keyof T>(props: {
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

export function ImageCell<T extends {}, TKey extends keyof T>(props: {
  item: T;
  name: TKey;
  value: string | null | undefined;
}) {
  const { name, value } = props;
  return (
    <td>
      {value ?
        <img style={{ height: 20 }} title={value} alt={typeof name === "string" ? (name) : "image"} src={value} /> :
        <></>
      }
    </td>
  );
}
