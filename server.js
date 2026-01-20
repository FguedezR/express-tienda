const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Bienvenido a la tienda</h1>
    <nav>
        <a href="/electronica">Electrónica</a> |
        <a href="/">Ropa</a> |
        <a href="/">Hogar</a> |
        <a href="/">Todos los productos</a>
    </nav>
    `);
});
app.get("/electronica", (req, res) => {
    res.send(`<h1>Productos de electrónica</h1>`)
})


app.use((req, res) => {
  res.status(404).send("<h1>Page not found</h1><a href="/">Volver a la home</a>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
