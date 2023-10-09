// Object property shorthand

const firstName = 'Shrek'
const userAge = 27

// Before shorthand 

// const user = {
//     firstName: firstName,
//     age: userAge,
//     location: "Philadelphia"
// }

// After shorthand
const user = {
    firstName,
    age: userAge,
    location: "Philadelphia"
}

console.log(user)

// Object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// Old way to create vars from object properties (Before Destructuring)
// const label = product.label
// const stock = product.stock

// New way to create vars from object properties (Object Destructuring)
// const {label:productLabel, stock, rating = 5} = product
//Creates product Label var       //This creates a property in the object and a variable for it. 
// console.log(stock)
// console.log(rating)
// console.log(productLabel)

                        // Destructuring of product object. The "=0" creates a default value of 0 incase no value is inputed.
const transaction = (type, { label, stock = 0 } = {}) => { // the "={}" creates an empty default value for the parameter if nothing is inputed when function is called.
    console.log(type, label, stock)
}
                    // If this spot is empty, the default values are used.
transaction('order', product)

