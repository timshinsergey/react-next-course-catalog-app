import cn from 'classnames'
import { useContext } from 'react'
import Link from 'next/link'
import { AppContext } from '../../context/app.context'
import { firstLevelMenu } from '../../helpres/helpres'
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface'
import styles from './Menu.module.css'

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext)

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((menu) => (
          <div key={menu.route}>
            <Link href={`/${menu.route}`}>
              <a>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: menu.id === firstCategory,
                  })}
                >
                  {menu.icon}
                  <span>{menu.name}</span>
                </div>
              </a>
            </Link>
            {menu.id == firstCategory && buildSecondLevel(menu)}
          </div>
        ))}
      </>
    )
  }

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => (
          <div key={m._id.secondCategory}>
            <div className={styles.secondLevel}>{m._id.secondCategory}</div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: m.isOpened,
              })}
            >
              {buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((p) => (
      <Link key={p.alias} href={`/${route}/${p.alias}`}>
        <a
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: true,
          })}
        >
          {p.category}
        </a>
      </Link>
    ))
  }

  return <div className={styles.menu}>{buildFirstLevel()}</div>
}
