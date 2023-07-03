const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
          productName: {
                    required: true,
                    type: String
          },
          description: {
                    required: true,
                    type: String,

          },
          brand: {
                    required: true,
                    type: String,

          },
          price: {
                    required: true,
                    type: Number,

          },
          isFav: {
                    required: true,
                    type: String,

          },

          image: {
                    required: true,
                    type: String
          }

});

module.exports = mongoose.model("Products", productsSchema)