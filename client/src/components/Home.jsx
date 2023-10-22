// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";

import Practice from "../Practice";

export default function Home() {
  // const { t } = useTranslation();

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
            <a className="item_container" onClick={handleClick} key={type}>
              <div className="item">{type}</div>
            </a>
          ))}
          <Practice />
        </div>
      </div>
    </div>
  );
}
