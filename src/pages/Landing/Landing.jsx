import styles from './Landing.module.css'
import Pic from '../../assets/Group75.png'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <div className={styles.imgContainer}>
        <img className={styles.image} src={Pic} alt='Fit' />
      </div>
    </main>
  )
}

export default Landing
