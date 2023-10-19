import { useTranslation } from "react-i18next";

// import Practice from "../Practice";

export default function Home() {
  const { t } = useTranslation();
  // const name = "Tanja";

  const COFFEETYPES = [
    "Kaffee",
    "Espresso",
    "Latte Macchiato",
    "Café Crema",
    "Tee",
    "Cappucchino",
    "Milchschaum",
    "Heißes Wasser",
  ];

  function handleClick(e) {
    e.preventDefault();
    console.log("ich wurde geklickt");
  }

  return (
    <div>
      <div className="container">
        <div>
          {COFFEETYPES.map((type) => (
            <button onClick={handleClick} key={type}>
              {type}
            </button>
          ))}
        </div>
        <h1>{t("greeting")}</h1>
        {/* <p>
          {t("whoIam")} {name}
        </p> */}
      </div>
    </div>
  );
}
