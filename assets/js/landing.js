

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

