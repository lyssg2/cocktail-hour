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
                let cocktailImage = data.drinks[i].strImageSource
                let cocktailIngredient1 = data.drinks[i].strIngredient1 //fix this mess
                let cocktailIngredient2 = data.drinks[i].strIngredient2
                let cocktailIngredient3 = data.drinks[i].strIngredient3
                let cocktailIngredient4 = data.drinks[i].strIngredient4
                let cocktailIngredient5 = data.drinks[i].strIngredient5
                let cocktailIngredient6 = data.drinks[i].strIngredient6
                let cocktailIngredient7 = data.drinks[i].strIngredient7
                let cocktailIngredient8 = data.drinks[i].strIngredient8
                let cocktailIngredient9 = data.drinks[i].strIngredient9
                let cocktailIngredient10 = data.drinks[i].strIngredient10
                let cocktailIngredient11 = data.drinks[i].strIngredient11
                let cocktailIngredient12 = data.drinks[i].strIngredient12
                let cocktailIngredient13 = data.drinks[i].strIngredient13
                let cocktailIngredient14 = data.drinks[i].strIngredient14
                let cocktailIngredient15 = data.drinks[i].strIngredient15

                let cocktailNameElement = $('<h5>')
                let cocktailInstructionsElement = $('<p>')
                let cocktailImageElement = $('<img>')
                let cocktailIngredient1Element = $('<p>') //fix this mess
                let cocktailIngredient2Element = $('<p>')
                let cocktailIngredient3Element = $('<p>')
                let cocktailIngredient4Element = $('<p>')
                let cocktailIngredient5Element = $('<p>')
                let cocktailIngredient6Element = $('<p>')
                let cocktailIngredient7Element = $('<p>')
                let cocktailIngredient8Element = $('<p>')
                let cocktailIngredient9Element = $('<p>')
                let cocktailIngredient10Element = $('<p>')
                let cocktailIngredient11Element = $('<p>')
                let cocktailIngredient12Element = $('<p>')
                let cocktailIngredient13Element = $('<p>')
                let cocktailIngredient14Element = $('<p>')
                let cocktailIngredient15Element = $('<p>')
                let dividerElement = $('<div>')
                let recipeCard = $('<div>')

                cocktailNameElement.text(cocktailName)
                cocktailInstructionsElement.text('Instructions: ' + cocktailInstructions)
                cocktailImageElement.attr('src', cocktailImage)
                cocktailIngredient1Element.text(cocktailIngredient1) //fix this mess
                cocktailIngredient2Element.text(cocktailIngredient2)
                cocktailIngredient3Element.text(cocktailIngredient3)
                cocktailIngredient4Element.text(cocktailIngredient4)
                cocktailIngredient5Element.text(cocktailIngredient5)
                cocktailIngredient6Element.text(cocktailIngredient6)
                cocktailIngredient7Element.text(cocktailIngredient7)
                cocktailIngredient8Element.text(cocktailIngredient8)
                cocktailIngredient9Element.text(cocktailIngredient9)
                cocktailIngredient10Element.text(cocktailIngredient10)
                cocktailIngredient11Element.text(cocktailIngredient11)
                cocktailIngredient12Element.text(cocktailIngredient12)
                cocktailIngredient13Element.text(cocktailIngredient13)
                cocktailIngredient14Element.text(cocktailIngredient14)
                cocktailIngredient15Element.text(cocktailIngredient15)
                recipeCard.addClass('card')
                dividerElement.addClass('divider')

                recipeCard.append(cocktailNameElement, dividerElement, cocktailInstructionsElement, dividerElement, cocktailIngredient1Element, dividerElement, cocktailIngredient2Element, dividerElement,
                    cocktailIngredient3Element, dividerElement, cocktailIngredient4Element, dividerElement, cocktailIngredient5Element, dividerElement, cocktailIngredient6Element, dividerElement, cocktailIngredient7Element, dividerElement, cocktailIngredient8Element, dividerElement,
                    cocktailIngredient9Element, dividerElement, cocktailIngredient10Element, dividerElement, cocktailIngredient11Element, dividerElement, cocktailIngredient12Element, dividerElement, cocktailIngredient13Element, dividerElement, cocktailIngredient14Element, dividerElement,
                    cocktailIngredient15Element, dividerElement, cocktailImageElement)
                outputField.append(recipeCard)

            }
        })

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

// why is this not working

// testing testing