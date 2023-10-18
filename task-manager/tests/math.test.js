   // Destructure the object to grab the individual functions as variables.
const { calculateTip } = require('../src/math') // exports from this file are in an object.

test('Should calculate total with tip', ()=>{
    const total = calculateTip(10, .3)
    
    expect(total).toBe(13)
})

test('Should calculate total with default tip', ()=>{
    const total = calculateTip(10)

    expect(total).toBe(11.5)
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