/* eslint-disable @next/next/no-img-element */

export function ImageCell<T extends {}, TKey extends keyof T>(props: {
  item: T;
  name: TKey;
  value: string | null | undefined;
}) {
  const { name, value } = props;
  return (
    <td style={{ textAlign: "center" }}>
      {value ?
        <img style={{ height: 20 }} title={value} alt={typeof name === "string" ? (name) : "image"} src={value} /> :
        <></>}
    </td>
  );
}
