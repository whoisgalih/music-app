// next
import Head from 'next/head';

// component
import AppBar from '../components/app-bar';
import menus from '../data/menus';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import Hero from '../components/hero';

// react
import { useState, useEffect, useCallback } from 'react';

// auth
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// db
import { db } from '../firebase';
import { collection, deleteDoc, getDocs, getDoc, doc } from 'firebase/firestore';

const Favorites = () => {
  const [musics, setMusics] = useState([]);
  const [userFavId, setUserFavId] = useState('');

  const router = useRouter();

  const getData = useCallback(
    async (_userFavId = userFavId) => {
      const fav = await getFavorite(_userFavId);

      const _music = [];

      for (let index = 0; index < fav.length; index++) {
        const favMusic = fav[index];

        const docSnap = await getDoc(doc(db, 'musics', favMusic));

        if (docSnap.exists()) {
          const data = docSnap.data();
          _music.push({ id: favMusic, ...data, favorite: true });
          // console.log('Document data:', data);
        } else {
          console.log('No such document!!');
        }
      }

      setMusics(_music);
    },
    [getFavorite, userFavId]
  );

  const getFavorite = useCallback(
    async (_userFavId = userFavId) => {
      try {
        const querySnapshot = await getDocs(collection(db, _userFavId));
        const _fav = [];
        querySnapshot.forEach((doc) => {
          _fav.push(doc.data().musicId);
        });
        return _fav;
      } catch (e) {
        console.error('Error adding document: ', e);
        return [];
      }
    },
    [userFavId]
  );

  const removeFavorite = async (musicId, _userFavId = userFavId) => {
    try {
      // find id and delete
      const querySnapshot = await getDocs(collection(db, _userFavId));

      querySnapshot.forEach((_doc) => {
        if (_doc.data().musicId === musicId) {
          deleteDoc(doc(db, _userFavId, _doc.id));
          // console.log('Document deleted with ID: ', _doc.id);
        }
      });

      await getData();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const ufi = `userFav-${user.uid}`;
        getData(ufi);
        setUserFavId(ufi);
      } else {
        console.log('no user');
        router.push('/login');
      }
    });
  }, [getData, router]);

  return (
    <div className='custom-margin-padding flex flex-col min-h-screen items-center'>
      <Head>
        <title>Favorites | Musically</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppBar menus={menus} active='Favorites' />

      <main className='w-full custom-margin-padding'>
        <Hero title={'Favorites'} />
        <div className='border-b-2'>
          {musics.map((music) => {
            return (
              <div key={music.id} className='py-4 border-t-2'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h1 className='text-xl font-medium'>{music.title}</h1>
                    <h1>{music.artist}</h1>
                  </div>
                  <HeartIconOutline
                    onClick={() => removeFavorite(music.id)}
                    className={`inline-block h-6 w-6 hover:fill-gray-600 stroke-gray-600 ${music.favorite ? 'fill-indigo-600 stroke-indigo-600 hover:fill-indigo-800 hover:stroke-indigo-800' : ''}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Favorites;
