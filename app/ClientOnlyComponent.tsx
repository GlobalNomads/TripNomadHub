"use client";

import useCleanupOnUnload from "./hooks/useCleanupOnUnload";

const ClientOnlyComponent = ({ children }: { children: React.ReactNode }) => {
  useCleanupOnUnload();
  return <>{children}</>;
};

export default ClientOnlyComponent;
