//global vars here
let outputField = $('.output-field')
let iconImage = ''
let searchHistoryField = $('#search-history')




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
    let cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $('#cocktail-input').val() //cocktaildb api

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
            console.log(data)

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
                        shoppingButton.text('Add to Shopping List')

                        if (cocktailMeasurement) {
                            cocktailIngredientElement.text(cocktailIngredient + ": " + cocktailMeasurement)
                            recipeCard.append(cocktailIngredientElement, shoppingButton)
                        }
                        recipeCard.append(cocktailInstructionsElement, cocktailImageElement)
                        outputField.append(recipeCard)
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

                        if (cocktailMeasurement != null){
                            cocktailIngredientElement.text(cocktailIngredient + ": " + cocktailMeasurement)
                        recipeCard.append(cocktailIngredientElement)
                        }
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

// Cocktail search history function
function cocktailHistory() {

    console.log('Cocktail Storage')
    let key

    // Condition to check for duplicate entries
    for (let i = 0; i < localStorage.length; i++) {
        let xinput = $('#cocktail-input').val()
        let key = localStorage.key(i)
        let value = localStorage.getItem('cocktail_search_' + i)
        if (value === xinput) { }
    }

    // Write to storage user input into storage
    if (localStorage.getItem(key) != 0) {
        let x = localStorage.length
        localStorage.setItem('cocktail_search_' + x++, $('#cocktail-input').val())

        let cocktailHistoryItem = capitalize($('#cocktail-input').val())
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
        if (value === xinput) { }
    }

    // Write to storage user input into storage
    if (localStorage.getItem(key) != 0) {
        let z = localStorage.length
        localStorage.setItem('ingredient_search_' + z++, $('#ingredient-input').val())
        let ingredientHistoryItem = capitalize($('#ingredient-input').val())
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