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

      <main className="max-w-1280 mx-auto px-4 md:px-8">
        {!data && <span>Loading...</span>}
        {data && (
          <div className="flex flex-col sm:flex-row pb-60 mt-4 sm:mt-20 w-full items-baseline">
            <h1 className="text-22 font-semibold mb-4 sm:hidden block">
              Mobilní telefony
            </h1>
            <Filter filters={filters} />

            <div className="flex-grow flex flex-col mx-0 sm:mx-10">
              <h1 className="text-22 font-semibold mb-4 hidden sm:block">
                Mobilní telefony
              </h1>
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
  // TODO error handling
  const data: Data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/data?${query}`
  ).then((res) => res.json())
  return { props: { data } }
}
