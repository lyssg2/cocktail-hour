//global vars here
let outputField = $('.output-field')
let iconImage = ''




//input button for cocktails
$('#cocktail-input-button').click(function (event) {
    if ($('#cocktail-input').val()) {
        event.preventDefault()
        console.log('cocktail button clicked')
        outputField.text('')
        getCocktail()
        
        console.log(iconImage + ' : iconImage')
        $('#cocktail-input').val('')
    }
})

//enter key press event - going to have to update this to account for 2 text areas. 
$(document).keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        outputField.text('')
        getCocktail()
        $('#cocktail-input').val('')                    
        
    }
})

//input button for ingredients
$('#ingredient-input-button').click(function (event) {
    event.preventDefault()
    console.log('ingredient button clicked')
    getIngredient()
})

//call & display function for cocktails
function getCocktail() {
    iconImage = $('#cocktail-input').val()
    let cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $('#cocktail-input').val()
    console.log($('#cocktail-input.val') + ' cocktail input for getcocktail')
    console.log(cocktailUrl)

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
            }
            else {
                for (i = 0; i < data.drinks.length; i++) {
                    let cocktailName = data.drinks[i].strDrink
                    let cocktailInstructions = data.drinks[i].strInstructions
                    let cocktailImage = data.drinks[i].strDrinkThumb

                    let cocktailNameElement = $('<h5>')
                    let cocktailInstructionsElement = $('<p>')
                    let cocktailImageElement = $('<img>')
                    let recipeCard = $('<div>')

                    cocktailNameElement.text(cocktailName)
                    cocktailInstructionsElement.text('Instructions: ' + cocktailInstructions)
                    cocktailImageElement.attr('src', cocktailImage)
                    cocktailImageElement.css('height', '200px')
                    recipeCard.addClass('card')

                    fetchImg()


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
        }
        )

}

//call & display function for ingredients
function getIngredient() {
    let ingredientCall = "www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + $('#ingredient-input').val()
    console.log(ingredientCall)
}

//this function capitalizes words. needs to be updated to do each word in a title (probably with .split() and a for loop to iterate through each word and .toUpperCase() it, then .join() it back together)
function capitalize(word) {
    let lower = word.toLowerCase()
    return word.charAt(0).toUpperCase() + lower.slice(1)
}

function init() {
    let initSearch = JSON.parse(localStorage.getItem('initSearch'))
    $('#cocktail-input').val(initSearch)
    if (initSearch) {
        outputField.text('')
        getCocktail()
        $('#cocktail-input').val('')
    }
}

function fetchImg() {
    
    console.log($('#cocktail-input').val() + ' fetchimg cocktail input')
    let pixabayUrl = "https://pixabay.com/api/?q=" + iconImage + "&key=23999957-6f13ba77eee3721df01fe7a9f"
    fetch(pixabayUrl) //fetch request for giphy sticker
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
            let randomNum = Math.floor(Math.random() * 20).toString() //random num to pick out of 50 giphy stickers
            console.log(randomNum)
            let pixabayImage = data.hits[randomNum].webformatURL //target a random giphy sticker
            let hits = data.hits[0]
            console.log(pixabayImage)
            console.log(hits)

            let pixabayElement = $('<img>') //creates giphy html element
            let recipeCard = $('<div>')

            $(pixabayElement).attr('src', pixabayImage) //applies random giphy sticker to giphy html 
            $(pixabayElement).css('height', '50px')
            $(pixabayElement).css('width', '50px')
            $(pixabayElement).css('border-radius', '50%')

            recipeCard.append(pixabayElement) //this is a placeholder. how are we going to put this element on the page?
        })}

init()