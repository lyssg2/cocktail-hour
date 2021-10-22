//global vars here
let outputField = $('.output-field')




//input button for cocktails

$('#cocktail-input-button').click(function(event) {
    event.preventDefault()
    console.log('cocktail button clicked')
    getCocktail()
})

//input button for ingredients

$('#ingredient-input-button').click(function(event) {
    event.preventDefault()
    console.log('ingredient button clicked')
    getIngredient()
})

//call & display function for cocktails
function getCocktail() {
    let cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $('#cocktail-input').val()
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

            for (i = 0; i < data.drinks.length; i++) {
                let cocktailName = data.drinks[i].strDrink
                let cocktailInstructions = data.drinks[i].strInstructions

                let cocktailImage = data.drinks[i].strDrinkThumb

                let cocktailNameElement = $('<h5>')
                let cocktailInstructionsElement = $('<p>')
                let cocktailImageElement = $('<img>')
                let dividerElement = $('<div>')
                let recipeCard = $('<div>')

                cocktailNameElement.text(cocktailName)
                cocktailInstructionsElement.text('Instructions: ' + cocktailInstructions)
                cocktailImageElement.attr('src', cocktailImage)
                cocktailImageElement.css('height', '200px')
                recipeCard.addClass('card')
                dividerElement.addClass('divider')
              
                recipeCard.append(cocktailNameElement)

                for (x = 1; x <= 15; x++) {
                    let cocktailIngredient = data.drinks[i]['strIngredient' + x.toString()]
                    let cocktailMeasurement = data.drinks[i]['strMeasure' + x.toString()]
                    cocktailIngredientElement = $('<p>')
                    cocktailIngredientElement.text(cocktailIngredient)
                    
                    if(cocktailMeasurement != null)
                        cocktailIngredientElement.text(cocktailIngredient + ": " + cocktailMeasurement)
                    recipeCard.append(cocktailIngredientElement)
                }
                recipeCard.append(cocktailInstructionsElement, cocktailImageElement)

                outputField.append(recipeCard)
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