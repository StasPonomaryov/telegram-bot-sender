import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="page-content">
      <h2 className="page-title">Вітаю!</h2>
      <p>Тут ви можете відправити повідомлення тим користувачам, які взаємодіяли з вашим ботом.</p>
      <p>
        Щоб почати відправляти повідомлення, переконайтеся, що маєте токен бота а також список ID
        користувачів.
      </p>
      <p>Алгоритм роботи з додатком:</p>
      <ul className="vertical">
        <li>Оберіть у меню в правому верхньому кутку тип повідомлення для відправки</li>
        <li>Заповніть всі необхідні поля</li>
        <li>Натисніть &quot;Старт&quot;</li>
      </ul>
    </main>
  );
};

export default Home;
