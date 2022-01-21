import { useState, KeyboardEvent, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { SearchProps } from './Search.props'
import { Button, Input } from '..'
import styles from './Search.module.css'
import GlassIcon from './glass.svg'

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const goToSearch = (event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
    event.preventDefault()
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key == 'Enter') {
      goToSearch(event)
    }
  }

  return (
    <form className={cn(className, styles.search)} {...props} role='search'>
      <Input
        className={styles.input}
        placeholder='Поиск...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance='primary'
        className={styles.button}
        onClick={goToSearch}
        aria-label='Искать по сайту'
      >
        <GlassIcon />
      </Button>
    </form>
  )
}
