import { useMemo } from "react";

export function useRandomId() {
  const id = useMemo(() => Math.floor(Math.random() * 10000) + "", []);

  return id;
}
