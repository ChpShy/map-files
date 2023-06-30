const fs = require("fs");
const { info } = require("./countryInfo.js") ;
const {features} = require("./world.json");

const data = info.split("	");


const result = [];
for(var i=0,len=data.length;i<len;i+=18){
  result.push(data.slice(i,i+18).map(val => val.replace('\n', '')));
}

features.forEach((item) => {
  const {properties} = item;
  const {iso2} = properties;
  const country = result.find((res) => {
    return res[0] === iso2;
  })
  if(country){
    properties.iso3 = country[1];
    properties.isoCode = country[2];
    properties.geoCode = country[16];
  }
})

const newWorld = {
  type: "FeatureCollection",
  features
}

fs.writeFile("./final/world.json", JSON.stringify(newWorld), () => {
  console.log("写入成功");
});