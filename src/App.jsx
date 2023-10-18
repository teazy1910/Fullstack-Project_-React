import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./components/Settings";
import Products from "./components/Products";
import Home from "./components/Home";
import Nav from "./Nav";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Settings />}></Route>
        <Route path="/about" element={<Products />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
