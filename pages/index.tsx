import Head from 'next/head'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Filter, Pagination, Sorting } from 'containers'
import { ProductList } from 'components'
import { Data } from '../data/types'
import qs from 'qs'

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { products, filters, pageInfo } = data

  return (
    <>
      <Head>
        <title>Mobilní telefony</title>
        <meta name="description" content="Mobilní telefony - srovnávač cen" />
      </Head>

      <main className="container mx-auto">
        {!data && <span>Loading...</span>}
        {data && (
          <div className="flex pb-80 mt-20 w-full items-baseline">
            <Filter filters={filters} />

            <div className="flex-grow flex flex-col mx-10">
              <h1 className="text-22 font-semibold mb-4">Mobilní telefony</h1>
              <Sorting />
              {data.products.length ? (
                <>
                  <ProductList products={products} />
                  <Pagination pageInfo={pageInfo} />
                </>
              ) : (
                <span className="text-16 font-semibold mt-40 self-center">
                  Vašemu dotazu neodpovídají žádné výsledky.
                </span>
              )}
            </div>
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
