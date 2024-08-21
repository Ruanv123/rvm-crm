"use client";

import { ColumnDef } from "@tanstack/react-table";
export type Companies = {
  id: string;
  name: string;
};

export const columns: ColumnDef<Companies>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
