import { AboutMe, Contact, Experience, Habilities, Introduction, MarqueeTecnologies } from '@/components/page-components/home'
import Head from 'next/head'
import Menu from '@/components/menu'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home • Takedi</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-r from-dark-black to-dark-blue">
        <Menu />
        <Introduction />
        <Habilities />
        <MarqueeTecnologies />
        <Experience />
        <AboutMe />
        <Contact />
      </main>
    </>
  )
}
