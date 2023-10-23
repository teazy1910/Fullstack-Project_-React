import Products from "./Products";
// import { D } from "../data";
import { useState } from "react";

export default function Home() {
  const [availableLocales, setAvailableLocales] = useState([]);
  const [currentLocale, setCurrentLocale] = useState("");

  function handleLanguage(locale, event) {
    event.preventDefault();
    console.log(locale);
    setCurrentLocale(locale);
    // console.log("Hi");
  }

  function setOrInitAvailableLocales(availableLocales) {
    setAvailableLocales(availableLocales);
    if (currentLocale === "" && availableLocales.length > 0) {
      setCurrentLocale(availableLocales[0]);
    }
  }

  return (
    <>
      <Products
        currentLocale={currentLocale}
        updateAvailableLocales={setOrInitAvailableLocales}
      />
      <div className="container_language_startseite">
        <span>Please choose your language</span>
        {availableLocales.map((locale) => {
          return (
            <a key={locale} onClick={(event) => handleLanguage(locale, event)}>
              {locale}
            </a>
          );
        })}
      </div>
    </>
  );
}
