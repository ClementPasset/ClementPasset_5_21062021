const main = document.querySelector('.main');
const addressAPI = 'http://localhost:3000/api/teddies/order';

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

const emptyCart = () => {
    localStorage.removeItem('cart');
    location.reload();
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
    displayForm();
    updateNumberOfItems();
};

let formValidation = () => {
    let errMsg = {};

    let contact = {
        firstName: document.querySelector('.contactForm__input[name="firstName"]').value,
        lastName: document.querySelector('.contactForm__input[name="lastName"]').value,
        address: document.querySelector('.contactForm__input[name="address"]').value,
        city: document.querySelector('.contactForm__input[name="city"]').value,
        email: document.querySelector('.contactForm__input[name="mail"]').value
    }

    if (contact.firstName !== undefined) {
        errMsg.firstName = "Votre prénom n'est pas renseigné";
    }

    if (Object.keys(errMsg).length === 0) {
        jsonBody = {
            contact,
            products: ['5beaa8bf1c9d440000a57d94', '5be9c8541c9d440000665243']
        };

        fetch(addressAPI, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.orderId);
                //window.location.href = "./order.html";
            })
    } else {
        for (msg in errMsg) { console.log(errMsg[msg]) }
    }
};

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

let displayForm = () => {
    let form = document.createElement('form');
    form.classList.add('contactForm');
    main.appendChild(form);

    let firstNameLabel = document.createElement('label');
    firstNameLabel.setAttribute('for', 'firstName');
    firstNameLabel.innerHTML = 'Votre prénom : ';
    firstNameLabel.classList.add('contactForm__label');
    let firstNameInput = document.createElement('input');
    firstNameInput.setAttribute('id', 'firstName');
    firstNameInput.setAttribute('placeholder', 'Jean');
    firstNameInput.setAttribute('name', 'firstName');
    firstNameInput.setAttribute('type', 'text');
    firstNameInput.setAttribute('required', true);
    firstNameInput.classList.add('contactForm__input');
    form.appendChild(firstNameLabel);
    form.appendChild(firstNameInput);

    let lastNameLabel = document.createElement('label');
    lastNameLabel.setAttribute('for', 'lastName');
    lastNameLabel.innerHTML = 'Votre nom : ';
    lastNameLabel.classList.add('contactForm__label');
    let lastNameInput = document.createElement('input');
    lastNameInput.setAttribute('id', 'lastName');
    lastNameInput.setAttribute('placeholder', 'DUPONT');
    lastNameInput.setAttribute('name', 'lastName');
    lastNameInput.setAttribute('type', 'text');
    lastNameInput.setAttribute('required', true);
    lastNameInput.classList.add('contactForm__input');
    lastNameInput.addEventListener('input', e => {
        lastNameInput.value = e.target.value.toUpperCase();
    })
    form.appendChild(lastNameLabel);
    form.appendChild(lastNameInput);

    let addressLabel = document.createElement('label');
    addressLabel.setAttribute('for', 'address');
    addressLabel.innerHTML = 'Votre adresse : ';
    addressLabel.classList.add('contactForm__label');
    let addressInput = document.createElement('input');
    addressInput.setAttribute('id', 'address');
    addressInput.setAttribute('placeholder', '2 place Sathonay');
    addressInput.setAttribute('name', 'address');
    addressInput.setAttribute('type', 'text');
    addressInput.setAttribute('required', true);
    addressInput.classList.add('contactForm__input');
    form.appendChild(addressLabel);
    form.appendChild(addressInput);

    let cityLabel = document.createElement('label');
    cityLabel.setAttribute('for', 'city');
    cityLabel.innerHTML = 'Votre ville : ';
    cityLabel.classList.add('contactForm__label');
    let cityInput = document.createElement('input');
    cityInput.setAttribute('id', 'city');
    cityInput.setAttribute('placeholder', 'Lyon');
    cityInput.setAttribute('name', 'city');
    cityInput.setAttribute('type', 'text');
    cityInput.setAttribute('required', true);
    cityInput.classList.add('contactForm__input');
    form.appendChild(cityLabel);
    form.appendChild(cityInput);

    let mailLabel = document.createElement('label');
    mailLabel.setAttribute('for', 'mail');
    mailLabel.innerHTML = 'Votre email : ';
    mailLabel.classList.add('contactForm__label');
    let mailInput = document.createElement('input');
    mailInput.setAttribute('id', 'mail');
    mailInput.setAttribute('placeholder', 'jean.dupont@gmail.com');
    mailInput.setAttribute('name', 'mail');
    mailInput.setAttribute('type', 'email');
    mailInput.setAttribute('required', true);
    mailInput.classList.add('contactForm__input');
    form.appendChild(mailLabel);
    form.appendChild(mailInput);

    let button = document.createElement('input');
    button.setAttribute('type', 'submit');
    button.classList.add('contactForm__button');
    button.addEventListener('click', e => {
        formValidation();
    });
    form.appendChild(button);
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
    let entetes = ['Nom', 'Couleur', 'Quantité', 'Prix unitaire', 'Total', '<i class="fas fa-trash"></i>'];
    entetes.forEach(col => {
        let newTh = document.createElement('th');
        newTh.innerHTML = col;
        thead.appendChild(newTh);
    });
    thead.lastChild.classList.add('cartTable__emptyCart');
    thead.lastChild.addEventListener('click', emptyCart);
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
    displayForm();
}