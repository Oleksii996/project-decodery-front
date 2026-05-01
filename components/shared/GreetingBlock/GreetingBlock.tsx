import css from './GreetingBlock.module.css'
interface GreetingBlockProps {
    name: string
}
export default function GreetingBlock({name}: GreetingBlockProps) {
  return <h1 className={css.title}>Доброго ранку, {name}</h1>
}