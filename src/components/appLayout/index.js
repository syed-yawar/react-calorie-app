import React from "react";

import { Header } from "./header";

export const AppLayout = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
  </div>
);
