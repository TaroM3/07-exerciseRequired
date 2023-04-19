//const http = require('http')
import http from 'http'
//const express = require('express')
import express, { json } from 'express'

//const ProductManager = require('./ProductManager.js');

import ProductManager from './ProductManager.mjs'

//const { ProductManager } = require('./ProductManager.mjs')


const productManager = new ProductManager();


const server = http.createServer((request, response) => {
    console.log('Alguien me hizo una request')
    response.end('Hola ')
})

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/products', (request, response) => {
    console.log("Request")
    //productManager.getProducts().then((file) => console.log(file))
    
    //productManager.getProducts().then((file) => JSON.parse(file))
    
    
    const limit = request.query.limit
    
    let output = ''

    let products = productManager.getProducts() 
    //console.log(products)
    if(products.length >= 1){
    if(limit === undefined || limit == 0){

        //products.forEach(product => )
        for(let i = 0; i < products.length; i++){

            output += '<li>' + products[i].id +'</br> '+ products[i].title +'</br>' + products[i].description +'</br> ' + products[i].price +'</br>' + products[i].thumbnail + '</br>'+ products[i].code +'</br>'+ products[i].stock +'</li>'

        }
            
           console.log('Successful')
           response.status(200).end('<h1 style = "color: blue">' + output + ' <h1/>')
           
     }else{
            

        if(products.length >= limit ){
            for(let i = 0; i < limit; i++){
                    output += '<li>' + products[i].id +'</br> '+ products[i].title +'</br>' + products[i].description +'</br> ' + products[i].price +'</br>' + products[i].thumbnail + '</br>'+ products[i].code +'</br>'+ products[i].stock +'</li>'
            }
                
            console.log('Successful response with: '+ limit + ' values')
            response.status(200).end('<h1 style = "color: blue">' + output + ' <h1/>')

        }else{

            response.status(400).end('<h1 style = "color: red">' + limit + ' products do not exist<h1/>')
        }
            //})
        }
    }
    
    
})

app.get('/products/:pid', (request, response) => {

    console.log(request.params.pid)
    const id = +request.params.pid
    let product =  productManager.getProductById(id)
    if(typeof product === 'object'){
        let out = '<li>' + product.id +'</br> '+ product.title +'</br>' + product.description +'</br> ' + product.price +'</br>' + product.thumbnail + '</br>'+ product.code +'</br>'+ product.stock +'</li>'
        
        response.status(200).end('<h1 style = "color: blue">' + out + ' <h1/>')
    }else{
        response.status(400).end(product)
    }
    //response.status(400).end(product)
    //console.log(product)
     //response.status(400).end('<h1 style = "color: red">' + product + ' <h1/>')

})
    
    
app.listen(8080, () => console.log('Server Up'))