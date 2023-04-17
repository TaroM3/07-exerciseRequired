//const { r, update } = require("tar")
import tar from "tar"
//import tar from './node_modules/tar/index.js'
//const fs = require('fs')
import fs from "fs"
import { resolve } from "path"
//import { resolve } from "path"
//import { rejects } from "assert"
//import fs from './node_modules/fs/*'
//export default ProductManager 

export default class ProductManager {
    
    #products
    #path
    constructor (){
        this.#products = []
        this.#path = './products/products.json'
    }

    #generateID(){
        if(this.#products.length === 0) return 1
        return this.#products[this.#products.length - 1].id + 1 
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

      //  const id = this.#generateID()
        //const id = this.#generateID()
        //const product = { id, title, description, price, thumbnail, code, stock }

        //if( !title || !description || !price || !thumbnail || !code || !stock ){
        //    return console.log("Missing data!")}
            
        //if(this.#products.some((p) => {return p.code === code})){
        //    return console.log("This code has been registered")
        //}

        //this.#products.push(product)

        
        if(fs.existsSync(this.#path)){

            this.#products = JSON.parse(fs.readFileSync(this.#path), 'utf-8')
            //id = this.#generateID()
            let id = this.#generateID()
            let product = { id, title, description, price, thumbnail, code, stock }
                
            if( !title || !description || !price || !thumbnail || !code || !stock ){
                return console.log("Missing data!")}
                    
            if(this.#products.some((p) => {return p.code === code})){
                return console.log("This code has been registered")
            }

           this.#products.push(product)

            fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, '\t'))

        }else{
         

            let id = this.#generateID()
            let product = { id, title, description, price, thumbnail, code, stock }
            if( !title || !description || !price || !thumbnail || !code || !stock ){
                return console.log("Missing data!")
            }
            
            this.#products.push(product)    
            fs.writeFileSync(this.#path, JSON.stringify(this.#products), null, '\t')

        }        
    }

    //It deletes a product 
    deleteProduct = (id) => {
        if(fs.existsSync(this.#path)){
            
            this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))
            if(this.#products.length >= 1){
                
                if(this.#products.some((product) => { return product.id === id })){
                    let code = this.#products[this.#products.findIndex(product => product.id === id)].code            
                    this.#products.splice(this.#products.findIndex(product => product.id === id) , 1)
                    console.log("Product ("+ code +") has been deleted")

                    fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, '\t'))
                }else{
                    console.log('Id: '+ id +' does not exist')
                } 
            }else{
                console.log('Products do not exist')
            }

        }else{
            console.log('The path: '+ this.#path + ' has not been created')
        }

    }

    //It updates a product
    updateProduct = (id, field, value) => {

        if(fs.existsSync(this.#path)){

            this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))
            if(this.#products.length >= 1){
                
                if(this.#products.some((product) => product.id === id)){
                    let obj = Object.entries(this.#products[this.#products.findIndex(product => product.id === id)])
                    console.log(obj.findIndex(entry => entry[0] === field))
                    obj[obj.findIndex(entry => entry[0] === field)][1] = value

                    let productSelected = this.#products.findIndex(product => product.id === id) 
                    
                    obj[obj.findIndex(entry => entry[0] === field)][1] = value
                    this.#products[productSelected].title = obj[1][1]
                    this.#products[productSelected].description = obj[2][1]
                    this.#products[productSelected].price = obj[3][1]
                    this.#products[productSelected].thumbnail = obj[4][1]
                    this.#products[productSelected].code = obj [5][1]
                    this.#products[productSelected].stock = obj[6][1] 

                    console.log(obj[obj.findIndex(entry => entry[0] === field)][1])
                    console.log(this.#products[productSelected])

                    //this.#products[this.#products.findIndex(product => product.id === id), (keyToUpdate[0]).toString()] = value

                    fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, '\t'))

                }
            }else{
                console.log('Products do not exist')
            }
        }else{
            console.log('The path: '+ this.#path + ' has not been created')
        }

    }
    //It returns all the products 
    getProducts = () => {

        return new Promise((resolve, reject) => {
        
            if(fs.existsSync(this.#path)){
                console.log('Reading file...')
                //let products = fs.readFile(path, 'utf-8')
                this.#products = fs.readFileSync(this.#path, 'utf-8')
                return resolve(this.#products)
                
            }else{
                return reject('File not found')
            }
    
        })   

        /*
        if(fs.existsSync(this.#path)){
            this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))
            if(this.#products.length >= 1){
                return this.#products
            }
            
        }
        console.log('Products have not been created')
        return this.#products*/
    }

    /*readProducts = (path, type) => 
        new Promise((resolve, reject) => {
            fs.readFile(path, type, (err, file) =>{
                if(err) reject(err)
                resolve(file)
            })
        })

    }*/

    //It returns an specific product by the code  
    getProductById = (id) => {
        
        if(fs.existsSync(this.#path)){
        return new Promise((resolve, reject) => {

               
                this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))
    
                if(this.#products.some((product) => { return product.id === id })){
                    let product = this.#products[this.#products.findIndex(product => product.id === id)]
                    return resolve(product)
        
                }
                    return reject("Product does not exist")
                
                    
                })
            }
            return reject("The path: "+ this.#path + " has not been created") 
        }

    //Getters and Setters
    setTitle = (id, title) => {        
        //this.getProduct(code).title = title
        /*
        if(this.#products.some((p) => { return p.code === code })){            
            this.#products[this.#products.findIndex(p => p.code === code)].title = title
            console.log("Title has been updated")
        }*/
        this.updateProduct(id, 'title', title)
    }

    getTitle = (code) => {
        if(fs.existsSync(this.#path)){
           
            this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))

            if(this.#products.some((product) => { return product.code === code })){
                return this.#products[this.#products.findIndex(product => product.code === code)].title
            }
                return "Product has not found"
            
        }
        return "The path: "+ this.#path + " has not been created" 
    }

    setDescription = (id, description) => {
        /*if(this.#products.some((p) => { return p.code === code })){            
            this.#products[this.#products.findIndex(p => p.code === code)].description = description
            console.log("Description has been updated")
        }*/
        this.updateProduct(id, 'description', description)
        
    }
    getDescription = (code) => {

        if(fs.existsSync(this.#path)){
           
            this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))

            if(this.#products.some((product) => { return product.code === code })){
                return this.#products[this.#products.findIndex(product => product.code === code)].description
            }
                return "Product has not found"
            
        }
        return "The path: "+ this.#path + " has not been created" 
        /*if(this.#products.some((p) => { return p.code === code })){
            return this.#products[this.#products.findIndex(p => p.code === code)].description
        }
            return "Product has not found"*/
    }

    setPrice = (id, price) => {
        /*this.getProduct(code).title = title
        if(this.#products.some((p) => { return p.code === code })){            
            this.#products[this.#products.findIndex(p => p.code === code)].price = price
            console.log("Price has been updated")
        }*/
        this.updateProduct(id, 'price', price)
    }

    getPrice = (code) => {
        if(fs.existsSync(this.#path)){
           
            this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))

            if(this.#products.some((product) => { return product.code === code })){
                return this.#products[this.#products.findIndex(product => product.code === code)].price
            }
                return "Product has not found"
            
        }
        return "The path: "+ this.#path + " has not been created" 
    }

    setThumbnail = (id, thumbnail) => {
        /*this.getProduct(code).title = title
        if(this.#products.some((p) => { return p.code === code })){            
            this.#products[this.#products.findIndex(p => p.code === code)].thumbnail = thumbnail
            console.log("Thumbnail has been updated")
        }*/
        this.updateProduct(id,'thumbnail', thumbnail)
    }

    getThumbnail = (code) => {
        if(fs.existsSync(this.#path)){
           
            this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))

            if(this.#products.some((product) => { return product.code === code })){
                return this.#products[this.#products.findIndex(product => product.code === code)].thumbnail
            }
                return "Product has not found"
            
        }
        return "The path: "+ this.#path + " has not been created" 
    }

    setStock = (id, stock) => {
        /*this.getProduct(code).title = title
        if(this.#products.some((p) => { return p.code === code })){            
            this.#products[this.#products.findIndex(p => p.code === code)].stock = stock
            console.log("Stock has been updated")
        }*/
        this.updateProduct(id, 'stock', stock )
    }

    getStock = (code) => {
        if(fs.existsSync(this.#path)){
           
            this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))

            if(this.#products.some((product) => { return product.code === code })){
                return this.#products[this.#products.findIndex(product => product.code === code)].stock
            }
                return "Product has not found"
            
        }
        return "The path: "+ this.#path + " has not been created" 
    }



}

//let manager = new ProductManager()

//manager.addProduct('T-shirt', 'Black', '500', './thumbnails/thumbnail1.png', '2400', '50')
//manager.addProduct('T-shirt', 'White', '700', './thumbnails/thumbnail2.png', '2401', '80')
//console.log(manager.getProductById(3))
//console.log(manager.getProducts())
//manager.deleteProduct(4)
//console.log(manager.getProducts())
//manager.updateProduct(2, 'price', '50')
//manager.updateProduct(1, 'stock', '100')
//console.log(manager.getProducts())
//manager.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin Imagen', 'adbc123', 25)
//console.log(manager.getProducts())
//manager.updateProduct(1, 'stock', 50)
//manager.setPrice(1, 1000)
//manager.deleteProduct(1)