// ** Import Next
import Image from 'next/image'

// ** Import Component
import InputUrl from '@/view/input-url'

// ** Import Style
import styles from './page.module.css'

const HomePage = async () => {
  return (
    <main className={styles.main}>
      <Image src="/images/niurl-logo.svg" alt="logo" width={250} height={150} />
      <InputUrl shortenDomain={process.env.SHORTEN_DOMAIN} />
    </main>
  )
}

export default HomePage