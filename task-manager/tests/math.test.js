   // Destructure the object to grab the individual functions as variables.
const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math') // exports from this file are in an object.

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

// Why test?
//
// - Saves time.
// - Creates reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind