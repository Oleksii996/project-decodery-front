import Image from 'next/image';
import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <Link href="/" aria-label="Home">
          <Image
            src="/img/company_logo_both.svg"
            alt="Company logo"
            width={105}
            height={45}
          />
        </Link>
      </div>
    </header>
  );
}
