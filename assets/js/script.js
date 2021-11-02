//global vars here
let outputField = $('.output-field')
let iconImage = ''
let searchHistoryField = $('#search-history')
let badJson = true


// Shopping list vars 
let listName
let listItem

//input button for cocktails
$('#cocktail-input-button').click(function (event) {
    if ($('#cocktail-input').val()) {
        event.preventDefault()
        console.log('cocktail button clicked')
        outputField.text('')
        getCocktail() //runs cocktail function
        cocktailHistory() //adds search to local history /search history
        $('#cocktail-input').val('') //clears search field
    }
})

//enter key press event
$(document).keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        if ($('#cocktail-input').val()) { //acts like button click for cocktail search
            event.preventDefault()
            outputField.text('')
            getCocktail()
            cocktailHistory()
            $('#cocktail-input').val('')
        } else if ($('#ingredient-input').val()) { //acts like button click for ingredient search
            event.preventDefault()
            outputField.text('')
            getIngredient()
            ingredientHistory()
            $('#ingredient-input').val('')
        }

    }
})

//input button for ingredients
$('#ingredient-input-button').click(function (event) {
    event.preventDefault()
    console.log('ingredient button clicked')
    outputField.text('')
    getIngredient() //runs ingredient function
    ingredientHistory() //adds search to local history / search history
    $('#ingredient-input').val('') //clears search field
})

//click event to get recipes from ingredient cards
outputField.on('click', '.cocktail-link', function () {
    document.getElementById("cocktail-input").value = $(this).text()
    outputField.text('')
    getCocktail() //runs cocktail function
    cocktailHistory() //adds search to local history / search history
    $('#cocktail-input').val('') //clears search field

})

//click event to get recipes from ingredient cards & search history
searchHistoryField.on('click', '.cocktail-link', function () {
    document.getElementById("cocktail-input").value = $(this).text() //sets cocktail input to search
    outputField.text('')
    getCocktail() //runs cocktail function
    $('#cocktail-input').val('')

})

//click event to put ingredients from search history onto page
searchHistoryField.on('click', '.ingredient-link', function () {
    document.getElementById("ingredient-input").value = $(this).text() //sets ingredient input to search
    outputField.text('')
    getIngredient() //runs ingredient function
    $('#ingredient-input').val('')

})

async function fetchImg(recipeCard) { //function to create an icon from a pixabay image

    var pixabayUrl = "https://pixabay.com/api/?q=" + iconImage + "&key=23999957-6f13ba77eee3721df01fe7a9f"
    await fetch(pixabayUrl) //fetch request for pixabay sticker
        .then(response => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 404) { //404 error catch
                console.log('Error: 404. Image URL not found' + response.status)
                return Promise.reject('error 404')
            } else {
                console.log('Error' + response.status) //other error catch
                return Promise.reject('error: ' + response.status)
            }
        })
        .then(data => {
            var randomNum = Math.floor(Math.random() * 20).toString() //random num to pick out of 20 pixabay stickers
            var pixabayImage = data.hits[randomNum].webformatURL //target a random pixabay sticker
            var hits = data.hits[0]

            var pixabayElement = $('<img>') //creates pixabay html element

            $(pixabayElement).attr('src', pixabayImage) //applies random pixabay sticker to pixabay html 
            $(pixabayElement).css('height', '50px')
            $(pixabayElement).css('width', '50px')
            $(pixabayElement).css('border-radius', '50%')

            recipeCard.prepend(pixabayElement)

            return pixabayElement
        })
}

//call & display function for cocktails
function getCocktail() {
    iconImage = $('#cocktail-input').val()
    let cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $('#cocktail-input').val()
    fetch(cocktailUrl)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 404) { //error catches here
                return Promise.reject('error 404')
            } else {
                return Promise.reject('some other error: ' + response.status)
            }
        })
        .then(data => {


            if (data.drinks === null) { //creates 'not found' message if no cocktail is found
                let nullCard = $('<div>')
                nullCard.addClass('card')
                nullCard.text("Sorry, we don't have any recipes for that drink!")
                outputField.append(nullCard)
            } else {
                for (i = 0; i < data.drinks.length; i++) {
                    let cocktailName = data.drinks[i].strDrink //creates cocktail data
                    let cocktailInstructions = data.drinks[i].strInstructions
                    let cocktailImage = data.drinks[i].strDrinkThumb

                    let cocktailNameElement = $('<h5>') //creates cocktail HTML elements
                    let cocktailInstructionsElement = $('<p>')
                    let cocktailImageElement = $('<img>')
                    let recipeCard = $('<div>')


                    recipeCard.addClass('card') //creates recipe card


                    cocktailNameElement.text(cocktailName) //populates HTML elements with data
                    cocktailInstructionsElement.text('Instructions: ' + cocktailInstructions)
                    cocktailImageElement.attr('src', cocktailImage)

                    cocktailImageElement.css('height', '200px') //styles image element

                    fetchImg(recipeCard) //calls 


                    recipeCard.append(cocktailNameElement)

                    for (x = 1; x <= 15; x++) {
                        let cocktailIngredient = data.drinks[i]['strIngredient' + x.toString()]
                        let cocktailMeasurement = data.drinks[i]['strMeasure' + x.toString()]

                        let shoppingButton = $('<button>')
                        cocktailIngredientElement = $('<p>')

                        cocktailIngredientElement.text(cocktailIngredient)
                        shoppingButton.addClass('btn waves-effect waves-light btn-small deep-orange lighten-1 inline')
                        $(shoppingButton).attr('cocktail', cocktailName)
                        $(shoppingButton).attr('ingredient', cocktailIngredient + ": " + cocktailMeasurement)
                        shoppingButton.text('Add to Shopping List')

                        if (cocktailMeasurement) {
                            cocktailIngredientElement.text(cocktailIngredient + ": " + cocktailMeasurement)
                            recipeCard.append(cocktailIngredientElement, shoppingButton)
                        }
                        recipeCard.append(cocktailInstructionsElement, cocktailImageElement)
                        outputField.append(recipeCard)

                        // Click Event to write to shopping list
                        shoppingButton.on('click', function () {

                            // Update shopping list global vars
                            listName = $(this).attr('cocktail')
                            listItem = $(this).attr('ingredient')

                            shoppingList()

                        })

                    }

                }
            }
        })


}

//call & display function for ingredients
function getIngredient() {
    let ingredientUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + $('#ingredient-input').val()
    fetch(ingredientUrl)
        .then(response => {
            console.log(response)

            if (response.ok) {
                try {
                    return response.json()

                } catch (error) {
                    let errorMessage = 'Sorry, there is no recipe for that ingredient!'
                    let errorCard = $('<div>')

                    errorCard.addClass('card')
                    errorCard.text(errorMessage)
                    outputField.append(errorCard)
                }

            }

        })
        .then(data => {
            badJson = false
            if (data.drinks.length < 1) {
                let nullCard = $('<div>')
                nullCard.addClass('card')
                nullCard.text("Sorry, we don't have any recipes for ingredient!")
                outputField.append(nullCard)

            } else {
                for (i = 0; i < data.drinks.length; i++) {
                    let cocktailName = data.drinks[i].strDrink
                    let cocktailImage = data.drinks[i].strDrinkThumb

                    let cocktailNameElement = $('<h5>')
                    let clickMessage = $('<p>')
                    let cocktailImageElement = $('<img>')
                    let recipeCard = $('<div>')


                    cocktailNameElement.text(cocktailName)
                    clickMessage.text('Click Name For Recipe!')
                    cocktailNameElement.addClass('cocktail-link')
                    cocktailImageElement.attr('src', cocktailImage)
                    cocktailImageElement.css('height', '200px')
                    recipeCard.addClass('card')

                    fetchImg(recipeCard)

                    recipeCard.append(cocktailNameElement)

                    for (x = 1; x <= 15; x++) {
                        let cocktailIngredient = data.drinks[i]['strIngredient' + x.toString()]
                        let cocktailMeasurement = data.drinks[i]['strMeasure' + x.toString()]
                        cocktailIngredientElement = $('<p>')
                        cocktailIngredientElement.text(cocktailIngredient)

                        if (cocktailMeasurement != null) {
                            cocktailIngredientElement.text(cocktailIngredient + ": " + cocktailMeasurement)
                            recipeCard.append(cocktailIngredientElement)
                        }
                    }

                    recipeCard.append(clickMessage, cocktailNameElement, cocktailImageElement)
                    outputField.append(recipeCard)
                }
            }

        })
    setTimeout(fixBadJson, 1000)
    badJson = true


    console.log(ingredientUrl)
}

//this function capitalizes words. needs to be updated to do each word in a title (probably with .split() and a for loop to iterate through each word and .toUpperCase() it, then .join() it back together)
function capitalize(word) {
    let lower = word.toLowerCase()
    return word.charAt(0).toUpperCase() + lower.slice(1)
}

function init() {
    let initSearch = JSON.parse(localStorage.getItem('initSearch'))
    let initIngredient = JSON.parse(localStorage.getItem('initIngredient'))

    if (initSearch) {
        $('#cocktail-input').val(initSearch)
        outputField.text('')
        getCocktail()
        cocktailHistory()
        $('#cocktail-input').val('')
    } else if (initIngredient) {
        $('#ingredient-input').val(initIngredient)
        outputField.text('')
        getIngredient()
        ingredientHistory()
        $('#ingredient-input').val('')
    }
}

// Cocktail search history
function cocktailHistory() {

    // local varaiables
    let uInput = $('#cocktail-input').val()

    // Check for existing local storage object and create if none.
    if (!localStorage.getItem('cocktailObject')) {

        localStorage.setItem('cocktailObject', [JSON.stringify({ cocktailSearch: [] })])

    }

    // Pull search history into tempObject
    let tempObject = JSON.parse(localStorage.getItem('cocktailObject'))

    // Condition to check for duplicate entries (disabled for time being)
    // for (let z = 0; z < tempObject.cocktailSearch.length; z++) {

    //     let value = tempObject.cocktailSearch[z]

    //     if (value === uInput) {

    //         return
    //     }
    // }

    // Inject user input into tempObject
    tempObject.cocktailSearch.push($('#cocktail-input').val())

    // Write tempObject back to storage
    localStorage.setItem('cocktailObject', [JSON.stringify({ cocktailSearch: tempObject.cocktailSearch })])

    // Create and define search history elements
    let cocktailHistoryItem = capitalize($('#cocktail-input').val())
    let cocktailHistoryElement = $('<h5>')
    let cocktailHistoryCard = $('<div>')
    cocktailHistoryCard.addClass('card')
    cocktailHistoryCard.css('text-align', 'center')
    cocktailHistoryCard.addClass('col')
    cocktailHistoryCard.addClass('s12')
    cocktailHistoryElement.addClass('cocktail-link')
    cocktailHistoryElement.text(cocktailHistoryItem)

    //Append search history to page 
    cocktailHistoryCard.append(cocktailHistoryElement)
    searchHistoryField.prepend(cocktailHistoryCard)
}

// Ingredient search history
function ingredientHistory() {

    // local varaiables
    let uInput = $('#ingredient-input').val()

    // Check for existing local storage object and create if none.
    if (!localStorage.getItem('ingredientObject')) {

        localStorage.setItem('ingredientObject', [JSON.stringify({ ingredientSearch: [] })])

    }

    // Pull search history into tempObject
    let tempObject = JSON.parse(localStorage.getItem('ingredientObject'))

    // Condition to check for duplicate entries (Disabled for time being)
    // for (let z = 0; z < tempObject.ingredientSearch.length; z++) {

    //     let value = tempObject.ingredientSearch[z]

    //     if (value === uInput) {

    //         return
    //     }
    // }

    // Inject user input into tempObject
    tempObject.ingredientSearch.push($('#ingredient-input').val())

    // Write tempObject back to storage
    localStorage.setItem('ingredientObject', [JSON.stringify({ ingredientSearch: tempObject.ingredientSearch })])

    // Create and define search history page elements
    let ingredientHistoryItem = capitalize($('#ingredient-input').val())
    let ingredientHistoryElement = $('<h5>')
    let ingredientHistoryCard = $('<div>')
    ingredientHistoryCard.addClass('card')
    ingredientHistoryCard.css('text-align', 'center')
    ingredientHistoryCard.addClass('col')
    ingredientHistoryCard.addClass('s12')
    ingredientHistoryElement.addClass('ingredient-link')

    // Append search history to page
    ingredientHistoryElement.text(ingredientHistoryItem)
    ingredientHistoryCard.append(ingredientHistoryElement)
    searchHistoryField.prepend(ingredientHistoryCard)

}

// Shopping list
function shoppingList() {

    // Local arrays
    let cart = [
        {
            cocktailName: [listName],
            ingredientName: [listItem],
        }
    ]

    // Local arrays
    let tempObject = []
    let newObject = []

    // Local Vars 
    let currentIngredients

    checkObject = localStorage.getItem('shoppingListObject')

    // Stores first cocktail entry into local storage
    if (!localStorage.getItem('shoppingListObject', 'ingredientName')) {


        // Define key name & stringify tempObject then place into local storage
        localStorage.setItem('shoppingListObject', [JSON.stringify(cart)]

        )
        return
    }

    // Stores additional entries into local storage
    tempObject = JSON.parse(localStorage.getItem('shoppingListObject'))
    console.log(tempObject)

  
    // Check for duplicate ingredeint
    for (let x in tempObject[0].ingredientName) {

        //Inject current ingredients into newObject array
        currentIngredients = JSON.stringify(tempObject[0].ingredientName[x]).replace(/^"(.+(?="$))"$/, '$1')
        newObject.push(currentIngredients)
        x++
    }

    // Inject new ingredient
    newObject.push(listItem)

    // Push object back into local storage
    tempObject[0].ingredientName = newObject
    localStorage.setItem('shoppingListObject', [JSON.stringify(tempObject)])

}

init()

function fixBadJson() {
    if (badJson) {
        let errorMessage = 'Sorry, there is no recipe for that ingredient!'
        let errorCard = $('<div>')

        errorCard.addClass('card')
        errorCard.text(errorMessage)
        outputField.append(errorCard)

    }
}
