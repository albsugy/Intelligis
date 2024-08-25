import Image from 'next/image';
import * as React from 'react';
import '@/lib/env';

import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';

export default async function HomePage() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Image
            width={150}
            height={150}
            src='/images/logo.jpeg'
            alt='Intelligis logo'
          />
          <h1 className='mt-4 text-xl font-semibold'>Intelligis</h1>
          <p className='mt-2 text-sm text-gray-800'>
            AI-powered project management platform
          </p>

          <ButtonLink className='mt-6' href='/projects' variant='light'>
            Get Started
          </ButtonLink>

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://albsugy.com'>
              Medhat Albsugy
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
