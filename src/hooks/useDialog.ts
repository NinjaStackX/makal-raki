"use client";

import { Article, User } from "@/utils/types";
import { useEffect, useState } from "react";

export default function useDialog<T extends { typ: string }>({ typ }: T) {
  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<null | User | Article>();
  function toggleDialog(): void {
    if (item) {
      setOpen((p) => !p);
      if (open == true && typ != "create") setItem(null);
    }
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted && item && typ != "create") toggleDialog();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return { open, setOpen, toggleDialog, item, setItem };
}
