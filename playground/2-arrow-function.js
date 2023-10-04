// const square = function (x) {
//     return x * x
// }

// const square = (x) => {
//     return x * x
// }

// const square = (x) => x * x 

// console.log(square(3))

const specialEvent = {
    name: 'Birthday Party',
    guestList: ['Shrek', 'Donkey', 'Gingy'],
    printGuestList() { // Shorthand for methods. instead of "printGuestList: function ()""
        console.log(`Guest list for ${this.name}`)
        this.guestList.forEach((guest) => {
            console.log(`${guest} is attending the ${this.name}`) // Arrow functions don't bind their own .this values.
        })
    }
}
specialEvent.printGuestList()