const express = require("express");
const app = express();
const { getProductsByCategory, productsData } = require("./filter");

app.get("/", (req, res) => {
  res.send(`
    <h1>Bienvenido a la tienda</h1>
    <nav>
        <a href="/electronica">Electrónica</a> |
        <a href="/ropa">Ropa</a> |
        <a href="/hogar">Hogar</a> |
        <a href="/productos">Todos los productos</a>
    </nav>
    `);
});

app.get("/electronica", (req, res) => {
  const productos = getProductsByCategory("electrónica");
  res.send(generateProductsPage("Sección de Electrónica", productos));
});

app.get("/ropa", (req, res) => {
  const productos = getProductsByCategory("ropa");
  res.send(generateProductsPage("Sección de Moda y Ropa", productos));
});

app.get("/hogar", (req, res) => {
  const productos = getProductsByCategory("hogar");
  res.send(generateProductsPage("Todo para el Hogar", productos));
});

app.get("/productos", (req, res) => {
  const html = generateProductsPage("Todos nuestros productos", productsData);
  res.send(html);
});

function generateProductsPage(title, products) {
  const productList = products
    .map((p) => `
    <li>
      <strong>${p.name}</strong> - ${p.price}€ 
      <br><small>Stock: ${p.stock} unidades</small>
    </li>
  `).join("");

  return `
    <h1>${title}</h1>
    <p>Se han encontrado ${products.length} productos.</p>
    <ul>
      ${productList || "<li>No hay productos disponibles</li>"}
    </ul>
    <hr>
    <a href="/">Volver a la tienda</a>
  `;
}

app.use((req, res) => {
  res
    .status(404)
    .send("<h1>Page not found</h1><a href='/'>Volver a la home</a>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
