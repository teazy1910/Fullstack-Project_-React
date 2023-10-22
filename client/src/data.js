// import { useState, useEffect } from "react";

class Data {
  products;
  locales;
  productI18n;
  displayProducts;

  constructor() {
    this.products = {};
    this.locales = [];
    this.displayProducts = {};
    this.productI18n = {};
  }

  setProductData(data, productI18nGetter) {
    this.products = data.products;
    this.locales = data.locales;

    this.fetchProductsI18n(productI18nGetter);
  }

  fetchProductsI18n(productI18nGetter) {
    for (let i = 0; i < this.locales.length; i++) {
      let locale = this.locales[i];
      Object.keys(this.products).forEach((prodId) => {
        console.log(locale, prodId);
        productI18nGetter(locale, prodId, (data) =>
          this.setProductI18n(locale, prodId, data)
        );
        // let prod = this.products[prodId];
        // let displayProduct = {
        //     id: prodId,
        //     name:
        // };
      });
    }
  }

  setProductI18n(locale, prodId, i18nData) {
    if (this.productI18n[locale] === undefined) {
      this.productI18n[locale] = {};
    }
    this.productI18n[locale][prodId] = i18nData;

    if (this.displayProducts[locale] === undefined) {
      this.displayProducts[locale] = {};
    }

    let features = {};
    Object.keys(this.products[prodId].features).forEach((featureId) => {
      features[featureId] = {
        values: this.products[prodId].features[featureId],
        name: i18nData.features[featureId],
      };
    });

    this.displayProducts[locale][prodId] = {
      id: prodId,
      name: i18nData.name,
      allergens: i18nData.allergens,
      price: this.products[prodId].price,
      features: features,
    };
    console.log(
      prodId,
      locale + " setProduct",
      this.displayProducts[locale][prodId]
    );
  }

  getDisplayProducts(locale) {
    console.log(this.displayProducts[locale], "aaa");
    let result = [];
    Object.keys(this.displayProducts[locale]).forEach((prodId) => {
      result.push(this.displayProducts[locale][prodId]);
    });
    console.log(result, "bb");
    return result;
  }

  getAvailableLocales() {
    console.log(Object.keys(this.displayProducts));
    return Object.keys(this.displayProducts);
  }
}
let D = new Data();
export { D };
