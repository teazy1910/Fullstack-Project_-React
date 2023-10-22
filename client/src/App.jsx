import { useEffect, useState } from "react";

export default function App() {
  const [backendData, setBackendData] = useState({
    products: {},
    locales: [],
  });

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then(setBackendData);
  }, []);

  return (
    <div>
      <div>
        {/* <div>{JSON.stringify(backendData)}</div> */}
        {Object.keys(backendData.products).map((prodId) => {
          return (
            <p key={prodId}>
              {prodId} {backendData.products[prodId].price}
            </p>
          );
        })}
      </div>
      <ul>
        {backendData.locales.map((locale) => {
          console.log(locale);
          return <li key={locale}>{locale}</li>;
        })}
      </ul>
    </div>
  );
}
