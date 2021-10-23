let pixabayUrl = "https://pixabay.com/api/?q=" + $('#search-input').val() + "&key=23999957-6f13ba77eee3721df01fe7a9f"


function fetchImg() {
    let pixabayUrl = "https://pixabay.com/api/?q=" + $('#search-input').val() + "&key=23999957-6f13ba77eee3721df01fe7a9f"
    fetch(pixabayUrl) //fetch request for giphy sticker
        .then(response => {
            if (response.ok) {
                console.log(giphy_url)
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
            let pixabayImage = data.hits[randomNum].webformatUrl //target a random giphy sticker

            let pixabayElement = $('<img>') //creates giphy html element
            let recipeCard = $('<div>')

            $(pixabayElement).attr('src', pixabayImage) //applies random giphy sticker to giphy html element
            // $(giphyElement).css('height', '50px')
            recipeCard.addClass('card')``

            recipeCard.append(pixabayElement) //this is a placeholder. how are we going to put this element on the page?
            displaySpace.append(recipeCard)
        })}