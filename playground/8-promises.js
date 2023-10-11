// promises are typically created by the libraries you use, it's rare to create one.
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([7, 4, 1])
        reject('Things went wrong.')
    }, 2000)
})
        // .then allows you register a function to run when things go well.
doWorkPromise.then((result) => {
    console.log('Success', result)
}).catch((error) => { // this registers a function to run when reject is called.
    console.log('Error', error)
}) 

//                                fullfilled
//                              /
// Promise      -- pending -->
//                              \
//                                rejected
