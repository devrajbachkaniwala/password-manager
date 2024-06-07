import { Loader2 } from 'lucide-react';

function Spinner() {
  return (
    <div className='flex justify-center items-center p-4'>
      <Loader2 size={'2rem'} className='animate-spin' />
    </div>
  );
}

export { Spinner };
