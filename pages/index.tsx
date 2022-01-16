import { Button, Htag, P, Tag } from '../components'

export default function Home(): JSX.Element {
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
    </>
  )
}
