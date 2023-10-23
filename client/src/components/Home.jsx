export default function Home() {
  function handleLanguage() {}

  return (
    <div className="container_language_startseite">
      <span>Please choose your language</span>
      <a className="chooseLanguage_englisch" onClick={handleLanguage}>
        English
      </a>
      <a className="chooseLanguage_deutsch" onClick={handleLanguage}>
        Deutsch
      </a>
    </div>
  );
}
