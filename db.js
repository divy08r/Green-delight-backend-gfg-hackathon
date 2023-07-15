require('dotenv').config({ path: '.env' });
const database = process.env.DATABASE;
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
main().catch(err => console.log(err));

async function main() {
  
  await mongoose.connect(database);
  console.log("Connected to mongoose");
  const fetched_data = await mongoose.connection.db.collection("fooditems");

  fetched_data.find({}).toArray(async function (err, data) {
    const foodcategory = await mongoose.connection.db.collection("foodcategories");

    foodcategory.find({}).toArray(async function (err, catdata) {


      const farmer = await mongoose.connection.db.collection("farmerdetails");

      farmer.find({}).toArray(function (err, farmerdata) {
        if (err) console.log(err);
        else {
          global.food_items = data;
          global.foodcategory = catdata;
          global.farmer = farmerdata;        
        }
      })
    })
  })
}
module.exports = main;