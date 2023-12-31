import { Component } from "react";
import { D } from "../data";

import "../App.css";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      locales: [],
    };
  }

  componentDidMount() {
    let self = this;
    let productI18nGetter = function (locale, prodId, whenDone) {
      fetch("http://localhost:8000/" + prodId + "/" + locale + ".json")
        .then((response) => response.json())
        .then((data) => {
          whenDone(data);
          let bla = D.getDisplayProducts(self.props.currentLocale);
          self.setState({
            products: bla,
          });
          self.setState({
            locales: D.getAvailableLocales(),
          });
          self.props.updateAvailableLocales(self.state.locales);
        });
    };

    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((data) => {
        D.setProductData(data, productI18nGetter);
        localStorage.setItem("items", JSON.stringify(data));
      });
  }

  componentDidUpdate(prevProps) {
    const {} = this.props;
    if (prevProps.currentLocale != this.props.currentLocale) {
      let bla = D.getDisplayProducts(this.props.currentLocale);
      this.setState({
        products: bla,
      });
    }
  }

  render() {
    function handleSubmit() {}

    return (
      <>
        <div>
          {this.state.products.map((prod, id) => {
            return (
              <div className="products" onClick={handleSubmit} key={id}>
                {prod.name}
              </div>
            );
          })}
        </div>
        {/* <ul>
          {this.state.locales.map((locale) => {
            return <li key={locale}>{locale}</li>;
          })}
        </ul> */}
      </>
    );
  }
}
