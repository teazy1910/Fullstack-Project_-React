import { Component } from "react";
import { D } from "../data";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocale: "de_DE",
      products: [],
      locales: [],
    };
  }

  componentDidMount() {
    // let c = 0;

    // let refreshProducts = function () {
    //   setBackendData({
    //     currentLocale: backendData.currentLocale,
    //     products: D.getDisplayProducts(),
    //     locales: D.getAvailableLocales(),
    //   });
    // };
    let self = this;
    let productI18nGetter = function (locale, prodId, whenDone) {
      fetch("http://localhost:8000/" + prodId + "/" + locale + ".json")
        .then((response) => response.json())
        .then((data) => {
          whenDone(data);
          let bla = D.getDisplayProducts(self.state.currentLocale);
          self.setState({
            products: bla,
          });
          self.setState({
            locales: D.getAvailableLocales(),
          });
          // this.setState({
          //   currentLocale: this.state.currentLocale,
          //   products: D.getDisplayProducts(),
          //   locales: D.getAvailableLocales(),
          // });
          // console.log(this.backendData);
          // c++;
          // if (c > 100) {
          //   throw new Error();
          // }
        });
    };

    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((data) => {
        D.setProductData(data, productI18nGetter);
        localStorage.setItem("items", JSON.stringify(data));
      });
  }

  render() {
    return (
      <>
        <div>
          <div>{JSON.stringify(this.state)}</div>
          {this.state.products.map((prod) => {
            return (
              <p key={prod.id}>
                {prod.id} {prod.price}
              </p>
            );
          })}
        </div>
        <ul>
          {this.state.locales.map((locale) => {
            // console.log(locale);
            return <li key={locale}>{locale}</li>;
          })}
        </ul>
      </>
    );
  }
}
