

//input button for cocktails
$('#cocktail-input-button-2').click(function (event) {
    if($('#cocktail-input-2').val()){
        event.preventDefault()
        let storageData = $('#cocktail-input-2').val().toString()
        localStorage.setItem('initSearch', JSON.stringify(storageData))
        localStorage.setItem('initIngredient', null)
        window.location = 'secondpage.html'
        return false
}})
//input button for ingredients
$('#ingredient-input-button-2').click(event => {
    if($('#ingredient-input-2').val()){
        event.preventDefault()
        let ingredientData = $('#ingredient-input-2').val().toString()
        localStorage.setItem('initIngredient', JSON.stringify(ingredientData))
        localStorage.setItem('initSearch', null)
        window.location = 'secondpage.html'
        return false
    }
})

//enter key press event - doesn't work
$(document).keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        if($('#cocktail-input-2').val()){
            console.log('enter for cocktail')
            let storageData = $('#cocktail-input-2').val().toString()
            localStorage.setItem('initSearch', JSON.stringify(storageData))
            localStorage.setItem('initIngredient', null)
            window.location = 'secondpage.html'
            return false
        }else if($('#ingredient-input').val()){
            console.log('enter for ingredient')
            let ingredientData = $('#ingredient-input-2').val().toString()
            localStorage.setItem('initIngredient', JSON.stringify(ingredientData))
            localStorage.setItem('initSearch', null)
            window.location = 'secondpage.html'
            return false
        }

    }
})

