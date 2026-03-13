import type { ReactNode } from "react";
import { AdminStyleIsolation } from "./AdminStyleIsolation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <AdminStyleIsolation />
      {children}
    </>
  );
}
