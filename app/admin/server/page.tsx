import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/sign-in');

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export default Page;
