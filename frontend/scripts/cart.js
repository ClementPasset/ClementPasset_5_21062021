const main = document.querySelector('.main');

const getCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    return cart === null ? [] : cart;
}
const updateNumberOfItems = () => {
    let htmlNumber = document.querySelector('#items-in-cart');

    htmlNumber.innerHTML = getNumberOfItems();
};
const getNumberOfItems = () => {
    let quantity = 0;
    let cart = getCart();
    if (Object.keys(cart).length !== 0) {
        cart.forEach(elt => {
            quantity += elt.quantity;
        });
    }
    return quantity;
};

const deleteFromCart = (item) => {
    let { _id, color } = item;
    let cart = getCart();
    for (let i in cart) {
        if (_id === cart[i]._id && color === cart[i].color) {
            cart.splice(i, 1);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayTable();
    updateNumberOfItems();
};

let displayTable = () => {
    let price = 0;
    main.innerHTML = '';
    cart = getCart();
    let table = document.createElement('table');
    table.classList.add('cartTable');
    let thead = document.createElement('tr');
    thead.classList.add('cartTable__head')
    main.appendChild(table);
    table.appendChild(thead);
    let entetes = ['Nom', 'Couleur', 'Quantité', 'Prix unitaire', 'Total', ''];
    entetes.forEach(col => {
        let newTh = document.createElement('th');
        newTh.innerHTML = col;
        thead.appendChild(newTh);
    });
    cart.forEach(item => {
        newRow = document.createElement('tr');
        newRow.classList.add('cartTable__row')
        table.appendChild(newRow);
        price += item.price * item.quantity;
        [`<a href="product.html?id=${item._id}">${item.name}</a>`, item.color, item.quantity, (item.price / 100).toFixed(2).replace('.', ',') + ' €', (item.quantity * item.price / 100).toFixed(2).replace('.', ',') + ' €', '<i class="fas fa-trash"></i>'].forEach(elt => {
            let newCell = document.createElement('td');
            newCell.innerHTML = elt;
            newRow.appendChild(newCell);
        });
        newRow.lastChild.addEventListener('click', (e) => deleteFromCart(item));
    });

    let lastRow = document.createElement('tr');
    lastRow.classList.add('cartTable__footer');
    table.appendChild(lastRow);
    let caption = document.createElement('td');
    caption.innerHTML = "PRIX TOTAL";
    caption.setAttribute('colspan', 3);
    let totalPrice = document.createElement('td');
    totalPrice.innerHTML = (price / 100).toFixed(2).replace('.', ',') + ' €';
    totalPrice.setAttribute('colspan', 3);
    lastRow.appendChild(caption);
    lastRow.appendChild(totalPrice);
};

updateNumberOfItems();

if (getNumberOfItems() === 0) {
    errorTitle = document.createElement('h2');
    errorTitle.innerHTML = 'Votre panier est vide';
    errorTitle.classList.add('errorTitle');
    errorText = document.createElement('p');
    errorText.innerHTML = "Vous n'avez aucun objet dans votre panier.<br> Continuez vos achats et revenez ici pour valider la commande.";
    errorText.classList.add('errorText');
    main.appendChild(errorTitle);
    main.appendChild(errorText);
} else {
    displayTable();
}

document.querySelector('.header__title').parentElement.addEventListener('click', (e) => {
    console.log(e.target);
});