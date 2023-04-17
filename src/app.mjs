//const http = require('http')
import http from 'http'
//const express = require('express')
import express, { json } from 'express'

//const ProductManager = require('./ProductManager.js');

import ProductManager from './ProductManager.mjs'
import { resolve } from 'path';
import { rejects } from 'assert';
//const { ProductManager } = require('./ProductManager.mjs')

const productManager = new ProductManager();

const server = http.createServer((request, response) => {
    console.log('Alguien me hizo una request')
    response.end('Hola ')
})

const app = express();


let getProducts = () => {
    new Promise ((resolve, reject) => {
        
    }) 
}

app.get('/products', (request, response) => {
    console.log("Request")
    //productManager.getProducts().then((file) => console.log(file))
    
    //productManager.getProducts().then((file) => JSON.parse(file))
    
    
    const limit = request.query.limit
    
    let output = ''
    
    productManager.getProducts().then(async function (file){

        let products = JSON.parse(file)
        let out = ''
        if(limit === undefined || limit == 0){
            products.forEach(product => {
                out += '<li>' + product.id +'</br> '+ product.title +'</br>' + product.description +'</br> ' + product.price +'</br>' + product.thumbnail + '</br>'+ product.code +'</br>'+ product.stock +'</li>'
            })
            
           console.log('Successful')
           return response.status(200).end('<h1 style = "color: blue">' + out + ' <h1/>')
           
        }else{
            
            //productManager.getProducts().then(async function(file) {
                //let products =  JSON.parse(file)
                //let out = ''

            if(products.length >= limit ){
                for(let i = 0; i < limit; i++){
                    out += '<li>' + products[i].id +'</br> '+ products[i].title +'</br>' + products[i].description +'</br> ' + products[i].price +'</br>' + products[i].thumbnail + '</br>'+ products[i].code +'</br>'+ products[i].stock +'</li>'
                }
                
                console.log('Successful response with: '+ limit + ' values')
                return response.status(200).end('<h1 style = "color: blue">' + out + ' <h1/>')

            }else{

                response.status(400).end('<h1 style = "color: red">' + limit + ' products do not exist<h1/>')
            }
            //})
        }
    })
    
})

app.get('/products/:pid', (request, response) => {

    console.log(request.params.pid)
    const id = +request.params.pid
    productManager.getProductById(id).then(async function(product){
        let out = '<li>' + product.id +'</br> '+ product.title +'</br>' + product.description +'</br> ' + product.price +'</br>' + product.thumbnail + '</br>'+ product.code +'</br>'+ product.stock +'</li>'
        return response.status(200).end('<h1 style = "color: blue">' + out + ' <h1/>')
    }).catch((err) => response.status(400).end('<h1 style = "color: red">' + err + ' <h1/>'))

})
    
    
app.listen(8080, () => console.log('Server Up'))