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
import { addDoc, collection, deleteDoc, getDocs, doc } from 'firebase/firestore';

const Browse = () => {
  const [musics, setMusics] = useState([]);
  const [userFavId, setUserFavId] = useState('');

  const router = useRouter();

  const getData = useCallback(
    async (_userFavId = userFavId) => {
      const querySnapshot = await getDocs(collection(db, 'musics'));
      const _music = [];
      querySnapshot.forEach((doc) => {
        _music.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const fav = await getFavorite(_userFavId);
      fav.forEach((favMusic) => {
        _music.forEach((music) => {
          if (music.id === favMusic) {
            music.favorite = true;
          }
        });
      });

      setMusics(_music);
    },
    [userFavId, getFavorite]
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

  const addFavorite = async (musicId, _userFavId = userFavId) => {
    try {
      const favMusic = await getFavorite();

      // add to favorite if not exist
      if (!favMusic.includes(musicId)) {
        const docRef = await addDoc(collection(db, _userFavId), {
          musicId,
        });

        // console.log('Document written with ID: ', docRef.id);
      } else {
        // find id and delete
        const querySnapshot = await getDocs(collection(db, _userFavId));

        querySnapshot.forEach((_doc) => {
          if (_doc.data().musicId === musicId) {
            deleteDoc(doc(db, _userFavId, _doc.id));
            // console.log('Document deleted with ID: ', _doc.id);
          }
        });
      }

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
  }, [router, getData]);

  return (
    <div className='custom-margin-padding flex flex-col min-h-screen items-center'>
      <Head>
        <title>Browse | Musically</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppBar menus={menus} active='Browse' />

      <main className='w-full custom-margin-padding'>
        <Hero title={'Browse'} />
        <div className='border-b-2'>
          {musics.map((music, index) => {
            return (
              <div key={music.id} className='py-4 border-t-2'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h1 className='text-xl font-medium'>{music.title}</h1>
                    <h1>{music.artist}</h1>
                  </div>
                  <HeartIconOutline
                    onClick={() => {
                      musics[index].favorite = !musics[index].favorite;
                      addFavorite(music.id);
                    }}
                    className={`inline-block h-6 w-6 hover:fill-gray-600 stroke-gray-600 ${music.favorite ? 'custom-favorite-active' : ''}`}
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

export default Browse;
