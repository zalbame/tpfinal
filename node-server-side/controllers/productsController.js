productsService = require('../services/productsSevice')
let self = {}

//le pega a la api a traves del service para obtener la descripcion
self.description = (req, res) => {
  productsService.searching(id).then(function(product){
    productsService.description(id).then(function(description){
      product.description = description
      const productNew = productsService.product(product)
      return res.json(productNew)
    })
  }).catch(function(err) {
    console.log(err)
  })
}

module.exports = self


