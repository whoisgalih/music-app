import { Fragment } from 'react';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import useAuth from '../context/AuthContext';

const AppBar = ({ menus, active }) => {
  const { login, logout } = useAuth();

  return (
    <>
      <Popover className='sticky top-0 backdrop-blur-md bg-white/30 w-full z-10'>
        {/* Desktop App Bar */}
        <div className='custom-margin-padding '>
          <div className='flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <a href='#'>
                <h1 className='text-3xl font-bold'>
                  <span className='box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-1 px-3 rounded-md' href='https://nextjs.org'>
                    Musically
                  </span>
                </h1>
              </a>
            </div>
            <div className='-mr-2 -my-2 md:hidden'>
              <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>
            <div className='hidden md:flex space-x-10'>
              {menus.map((menu, index) => {
                return (
                  <div key={index}>
                    <Link href={menu.href}>
                      <a className={`${menu.label === active ? 'text-gray-900' : 'text-gray-500'} text-base font-medium hover:text-gray-900`}>{menu.label}</a>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
              <button onClick={logout} className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile app bar */}
        <Transition as={Fragment} enter='duration-200 ease-out' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='duration-100 ease-in' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
          <Popover.Panel focus className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
            <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
              <div className='pt-5 pb-6 px-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h1 className='text-3xl font-bold'>
                      <span className='box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-1 px-3 rounded-md' href='https://nextjs.org'>
                        Musically
                      </span>
                    </h1>
                  </div>
                  <div className='-mr-2'>
                    <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                      <span className='sr-only'>Close menu</span>
                      <XIcon className='h-6 w-6' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className='py-6 px-5 space-y-6'>
                <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                  {menus.map((menu, index) => {
                    return (
                      <div key={index}>
                        <Link href={menu.href}>
                          <a className={`${menu.label === active ? 'text-gray-900' : 'text-gray-500'} text-base font-medium text-gray-900 hover:text-gray-700`}>{menu.label}</a>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <p className='mt-6 text-center text-base text-gray-500'>
                    Wanna leave?{' '}
                    <button onClick={logout} href='#' className='text-indigo-600 hover:text-indigo-500 font-bold'>
                      Sign Out
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default AppBar;
