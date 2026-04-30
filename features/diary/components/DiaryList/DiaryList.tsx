import { Diary } from '../../types'
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard'
import css from './DiaryList.module.css'

interface DiaryListProps {
    diaries: Diary []
}
export default function DiaryList ({diaries}: DiaryListProps) {
    return <div className={css.container}>
        <div className={css.head}>
            <h3 className={css.title}>Ваші записи</h3>
            <button type='button' className={css.addButton}>Новий запис 
                <svg className={css.icon} width={24} height={24}>
                    <use href='/leleka-sprite.svg#icon-add_circle'></use>
                </svg>
            </button>
        </div>
        

        {diaries?.length > 0  ? (<ul className={css.list}>
           {diaries.map((diary) => <DiaryEntryCard key={diary._id} diary={diary}/>)}
            </ul>) : (
                <p className={css.empty}> Наразі записи у щоденнику відсутні</p>
            )}
            </div>
}