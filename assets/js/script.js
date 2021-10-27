//global vars here
let outputField = $('.output-field')
let iconImage = ''
let searchHistoryField = $('#search-history')
async function fetchImg(recipeCard) {

    console.log($('#cocktail-input').val() + ' fetchimg cocktail input')
    var pixabayUrl = "https://pixabay.com/api/?q=" + iconImage + "&key=23999957-6f13ba77eee3721df01fe7a9f"
    await fetch(pixabayUrl) //fetch request for pixabay sticker
        .then(response => {
            if (response.ok) {
                console.log(pixabayUrl)
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
            var randomNum = Math.floor(Math.random() * 20).toString() //random num to pick out of 50 pixabay stickers
            console.log(randomNum)
            var pixabayImage = data.hits[randomNum].webformatURL //target a random pixabay sticker
            var hits = data.hits[0]
            console.log(pixabayImage)
            console.log(hits)

            var pixabayElement = $('<img>') //creates pixabay html element

            $(pixabayElement).attr('src', pixabayImage) //applies random pixabay sticker to pixabay html 
            $(pixabayElement).css('height', '50px')
            $(pixabayElement).css('width', '50px')
            $(pixabayElement).css('border-radius', '50%')



            recipeCard.prepend(pixabayElement) //this is a placeholder. how are we going to put this element on the page?
                // displaySpace.append(recipeCard)

            return pixabayElement //this is a placeholder. how are we going to put this element on the page?
        })
}

//input button for cocktails
$('#cocktail-input-button').click(function(event) {
    if ($('#cocktail-input').val()) {
        event.preventDefault()
        console.log('cocktail button clicked')
        outputField.text('')
        getCocktail()
        cocktailHistory()

        console.log(iconImage + ' : iconImage')
        $('#cocktail-input').val('')

    }
})

//enter key press event
$(document).keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        if ($('#cocktail-input').val()) {
            outputField.text('')
            getCocktail()
            cocktailHistory()
            $('#cocktail-input').val('')
        } else if ($('#ingredient-input').val()) {
            outputField.text('')
            getIngredient()
            ingredientHistory()
            $('#ingredient-input').val('')
        }

    }
})

//input button for ingredients
$('#ingredient-input-button').click(function(event) {
    event.preventDefault()
    console.log('ingredient button clicked')
    // $("#ingredient-input").value = $(this).text()
    outputField.text('')
    getIngredient()
    ingredientHistory()
    $('#ingredient-input').val('')
})

//click event to get recipes from ingredient cards
outputField.on('click', '.cocktail-link', function() {
    document.getElementById("cocktail-input").value = $(this).text()
    outputField.text('')
    getCocktail()
    cocktailHistory()
    $('#cocktail-input').val('')

})

//click event to get recipes from ingredient cards
searchHistoryField.on('click', '.cocktail-link', function() {
    document.getElementById("cocktail-input").value = $(this).text()
    outputField.text('')
    getCocktail()
    $('#cocktail-input').val('')

})

searchHistoryField.on('click', '.ingredient-link', function() {
    document.getElementById("ingredient-input").value = $(this).text()
    outputField.text('')
    getIngredient()
    $('#ingredient-input').val('')

})

//call & display function for cocktails
function getCocktail() {
    iconImage = $('#cocktail-input').val()
    let cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $('#cocktail-input').val()
    console.log($('#cocktail-input.val') + ' cocktail input for getcocktail')
    console.log(cocktailUrl)
    console.log(fetchImg())

    fetch(cocktailUrl)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 404) {
                return Promise.reject('error 404')
            } else {
                return Promise.reject('some other error: ' + response.status)
            }
        })
        .then(data => {
            console.log(data)

            if (data.drinks === null) {
                let nullCard = $('<div>')
                nullCard.addClass('card')
                nullCard.text("Sorry, we don't have any recipes for that drink!")
                outputField.append(nullCard)
            } else {
                for (i = 0; i < data.drinks.length; i++) {
                    let cocktailName = data.drinks[i].strDrink
                    let cocktailInstructions = data.drinks[i].strInstructions
                    let cocktailImage = data.drinks[i].strDrinkThumb

                    let cocktailNameElement = $('<h5>')
                    let cocktailInstructionsElement = $('<p>')
                    let cocktailImageElement = $('<img>')
                    let recipeCard = $('<div>')

                    recipeCard.addClass('card')
                    cocktailNameElement.text(cocktailName)
                    cocktailInstructionsElement.text('Instructions: ' + cocktailInstructions)
                    cocktailImageElement.attr('src', cocktailImage)
                    cocktailImageElement.css('height', '200px')

                    // recipeCard.addClass('card')

                    fetchImg(recipeCard)

                    recipeCard.append(cocktailNameElement)

                    for (x = 1; x <= 15; x++) {
                        let cocktailIngredient = data.drinks[i]['strIngredient' + x.toString()]
                        let cocktailMeasurement = data.drinks[i]['strMeasure' + x.toString()]
                        cocktailIngredientElement = $('<p>')
                        cocktailIngredientElement.text(cocktailIngredient)

                        if (cocktailMeasurement != null)
                            cocktailIngredientElement.text(cocktailIngredient + ": " + cocktailMeasurement)
                        recipeCard.append(cocktailIngredientElement)
                    }
                    recipeCard.append(cocktailInstructionsElement, cocktailImageElement)
                    outputField.append(recipeCard)
                }
            }
        })

}

//call & display function for ingredients
function getIngredient() {
    let ingredientUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + $('#ingredient-input').val()
    fetch(ingredientUrl)
        .then(response => {
            try {
                if (response.ok) {
                    return response.json()
                } else if (response.status === 404) {
                    return Promise.reject('error 404')
                } else {
                    return Promise.reject('some other error: ' + response.status)
                }
            } catch (error) {
                let errorMessage = 'Sorry, there is no recipe for that ingredient!'
                let errorCard = $('<div>')

                errorCard.addClass('card')
                errorCard.text(errorMessage)
                outputField.append(errorCard)
            }
        })
        .then(data => {

            if (data.length === 0) {
                let nullCard = $('<div>')
                nullCard.addClass('card')
                nullCard.text("Sorry, we don't have any recipes for ingredient!")
                outputField.append(nullCard)
            } else {
                console.log('here is the data' + data)
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

                        if (cocktailMeasurement != null)
                            cocktailIngredientElement.text(cocktailIngredient + ": " + cocktailMeasurement)
                        recipeCard.append(cocktailIngredientElement)
                    }

                    recipeCard.append(clickMessage, cocktailNameElement, cocktailImageElement)
                    outputField.append(recipeCard)

                }
            }

        })

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
        $('#cocktail-input').val('')
    } else if (initIngredient) {}
    $('#ingredient-input').val(initIngredient)
    outputField.text('')
    getIngredient()
    $('#ingredient-input').val('')
}

// Cocktail search history function
function cocktailHistory() {

    console.log('Cocktail Storage')
    let key

    // Condition to check for duplicate entries
    for (let i = 0; i < localStorage.length; i++) {
        let xinput = $('#cocktail-input').val()
        let key = localStorage.key(i)
        let value = localStorage.getItem('cocktail_search_' + i)
        if (value === xinput) {}
    }

    // Write to storage user input into storage
    if (localStorage.getItem(key) != 0) {
        let x = localStorage.length
        localStorage.setItem('cocktail_search_' + x++, $('#cocktail-input').val())

        let cocktailHistoryItem = $('#cocktail-input').val()
        let cocktailHistoryElement = $('<h5>')

        let cocktailHistoryCard = $('<div>')
        cocktailHistoryCard.addClass('card')
        cocktailHistoryCard.css('text-align', 'center')
        cocktailHistoryCard.addClass('col')
        cocktailHistoryCard.addClass('s12')
        cocktailHistoryElement.addClass('cocktail-link')

        cocktailHistoryElement.text(cocktailHistoryItem)

        cocktailHistoryCard.append(cocktailHistoryElement)
        searchHistoryField.prepend(cocktailHistoryCard)

    }
}

// Ingredient search history
function ingredientHistory() {

    console.log('Ingredient Storage')
    let key

    // Condition to check for duplicate entries
    for (let y = 0; y < localStorage.length; y++) {
        let xinput = $('#ingredient-input').val()
        let key = localStorage.key(y)
        let value = localStorage.getItem('ingredient_search_' + y)
        if (value === xinput) {}
    }

    // Write to storage user input into storage
    if (localStorage.getItem(key) != 0) {
        let z = localStorage.length
        localStorage.setItem('ingredient_search_' + z++, $('#ingredient-input').val())
        let ingredientHistoryItem = $('#ingredient-input').val()
        let ingredientHistoryElement = $('<h5>')

        let ingredientHistoryCard = $('<div>')
        ingredientHistoryCard.addClass('card')
        ingredientHistoryCard.css('text-align', 'center')
        ingredientHistoryCard.addClass('col')
        ingredientHistoryCard.addClass('s12')
        ingredientHistoryElement.addClass('ingredient-link')

        ingredientHistoryElement.text(ingredientHistoryItem) 

        ingredientHistoryCard.append(ingredientHistoryElement)
        searchHistoryField.prepend(ingredientHistoryCard)

    }
}

init()