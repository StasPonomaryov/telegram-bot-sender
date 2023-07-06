import Link from 'next/link';

export default function Header() {
  return (
    <header className="page-header">
      <div className="logo">
        <Link href="/">
          <h1 className="header-title">✈️ Відправка повідомлень у Телеграм</h1>
        </Link>
      </div>
      <nav className="page-nav">
        <ul>
          <li>
            <Link href="/message">Повідомлення</Link>
          </li>
          <li>
            <Link href="/image">Малюнок/Фото</Link>
          </li>
          <li>
            <Link href="/video">Відео</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
