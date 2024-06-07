import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';
import { FunctionComponent, ReactNode, useEffect } from 'react';

interface IAuthProps {
  children?: ReactNode;
}

// const Auth: FunctionComponent<IAuthProps> = ({ children }) => {
//   const { isLoading, user } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     console.log(isLoading, user);
//     if (!isLoading && !user) {
//       router.push('/login');
//     }
//   }, [isLoading, user]);

//   if (isLoading) {
//     return null;
//   }

//   return children;
// };

// export { Auth };
