import Image from 'next/image';
import styles from './TasksReminderCard.module.css';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const isDone = task.status === 'done';

  return (
    <div className={styles.task}>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onToggle(task)}
        />

        <span className={styles.customCheckbox}>
          {isDone && (
            <Image src="/Checkbox.svg" alt="✓" width={24} height={24} />
          )}
        </span>
      </label>

      <div className={styles.content}>
        <span className={styles.date}>{task.date}</span>
        <span className={`${styles.text} ${isDone ? styles.done : ''}`}>
          {task.title}
        </span>
      </div>
    </div>
  );
}
