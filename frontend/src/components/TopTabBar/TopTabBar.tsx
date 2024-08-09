import React from 'react'
import styles from './TopTabBar.module.css'
import logo from '../../assets/golflogo.png'
import * as data from'./links.json'
import { Link } from 'react-router-dom'
const linksString = JSON.stringify(data)
const links = JSON.parse(linksString).links;


type Link = {
  title: string,
  href: string
}

const Links: React.FC<{links: Link[]}> = ({ links }) => {
  return (
    <div className={styles['links-container']}>
            {links.map((link: Link) => {
              return (
                <div key={link.href} className={styles['link']}>
                  <a href={link.href}>
                    {link.title}
                  </a>
                </div>
              )
            })}
        </div>
  )
}

const TopTabBar: React.FC = () => {
  return (
    <div className={styles['parent-container']}>
    <nav className={styles.topTabBar}>
        <div className={styles['logo-container']}>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.logo}/>
          </Link>
        </div>
        <Links links = {links} />
    </nav>
    </div>
  )
}

export default TopTabBar