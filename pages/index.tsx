import Head from 'next/head'
import { ProductList } from 'containers'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mobilní telefony</title>
        <meta name="description" content="Mobilní telefony - srovnávač cen" />
      </Head>

      <main className="w-4/5">
        <h1 className="text-18 font-semibold">Mobilní telefony</h1>
        <div className="flex pb-80">
          <div className="w-1/3"></div>
          <ProductList />
        </div>
      </main>
    </>
  )
}
