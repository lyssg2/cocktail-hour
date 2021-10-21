//this is the giphy javascript code, to be incorporated into the main javascript file


let displaySpace = $('#display-space')


$('#search-term-button').on('click', function(event){
    event.preventDefault()
    fetchGiphy()
})

function fetchGiphy(){
    let giphy_url = 'https://api.giphy.com/v1/stickers/search?q=' + $('#search-term').val() + '&api_key=ZlW3eq9sYYChWYjKSJ8QU6KEM6tXf4eI' //#search-term is placeholder
    console.log($('#search-term').val())
fetch(giphy_url) //fetch request for giphy sticker
.then(response => {
    if(response.ok){
        console.log(giphy_url)
        return response.json()
    }else if (response.status  === 404){ //404 error catch
        console.log('Error: 404. Giphy URL not found' + response.status)
        return Promise.reject('error 404')
    }else{
        console.log('Error' + response.status) //other error catch
        return Promise.reject('error: ' + response.status)
    }})
.then(data => {
    let randomNum = Math.floor(Math.random() * 50).toString() //random num to pick out of 50 giphy stickers
    console.log(randomNum)
    let giphyImage = data.data[randomNum].images.original.url //target a random giphy sticker

    let giphyElement = $('<img>') //creates giphy html element
    let recipeCard = $('<div>')

    $(giphyElement).attr('src', giphyImage) //applies random giphy sticker to giphy html element
    recipeCard.addClass('card')

    recipeCard.append(giphyElement) //this is a placeholder. how are we going to put this element on the page?
    displaySpace.append(recipeCard)

})
}