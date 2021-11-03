console.log('hello')

// Global Arrays
let tempObject = []
let newObject = []

// Selectors

let outputEl = $('.output-field')
let mainEl = $('.mainBlock')

mainEl.css('align-self', 'left').css('margin', '5%')
outputEl.css('display', 'grid').css('grid-template-columns', '.3fr')
outputEl.css('justify-content', 'center')

function getShoppingList() {

    tempObject = JSON.parse(localStorage.getItem('shoppingListObject'))

    let cocktail
    let ingredients

    for (x in tempObject) {

        cocktail = tempObject[x].cocktailName
        ingredients = tempObject[x].ingredientName

        console.log(ingredients)

        // Elements 
        let cocktailNameElement = $('<h5>') 
        cocktailNameElement.text(cocktail)

        let cocktailIngredientElement = $('<ul>')
        cocktailIngredientElement.css('display', 'grid')
        let ingredientElement
        let ingredientButton

        for (y in tempObject[x].ingredientName) {
   
            ingredientElement = $('<li>')
            ingredientButton = $('<button>')
            ingredientElement.text(tempObject[x].ingredientName[y])
            ingredientButton.text('REMOVE')
            ingredientButton.attr('name', tempObject[x].ingredientName[y]).attr('class', 'btn waves-effect waves-light btn-small deep-orange lighten-1 inline')
            ingredientButton.css('margin', '6%')
            cocktailIngredientElement.append(ingredientElement)
            cocktailIngredientElement.append(ingredientButton)

        }

        let recipeCard = $('<div>')
        recipeCard.addClass('card') 
        recipeCard.css('display', 'inline-block').css('margin', '1%')
        recipeCard.append(cocktailNameElement, cocktailIngredientElement)

        outputEl.append(recipeCard)

    }

}

getShoppingList()