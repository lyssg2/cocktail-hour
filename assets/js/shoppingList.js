// Global Arrays
let tempObject = []
let newObject = []

// Selectors
let outputEl = $('.output-field')
let mainEl = $('.mainBlock')

//  CSS Adjustments
mainEl.css('align-self', 'left').css('margin', '5%')
outputEl.css('display', 'grid').css('grid-template-columns', '.3fr').css('justify-content', 'center')

// Pulls shopping list from storage and displays to page, includes click event to remove items
function getShoppingList() {

    // Pull from local storage into tempObject
    tempObject = JSON.parse(localStorage.getItem('shoppingListObject'))

    // Local vars
    let cocktail
    
    // Loop through Cocktails
    for (x in tempObject) {
        
        // Define cocktail card elements
        let cocktailNameElement = $('<h5>')
        let ingredientElement
        let ingredientButton
        let cocktailIngredientElement = $('<ul>')
        cocktailNameElement.text(tempObject[x].cocktailName)
        cocktailIngredientElement.css('display', 'grid')

        // Loop through Ingredients 
        for (y in tempObject[x].ingredientName) {

            // Define ingredeint card elements
            ingredientElement = $('<li>')
            ingredientButton = $('<button>')
            ingredientElement.text(tempObject[x].ingredientName[y])
            ingredientButton.text('REMOVE')
            ingredientButton.attr('name', tempObject[x].ingredientName[y]).attr('class', 'btn waves-effect waves-light btn-small deep-orange lighten-1 inline').attr('id', 'removeButton')
            ingredientButton.css('margin', '6%')

            // Append ingredient and ingredient remove button
            cocktailIngredientElement.append(ingredientElement).append(ingredientButton)

            // Remove ingredient click event
            ingredientButton.on('click', function (event) {

                event.preventDefault()

                // Loop through tempObject for cocktail names
                for (a in tempObject) {

                    // Loop through ingredients names
                    for (b in tempObject[a].ingredientName) {

                        // Condition if ingredient matches remove button name
                        if (tempObject[a].ingredientName[b] == $(this).attr('name')) {

                            // Remove Ingredient from object
                            unshiftObj = tempObject[a].ingredientName
                            unshiftObj.shift(b)
                            tempObject[a].ingredientName = unshiftObj
                            
                            // Push back into local storage
                            localStorage.setItem('shoppingListObject', [JSON.stringify(tempObject)])
                            location.reload($('#' + [x]))

                            // Condition to remove cocktail card element if no ingredients exist
                            if (tempObject[a].ingredientName.length == 0) {

                                // Remove cocktail from array
                                unshiftCocktail = tempObject
                                unshiftCocktail.shift(a)

                                // Push back into local storage
                                localStorage.setItem('shoppingListObject', [JSON.stringify(tempObject)])
                                return
                            }
                        }
                    }
                }

            })

        }

        // Define recipe card elements
        let recipeCard = $('<div>')
        recipeCard.addClass('card')
        recipeCard.attr('id', x)
        recipeCard.css('display', 'inline-block').css('padding', '6%')

        // Append cocktail and ingredients to recipe card
        recipeCard.append(cocktailNameElement, cocktailIngredientElement)

        // Append recipeCard to page
        outputEl.append(recipeCard)

    }
    return
    
}

getShoppingList()
