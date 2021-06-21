const main = document.querySelector('.main');
const address = "http://localhost:3000/api/teddies/";

const getItems = () => {
    return new Promise((resolve, reject) => {
        fetch(address)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(() => reject())
    });
};

getItems()
    .then(items => {
        container = document.createElement('section');
        container.classList.add("main__cardContainer")
        main.appendChild(container);

        items.forEach(item => {
            newCard = document.createElement('article');
            newCard.classList.add('card');

            newImg = document.createElement('img');
            newImg.classList.add('card__img');
            newImg.setAttribute('src', item.imageUrl);
            newCard.appendChild(newImg);

            newTitle = document.createElement('h3');
            newTitle.classList.add('card__title');
            newTitle.innerHTML = item.name;
            newCard.appendChild(newTitle);

            newDescription = document.createElement('p');
            newDescription.classList.add('card__description');
            newDescription.innerHTML = item.description;
            newCard.appendChild(newDescription);

            newLink = document.createElement('a');
            newLink.setAttribute('href', 'product.html?id=' + item._id);
            newCard.appendChild(newLink);

            newButton = document.createElement('button');
            newButton.classList.add('button');
            newButton.innerHTML = 'Voir +';
            newLink.appendChild(newButton);

            container.appendChild(newCard);
        })
    })
    .catch(() => {
        errorTitle = document.createElement('h2');
        errorTitle.innerHTML = 'Une erreur est survenue.'
        errorText = document.createElement('p');
        errorText.innerHTML = 'Il y a eu un problème de communication avec le serveur, merci de réessayer plus tard.'
        main.appendChild(errorTitle);
        main.appendChild(errorText);
    })