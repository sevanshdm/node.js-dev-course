                // set's user as the default value for name.
const greeter = (name = 'User', age) => {
    console.log('Hello ' + name + age)
}

greeter('Shrek')

greeter()