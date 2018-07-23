const restler = require('restler') //integración de Restler
let self = {}

//trae los items de la api y &limit=4 para que muestre sólo 4 productos
self.apiData = (query) => {
  const getApiData = new Promise(
    (resolve, reject) => {
      restler.get('https://api.mercadolibre.com/sites/MLA/search?q=' + query + '&limit=4').on('complete', (result) => {
        resolve(result)
      }).on('fail', (err) => {
        reject(err)
      })
    }
  )
  return getApiData
}

//organización de la informacion de la api
self.result = function(data){
  let newResult = {}
  let categories = []
  let items = []

  newResult['author'] = {
    name: 'Melisa',
    lastname: 'Zalba'
  }

  //armado de las categorias
  if ( data.filters.length > 0) {
    let category = data.filters[0].values[0].path_from_root
    for (let i = 0; i < category.length; i++) {
      categories.push(category[i].name)
    }
  }else{
    let filters = data.available_filters[0].values
    let maxObj = {
      name: '',
      results: 0
    }
    for (let i = 0; i< filters.length; i++) {
      if (maxObj.results < filters[i].results) {
        maxObj = {
          name: filters[i].name,
          results: filters[i].results
        }
      }
    }
    categories.push(maxObj.name) 
  }
  newResult['categories'] = categories

  //armado de los items
  let results = data.results
  let amount 
  let decimals 
  for (let i = 0; i < results.length; i++) {

    let price = results[i].price.toString() 

    //armado de numero entero (precio)
    if (price.indexOf('.') > -1) {
      amount = parseInt(price.slice(0, price.indexOf('.')))
    } else {
      amount = parseInt(price)
    }

    //armado del decimal (precio)
    if (price.indexOf('.') > -1) {
      decimals = parseInt(price.slice(price.indexOf('.')+1))
    } else {
      decimals = 0
    }
    
    items.push({id: results[i].id,
                title: results[i].title,
                price: {currency: results[i].currency_id,
                        amount: amount,
                        decimals: decimals},
                picture: results[i].thumbnail,
                condition: results[i].condition,
                free_shipping: results[i].shipping.free_shipping})
  }

  newResult['items'] = items
  
  return newResult
}

module.exports = self
