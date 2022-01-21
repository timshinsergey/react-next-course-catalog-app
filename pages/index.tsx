import axios from 'axios'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import { Button, Htag, Input, P, Rating, Tag, Textarea } from '../components'
import { MenuItem } from '../interfaces/menu.interface'
import { withLayout } from '../layout/Layout'

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState(4)
  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow='down'>
        Кнопка
      </Button>
      <Button appearance='ghost' arrow='right'>
        Кнопка
      </Button>
      <P size='l'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae odio
        veniam placeat eaque nihil. Odio consectetur omnis tempora assumenda
        laborum! Dicta aliquam nihil incidunt ullam libero at, quis molestias
        debitis.
      </P>
      <Tag href='https://vk.com'>Веб-разработка</Tag>
      <Tag size='m' color='ghost'>
        Веб-разработка
      </Tag>
      <Tag size='s' color='red'>
        Веб-разработка
      </Tag>
      <Tag color='grey'>Веб-разработка</Tag>
      <Tag color='green'>Веб-разработка</Tag>
      <Tag color='primary'>Веб-разработка</Tag>
      <Rating rating={rating} setRating={setRating} isEditable />
      <Input placeholder='text' />
      <Textarea placeholder='text area' />
    </>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    {
      firstCategory,
    }
  )
  return {
    props: {
      menu,
      firstCategory,
    },
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
