import { NextPageWithLayout } from '@/types';
import { GetServerSidePropsContext } from 'next';

const Home: NextPageWithLayout = function () {
  return <div className="flex flex-col gap-6 self-stretch">home</div>;
};

export async function getServerSideProps(_context: GetServerSidePropsContext) {
  return {
    redirect: {
      destination: '/dashboard',
      permanent: false,
    },
  };
}

Home.layout = 'none';
export default Home;
