import styles from "./TasksReminderCard.module.css";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

type Props = {
  task: Task;
  onToggle: (id: number) => void;
};

export default function TaskItem({ task, onToggle }:Props) {
  return (
   <div className={styles.task}>
  <input
    type="checkbox"
    className={styles.checkbox}
    checked={task.done}
    onChange={() => onToggle(task.id)}
  />

  <div className={styles.content}>
    <span className={styles.date}>22.07</span>

    <span className={task.done ? styles.done : styles.text}>
      {task.title}
    </span>
  </div>
</div>
  );
}