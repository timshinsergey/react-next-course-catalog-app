import axios from 'axios'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { API } from '../../helpers/api'
import { firstLevelMenu } from '../../helpers/helpers'
import { MenuItem } from '../../interfaces/menu.interface'
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface'
import { ProductModel } from '../../interfaces/product.inteface'
import { withLayout } from '../../layout/Layout'
import { TopPageComponent } from '../../page-components'
import { Error404 } from '../404'

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
  if (!page || !products) {
    return <Error404 />
  }

  return (
    <>
      <Head>
        {page.metaTitle && (
          <>
            <title>{page.metaTitle}</title>
            <meta property='og:title' content={page.metaTitle} />
          </>
        )}
        {page.metaDescription && (
          <>
            <meta name='description' content={page.metaDescription} />
            <meta property='og:description' content={page.metaDescription} />
          </>
        )}
        <meta property='og:type' content='article' />
      </Head>
      <TopPageComponent
        firstCategory={firstCategory}
        page={page}
        products={products}
      />
    </>
  )
}

export default withLayout(TopPage)

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []
  for (const firstLevelMenuItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstLevelMenuItem.id,
    })
    paths = paths.concat(
      menu.flatMap((menuItem) =>
        menuItem.pages.map(
          (pageItem) => `/${firstLevelMenuItem.route}/${pageItem.alias}`
        )
      )
    )
  }
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    }
  }
  const firstCategoryItem = firstLevelMenu.find(
    (firstLevelMenuItem) => firstLevelMenuItem.route === params.type
  )
  if (!firstCategoryItem) {
    return {
      notFound: true,
    }
  }
  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    })
    if (menu.length === 0) {
      return {
        notFound: true,
      }
    }
    const { data: page } = await axios.get<TopPageModel>(
      `${API.topPage.byAlias}/${params.alias}`
    )
    const { data: products } = await axios.post<ProductModel[]>(
      API.product.find,
      {
        category: page.category,
        limit: 10,
      }
    )
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
  page: TopPageModel
  products: ProductModel[]
}
