const menuData = {
    'القشطوطة': [
        {name: 'القشطوطة سادة', price: 22},
        {name: 'القشطوطة نوتيلا', price: 22},
        {name: 'القشطوطة لوتس', price: 22},
        {name: 'القشطوطة بستساشيو', price: 22}
    ],
    'سينابون': [
        {name: 'سينابون كلاسيك', price: 40},
        {name: 'سينابون سبيشيال', price: 50}
    ]
};

let cart = {};

function renderMenu() {
    const menuSection = document.getElementById('menuSection');
    for (const [cat, items] of Object.entries(menuData)) {
        const catDiv = document.createElement('div');
        catDiv.innerHTML = `<h2>${cat}</h2>`;
        const grid = document.createElement('div');
        grid.className = 'menu-grid';

        items.forEach((item, i) => {
            const id = `${cat}_${i}`;
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.dataset.id = id;
            div.innerHTML = `
                <div>${item.name}</div>
                <div>${item.price} ريال</div>
                <div class="quantity-control">
                    <button onclick="changeQty('${id}',-1)">-</button>
                    <span id="q_${id}">1</span>
                    <button onclick="changeQty('${id}',1)">+</button>
                </div>
            `;
            div.onclick = () => toggleItem(id, item);
            grid.appendChild(div);
        });

        catDiv.appendChild(grid);
        menuSection.appendChild(catDiv);
    }
}

function toggleItem(id, item) {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (cart[id]) {
        delete cart[id];
        el.classList.remove('selected');
    } else {
        cart[id] = {...item, qty: 1};
        el.classList.add('selected');
    }
}

function changeQty(id, d) {
    if (!cart[id]) return;
    cart[id].qty = Math.max(1, cart[id].qty + d);
    document.getElementById(`q_${id}`).textContent = cart[id].qty;
}

document.addEventListener('DOMContentLoaded', renderMenu);
