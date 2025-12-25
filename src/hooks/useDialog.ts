"use client";
import { pr } from "@/lib/pr";
import React, { useEffect, useLayoutEffect, useState } from "react";

export default function useDialog({ typ }: any) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState();
  function toggleDialog() {
    if (item) {
      setOpen((p) => !p);
      if (open == true && typ != "create") setItem(null);
    }
  }
  useEffect(() => {
    if (item && typ != "create") toggleDialog();
  }, [item]);
  // useEffect(()=>{},[setOpen])
  return { open, setOpen, toggleDialog, item, setItem };
}
