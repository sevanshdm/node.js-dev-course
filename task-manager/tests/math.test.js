   // Destructure the object to grab the individual functions as variables.
const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math') // exports from this file are in an object.

test('Should calculate total with tip', ()=>{
    const total = calculateTip(10, .3)
    
    expect(total).toBe(13)
})

test('Should calculate total with default tip', ()=>{
    const total = calculateTip(10)

    expect(total).toBe(11.5)
})

test('Should convert 32 F to 0 C', ()=>{
    const temp = fahrenheitToCelsius(32)

    expect(temp).toBe(0)
})

test('Should convert 0 C to 32 F', ()=>{
    const temp = celsiusToFahrenheit(0)

    expect(temp).toBe(32)
})

                    // This tells jest that this function contains async code. 
// test('Async test demo', (done)=>{ // Done is called after everything is complete.
//     setTimeout(()=>{
//         try{
//             expect(1).toBe(2)
//             done()
//         }catch(e){
//             done(e)
//         }
//     },2000)
// })

test('Should add two numbers', (done)=>{
    add(2,3).then((sum)=>{
        try{
            expect(sum).toBe(5)
            done()
        }catch(e){
            done(e)
        }
    })
})

test('Should add two number async/await', async()=>{
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})

// Why test?
//
// - Saves time.
// - Creates reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind