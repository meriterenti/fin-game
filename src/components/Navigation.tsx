'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

type NavLink = {
  label: string;
  link: string;
};

type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const session = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <a href='#' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <Image
              src='/logo.svg'
              alt='App Logo'
              className='grayscale hover:grayscale-0 h-8 w-auto'
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <Popover.Group className='hidden lg:flex lg:gap-x-12'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.link}
              className={`text-sm font-semibold leading-6 text-white ${
                link.link === pathname ? 'active' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          {session?.data && (
            <Link
              href='/profile'
              className='text-sm font-semibold leading-6 text-white'
            >
              My Profile
            </Link>
          )}
        </Popover.Group>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          {session?.data ? (
            <Link
              href='#'
              className='text-sm font-semibold leading-6 text-white'
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out <span aria-hidden='true'>&rarr;</span>
            </Link>
          ) : (
            <Link
              href='/api/auth/signin'
              className='text-sm font-semibold leading-6 text-white'
            >
              Sign In <span aria-hidden='true'>&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <Image
                src='/logo.svg'
                alt='App Logo'
                className='grayscale h-8 w-auto'
                width={100}
                height={24}
                priority
              />
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.link}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${
                      link.link === pathname ? 'active' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className='py-6'>
                {session?.data ? (
                  <Link
                    href='#'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Sign Out <span aria-hidden='true'>&rarr;</span>
                  </Link>
                ) : (
                  <Link
                    href='/api/auth/signin'
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    Sign In <span aria-hidden='true'>&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Navigation;
