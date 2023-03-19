let animals = ['Cat', 'Dog', 'Bird']

animals.forEach( function(animal, index){
    console.log(animal, index)
})

// Cat 0
// Dog 1
// Bird 2

// => can be used to replace function and get the same outpu:
animals.forEach( (animal, index) => {
    console.log(animal, index)
})

//additonally if you only have one line of code curly braces can be omitted
animals.forEach ( (animal, index) => console.log(animal, index) )
animals.forEach (animal => console.log(animal)) // can also lose a set of () if only one argument is being called