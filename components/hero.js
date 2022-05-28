import { MusicNoteIcon } from '@heroicons/react/solid';

const Hero = ({ title }) => {
  return (
    <div className='flex flex-row sm:my-10 my-5'>
      <div className='flex sm:flex-none justify-center item-center '>
        <MusicNoteIcon className='inline-block sm:h-auto w-full fill-indigo-600 z-0 h-16' />
      </div>
      <div className='flex flex-auto flex-col justify-center item-center sm:ml-10 ml-5'>
        <h1 className='sm:text-7xl text-3xl font-bold leading-normal'>{title}</h1>
      </div>
    </div>
  );
};

export default Hero;
