'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FunctionComponent, ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface IQueryProviderProps {
  children?: ReactNode;
}

export const queryClient = new QueryClient();

const QueryProvider: FunctionComponent<IQueryProviderProps> = ({
  children
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export { QueryProvider };
