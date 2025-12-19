require('dotenv').config();

const express = require('express')
const cors = require('cors');
const mongoose = require("mongoose");
const donutsRouter = require('./routes/donutsRoutes');
const favouritesRoutes = require('./routes/favouritesRoutes')
const app = express()
const PORT = process.env.PORT || 9000;


mongoose.connect(process.env.MONGO_URI, {
  tls: true,                 
  tlsAllowInvalidCertificates: false 
})
.then(() => console.log("Conectado a MongoDB correctamente"))
.catch(err => console.error("Error de conexión a MongoDB:", err));

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectar con mongo ${error}`);
});

db.on("connected", () => {
  console.log(`Succecss connect`);
});
 
db.on("disconected", () => {
  console.log(`Mongo is disconected`);
});

app.use(express.json())
app.use(cors({
  origin: '*',
}));

app.use('/donuts', donutsRouter);
app.use('/favourites', favouritesRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


