import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { css } from '@emotion/react';
import { Carousel } from '../components/Common/Carousel';

const HomeStyles = {
  Image: css({
    filter: 'blur(px)',
  }),
};

export const Home: NextPage = () => {
  return (
    <article className="h-full flex flex-col">
      <Head>
        <title>Welcome to Sentinel</title>
      </Head>
      {/* <section className="flex h-screen">
        <div>nice</div>
      </section> */}
      <section className="relative h-full flex flex-col lg:flex-row items-center">
        {/* Code picture container */}
        <div className="h-full flex items-center justify-center py-20 px-4 w-full lg:w-1/2 bg-gradient-to-br from-green-400 to-blue-500">
          {/* Wrapper to position image */}
          <div className="w-full lg:w-3/4">
            <img
              css={HomeStyles.Image}
              className="rounded-xl overflow-hidden shadow-md mb-2"
              src="/main-code-bg.png"
              alt="Code-bg"
            />
            <caption className="w-full">
              Actual code running Sentinel :)
            </caption>
          </div>
        </div>
        <div className="flex flex-col z-10 p-8 w-full lg:w-1/2 border shadow-md h-full ml-auto">
          <h1 className="mb-2 text-4xl text-black">Welcome to Sentinel!</h1>
          <p>The open source logger and error tracker</p>
          <p>Links here</p>

          {/* Carousel */}
          <h3 className="mt-auto mb-4 text-3xl">Features</h3>
          <div className="m-auto mt-4 lg:w-3/4">
            <Carousel className="h-80">
              <div className="bg-blue-800 h-80 flex">
                <p className="text-white m-auto w-3/4">
                  Last feature page: This application is a work in progress, and
                  OPEN SOURCE! So if you don't see a feature you want, you can
                  either make an issue and wait for me to roll it out, or make a
                  PR ;)
                  <br />
                  <br />
                  {'<link to the contribution page>'}
                </p>
              </div>
            </Carousel>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <b>TL;DR</b>:{' '}
            <Link href="/getting-started">
              <a className="mx-5 text-white border shadow-sm px-5 py-3 bg-gradient-to-br rounded-md from-green-400 to-blue-500 whitespace-nowrap">
                Get Started
              </a>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Home;
