var _products = ["Widget", "Gadget", "Doohickey"];
var _colors = ["Black", "White", "Red", "Grenn", "Blue"];
var _someCountries = ["Japan", "Korea", "US", "Italy", "Greece"];

// function _getSomeCountries() {
//   return this._someCountries;
// }
// function _getProducts() {
//   return this._products;
// }
// function _getColors() {
//   return this._colors;
// }
export function getData(count) {
  var data = [];
  var dt = new Date();
  for (let i = 0; i < count; i++) {
    var date = new Date(
        dt.getFullYear(),
        i % 12,
        Math.round(Math.random() * 28)
      ),
      countryId = Math.floor(Math.random() * _someCountries.length),
      productId = Math.floor(Math.random() * _products.length),
      colorId = Math.floor(Math.random() * _colors.length);
    var item = {
      id: i,
      start: date,
      end: new Date(
        date.getTime() + Math.random() * 30 * (24 * 60 * 60 * 1000)
      ),
      country: _someCountries[countryId],
      product: _products[productId],
      color: _products[colorId],
      countryId: countryId,
      productId: productId,
      colorId: colorId,
      amount1: Math.random() * 10000 - 5000,
      amount2: Math.random() * 10000 - 5000,
      discount: Math.random() / 4,
      active: i % 4 === 0,
    };
    data.push(item);
  }
  return data;
}
