

//input button for cocktails
$('#cocktail-input-button-2').click(function (event) {
    if($('#cocktail-input-2').val()){
        event.preventDefault()
        let storageData = $('#cocktail-input-2').val().toString()
        localStorage.setItem('initSearch', JSON.stringify(storageData))
        window.location = 'secondpage.html'
        return false
}})

