import Head from 'next/head';

const Home = () => {
  const name = 'Galih';
  return (
    <div className='h-screen'>
      <Head>
        <title>Browse | Musically</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex justify-center items-center bg-gradient-to-r from-indigo-600 to-pink-500 h-screen'>
        <div className='flex flex-col justify-center max-w-md bg-white rounded-lg w-full md:mx-0 mx-4 p-4'>
          <h1 className='text-6xl font-bold leading-relaxed'>Login</h1>
        </div>
      </main>
    </div>
  );
};

export default Home;
