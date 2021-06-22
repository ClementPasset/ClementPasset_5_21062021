const main = document.querySelector('.main');
const address = "http://localhost:3000/api/teddies/";

const searchParams = new URL(document.URL).searchParams;

//Récupère l'id dans les paramètres get de l'URL
const getId = () => searchParams.get('id');

//Récupère un item via l'API en passant l'Id récupéré
const getItem = (id) => {
    if (id === null) return;
    return new Promise((resolve, reject) => {
        fetch(address + id)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    });
}

const successMessage = (text) => {
    msg = document.createElement('div');
    msg.classList.add('alert', 'alert--success');
    msg.innerHTML = text ? text : 'Opération réalisée avec succès.';
    main.appendChild(msg);
    setInterval(() => {
        msg.remove()
    }, 2300);
}

const displayItem = (item, container) => {

    newImg = document.createElement('img');
    newImg.classList.add('product__img');
    newImg.setAttribute('src', item.imageUrl);
    newImg.setAttribute('alt', 'Photo de ' + item.name);
    container.appendChild(newImg);

    newTitle = document.createElement('h2');
    newTitle.classList.add('product__title');
    newTitle.innerHTML = item.name;
    container.appendChild(newTitle);

    newDescription = document.createElement('p');
    newDescription.classList.add('product__description');
    newDescription.innerHTML = item.description;
    container.appendChild(newDescription);

    newSelect = document.createElement('select');
    newSelect.classList.add('product__select');
    container.appendChild(newSelect);

    item.colors.forEach(color => {
        newOption = document.createElement('option');
        newOption.innerHTML = color;
        newSelect.appendChild(newOption);
    });

    newPrice = document.createElement('p');
    newPrice.classList.add('product__price');
    newPrice.innerHTML = 'Acheter ce nounours au prix de <span class="product__priceText">' + (item.price / 100).toFixed(2).replace('.', ',') + '</span> €';
    container.appendChild(newPrice);

    newButton = document.createElement('button');
    newButton.classList.add('button', 'product__btn');
    newButton.innerHTML = 'Ajouter au panier<i class="fas fa-shopping-cart"></i>';
    container.appendChild(newButton);

    newButton.addEventListener('click', e => {
        successMessage("Le produit a bien été ajouté au panier");
    })
};

getItem(getId())
    .then(item => {
        container = document.createElement('section');
        container.classList.add("product");
        main.appendChild(container);

        displayItem(item, container);
    })
    .catch(err => {
        errTitle = document.createElement('h2');
        errorTitle = document.createElement('h2');
        errorTitle.innerHTML = 'Une erreur est survenue.';
        errorText = document.createElement('p');
        errorText.innerHTML = 'Il y a eu un problème de communication avec le serveur : <br>' + err;
        main.appendChild(errorTitle);
        main.appendChild(errorText);
    })
