const main = document.querySelector('.main');
const address = "http://localhost:3000/api/teddies/";

//Récupère les éléments en appelant l'API et retourne une Promise
const getItems = () => {
    return new Promise((resolve, reject) => {
        fetch(address)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    });
};

//Affiche une élément dans le container passé en paramètre
const displayItem = (item, container) => {
    newCard = document.createElement('article');
    newCard.classList.add('card');

    newImg = document.createElement('img');
    newImg.classList.add('card__img');
    newImg.setAttribute('src', item.imageUrl);
    newImg.setAttribute('alt', 'Photo de ' + item.name);
    newCard.appendChild(newImg);

    newTitle = document.createElement('h3');
    newTitle.classList.add('card__title');
    newTitle.innerHTML = item.name + ' - ' + (item.price / 100).toFixed(2).replace('.', ',') + ' €';
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
};


getItems()
    .then(items => {

        container = document.createElement('section');
        container.classList.add("main__cardContainer");
        main.appendChild(container);

        title = document.createElement('h2');
        title.classList.add("main__title");
        title.innerHTML = "Tous nos Nounours";
        container.appendChild(title);


        items.forEach(item => {
            displayItem(item, container);
        })
    })
    .catch((err) => {
        errorTitle = document.createElement('h2');
        errorTitle.innerHTML = 'Une erreur est survenue.';
        errorText = document.createElement('p');
        errorText.innerHTML = 'Il y a eu un problème de communication avec le serveur : <br>' + err;
        main.appendChild(errorTitle);
        main.appendChild(errorText);
    })