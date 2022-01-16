import { Button, Htag } from '../components'

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' className='some'>
        Кнопка
      </Button>
      <Button appearance='ghost' className='test'>
        Кнопка
      </Button>
    </>
  )
}
