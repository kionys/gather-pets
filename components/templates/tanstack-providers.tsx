"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IPropsTanStackProvider {
  children: React.ReactNode;
}

export const TanStackProvider = ({ children }: IPropsTanStackProvider) => {
  // const [queryClient] = useState(() => new QueryClient({}));
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 유지
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
