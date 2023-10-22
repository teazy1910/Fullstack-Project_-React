// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./components/Settings";
import Products from "./components/Products";
import Home from "./components/Home";
import Nav from "./Nav";

export default function App() {
  // // eslint-disable-next-line no-unused-vars
  // const [backendData, setBackendData] = useState({
  //   currentLocale: "de_DE",
  //   products: {},
  //   locales: [],
  // });

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Settings" element={<Settings />}></Route>
          <Route path="/Products" element={<Products />}></Route>
        </Routes>
        <Products />
      </BrowserRouter>
    </>
  );
}
