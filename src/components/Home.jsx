import { useTranslation } from "react-i18next";
import data from "../data.json";

const CoffeeDetails = () => {
  return (
    <>
      <div>
        {data.items.map((type) => {
          return <p key={type.id}>{type.items?.coffeetypes}</p>;
        })}
      </div>
    </>
  );
};

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

  function handleClick() {
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
        {/* <h1>{t("greeting")}</h1>
          <p>
            {t("whoIam")} {name}
          </p> */}
      </div>
      <CoffeeDetails />

      <button className="btn">{t("sort_of_coffee")}</button>
    </div>
  );
}
