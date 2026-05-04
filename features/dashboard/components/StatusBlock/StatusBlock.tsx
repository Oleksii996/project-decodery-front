import css from './StatusBlock.module.css'
interface  DashboardGridProps {
  week: number
  daysToMeet: number
}
export default function StatusBlock({week, daysToMeet}: DashboardGridProps){
  return(
    <ul className={css.container}>
      <li className={css.statCard}>
        <h3 className={css.title}>Тиждень</h3>
        <p className={css.value}>{week}</p>
      </li>
      <li className={css.statCard}>
        <h3 className={css.title}>Днів до зустрічі</h3>
        <p className={css.value}>{`~ ${daysToMeet}`}</p>
      </li>
    </ul>
  )
}

