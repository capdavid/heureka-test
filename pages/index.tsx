import Head from 'next/head'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Filter, ProductList } from 'containers'
import { Data } from '../data/types'
import qs from 'qs'

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { products, filters } = data
  return (
    <>
      <Head>
        <title>Mobilní telefony</title>
        <meta name="description" content="Mobilní telefony - srovnávač cen" />
      </Head>

      <main className="container mx-auto">
        {!data && <span>Loading...</span>}
        {data && (
          <div className="flex pb-80 mt-20 w-full">
            <Filter filters={filters} />
            <ProductList products={products} />
          </div>
        )}
      </main>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const query = qs.stringify(ctx.query)
  // TODO hostname in env
  // TODO error handling
  const data: Data = await fetch(
    `http://localhost:3000/api/data?${query}`
  ).then((res) => res.json())
  return { props: { data } }
}
