import Head from 'next/head';
import Link from 'next/link';
import AppBar from '../components/app-bar';
import { MusicNoteIcon, HeartIcon } from '@heroicons/react/solid';
import menus from '../data/menus';

const Home = () => {
  const name = 'Galih';
  return (
    <div className='custom-margin-padding flex flex-col min-h-screen items-center'>
      <Head>
        <title>Browse | Musically</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppBar menus={menus} active='Browse' />
    </div>
  );
};

export default Home;
