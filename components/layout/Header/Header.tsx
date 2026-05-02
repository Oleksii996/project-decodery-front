import Image from 'next/image';
import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
     
        <div className={css.headercontainer}>
          <Link href="/" aria-label="Home" className={css.logo}>
            <Image
              src="/Company Logo.svg"
              alt="Company logo"
              width={105}
              height={45}
            />
          </Link>
          <button className={css.burger} aria-label="Open menu">
            <svg className={css.icon}>
              <use href="/leleka-sprite.svg#icon-burger_menu" />
            </svg>
          </button>
        </div>
     
    </header>
  );
}
