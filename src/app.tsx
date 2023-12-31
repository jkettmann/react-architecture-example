import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "@/components/header";
import { Feed } from "@/pages/feed";
import { UserProfile } from "@/pages/user-profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/user/:handle",
    element: <UserProfile />,
  },
]);

export function App() {
  const [client] = useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <Header />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
