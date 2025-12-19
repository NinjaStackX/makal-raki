"use client";
import { Trash2 } from "lucide-react";
import { delItem } from "@/actions/curd";
import React from "react";

const Btn = ({ id, typ }: { id: any; typ: any }) => {
  return (
    <button onClick={() => delItem(typ, id)}>
      <div className="my-2 bg-red-800 rounded-2xl p-2.5 text-amber-50">
        <Trash2 />
      </div>
    </button>
  );
};

export default Btn;
