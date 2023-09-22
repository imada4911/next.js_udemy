import Head from 'next/head';
import styles from './Layout.module.css';
import utilsStyle from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'IMADA CODE';
export const siteTitle = 'next.js blog'

let Layout = ({children,home}) =>{
    return <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>
       
        <header className={styles.header}>
        {home ? (
                <>
                    <img src="./images/profile.png" 
                    className={`${utilsStyle.borderCircle} ${styles.headerHomeImage}`}/>
                    <h1 className={utilsStyle.heading2Xl}>{name}</h1>
                </>
        ) : (
            <>
                <img src="../images/profile.png" 
                    className={`${utilsStyle.borderCircle} ${styles.headerImage}`}/>
                    <h1 className={utilsStyle.heading2Xl}>{name}</h1>
            </>
        )}
        </header>
        <main>{children}</main>
        {!home && (
            <div>
                <Link href="/">ホームへ戻る</Link>
            </div>
        )}
    </div>
}
export default Layout;