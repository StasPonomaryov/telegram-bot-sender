import RadioGroup from '../components/RadioGroup';

export default function Message() {
  return (
    <main className="page-content">
      <h2 className="page-title">Відправити текстове повідомлення</h2>
      <div className="parse-mode-block">
        <RadioGroup
          type="horizontal"
          labels={[
            { id: 'plain', name: 'Звичайний текст' },
            { id: 'markdown', name: 'Markdown' },
            { id: 'html', name: 'HTML' },
          ]}
        />
      </div>
      <div className="message-block">
        <div className="message-text">
          <div className="message-block-tooltip">
            Якщо ви хочете додати до повідомлення emoji (курсор повинен бути встановлений у поле для
            вводу повідомлення):
            <br />
            Windows - Натисніть клавішу з логотипом Windows + . (крапка)
            <br />
            Mac OS - Натисніть Command + Control + пробіл
          </div>
        </div>
        <div className="message-preview"></div>
      </div>
    </main>
  );
}
