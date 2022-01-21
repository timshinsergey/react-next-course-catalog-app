import axios from 'axios'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { firstLevelMenu } from '../../helpres/helpres'
import { MenuItem } from '../../interfaces/menu.interface'
import { TopLevelCategory } from '../../interfaces/page.interface'
import { withLayout } from '../../layout/Layout'

function Type({ firstCategory }: TypeProps): JSX.Element {
  return <>Type: {firstCategory}</>
}

export default withLayout(Type)

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(
      (firstLevelMenuItem) => `/${firstLevelMenuItem.route}`
    ),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({
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
  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    {
      firstCategory: firstCategoryItem.id,
    }
  )
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  }
}

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
}
