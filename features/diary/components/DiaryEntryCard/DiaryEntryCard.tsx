import { Diary } from "../../types";
import css from "./DiaryEntryCard.module.css";
interface DiaryEntryCardProps {
    diary: Diary;
}

export default function DiaryEntryCard ({diary}: DiaryEntryCardProps) {
return <li className={css.card}>
    <div className={css.cardHeading}>
    <h4 className={css.cardTitle}>{diary.title}</h4>
    <p className={css.cardDate}>{diary.date}</p>
    </div>
    <ul className={css.emotions}>
    {diary.emotions.map((emotion, index)=> <li className={css.emotion} key={index}>{emotion}</li>)}
    </ul>
    
    
</li>
}