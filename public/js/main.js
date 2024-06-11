const socket = io();

function addProduct() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const status = document.getElementById('status').checked;

    const newProduct = {
        title,
        description,
        code,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        status,
    };

    socket.emit('addProduct', newProduct);
}

socket.on("productos", (products) => {
    const productList = document.getElementById("productsList");

    productList.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = 
            `<td>${product.title}</td>
            <td>${product.id}</td>
            <td>${product.description}</td>
            <td>${product.code}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>`;
        productList.appendChild(row);
    });
});