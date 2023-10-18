import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  // const name = "Tanja";

  const coffeeTypes = [
    "Kaffee",
    "Cappuccino",
    "Latte Macchiato",
    "Heißes Wasser",
  ];

  coffeeTypes.map((coffee) => console.log(coffee));

  return (
    <div>
      <div>
        <div className="container">
          {/* <h1>{t("greeting")}</h1>
          <p>
            {t("whoIam")} {name}
          </p> */}
        </div>
      </div>
      <button className="btn">{t("sort_of_coffee")}</button>
    </div>
  );
}
