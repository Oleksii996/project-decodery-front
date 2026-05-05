import styles from './TasksReminderCard.module.css';

type Task = {
  id: number;
  title: string;
  done: boolean;
  date: string;
};

type Props = {
  task: Task;
  onToggle: (id: number) => void;
};

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <div className={styles.task}>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />

        <span className={styles.customCheckbox}>
          {task.done && <img src="/Checkbox.svg" alt="✓" />}
        </span>
      </label>

      <div className={styles.content}>
        <span className={styles.date}>{task.date}</span>

        <span className={`${styles.text} ${task.done ? styles.done : ''}`}>
          {task.title}
        </span>
      </div>
    </div>
  );
}