// next
import Head from 'next/head';
import Link from 'next/link';

// component
import AppBar from '../components/app-bar';
import menus from '../data/menus';
import { MusicNoteIcon, HeartIcon } from '@heroicons/react/solid';

// react
import { useState, useEffect } from 'react';

// auth
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Home = () => {
  const router = useRouter();

  const [user, setUser] = useState({ displayName: '' });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log('no user');
        router.push('/login');
      }
    });
  }, [router]);

  return (
    <div className='custom-margin-padding flex flex-col min-h-screen items-center'>
      <Head>
        <title>Musically</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppBar menus={menus} active='Home' />
      <main className='flex w-full flex-1 md:justify-center justify-end md:pt-0 pt-10 md:flex-row items custom-margin-padding flex-col-reverse'>
        <div className='md:flex-auto md:w-3/5 flex flex-col justify-center item-center flex-none md:pt-0 pt-10'>
          <h1 className='text-6xl font-bold leading-normal'>
            Remember Your Favorite{' '}
            <span className='box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4' href='https://nextjs.org'>
              Music!
            </span>
          </h1>
          <p className='mt-5 text-2xl'>
            Hi <span className='font-bold'>{user.displayName}</span> let&apos;s save your favorite music so you can remember your moment
          </p>
          <div className='mt-5 sm:mt-8 sm:flex justify-start'>
            <div className='rounded-md shadow'>
              <Link href='/browse'>
                <a className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>Start Browsing</a>
              </Link>
            </div>
            <div className='mt-3 sm:mt-0 sm:ml-3'>
              <Link href='/favorite'>
                <a className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'>Go to Favorite</a>
              </Link>
            </div>
          </div>
        </div>
        <div className='md:flex-auto md:w-2/5 flex flex-col justify-center sm:w-full sm:flex-row flex-none'>
          <MusicNoteIcon className='inline-block sm:h-auto w-full fill-indigo-600 z-0 h-min sm:max-w-xs' />
        </div>
      </main>

      <footer className='flex h-24 w-full items-center justify-center custom-margin-padding'>
        <div className='flex border-t w-full h-full items-center justify-center'>
          <p className='flex items-center justify-center gap-2'>
            Made with <HeartIcon className='inline-block h-4 w-4 fill-indigo-600' /> by{' '}
            <a className='underline rounded-md box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2' href='https://github.com/whoisgalih' target={'_blank'} rel='noopener noreferrer'>
              whoisgalih
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
