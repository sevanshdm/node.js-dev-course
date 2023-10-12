// promises are typically created by the libraries you use, it's rare to create one.
// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([7, 4, 1])
//         reject('Things went wrong.')
//     }, 2000)
// })
//         // .then allows you register a function to run when things go well.
// doWorkPromise.then((result) => {
//     console.log('Success', result)
// }).catch((error) => { // this registers a function to run when reject is called.
//     console.log('Error', error)
// }) 

const add = (a, b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a + b)
        }, 2000)
    })
}
 
// add(1, 2).then((sum)=>{
//     console.log(sum)
// }).catch((e)=> {
//     console.log(e)
// })

// Promise chaining
add(1, 1).then((sum)=>{
    console.log(sum)
    return add(sum, 4) // adds 4 to sum, it loops throught the add func again
}).then((sum2)=>{
    console.log(sum2)
}).catch((e)=>{
    console.log(e)
})

//                                fullfilled
//                              /
// Promise      -- pending -->
//                              \
//                                rejected
