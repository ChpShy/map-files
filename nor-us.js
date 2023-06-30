const fs = require("fs");
const { data } = require("./us-geocode.js");
const {features} = require("./us.json");

features.forEach((item) => {
  const {properties} = item;
  const { name } = properties;
  const state = data.find((d) => d[0] === name);
  properties.geoCode = state[1];
})

const newJson = {
  type: "FeatureCollection",
  features
}

fs.writeFile("./us-geo.json", JSON.stringify(newJson), () => {
  console.log("写入成功");
});