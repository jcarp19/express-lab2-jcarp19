import express, { Router } from "express"
import cors from "cors";
import path from 'path';
import routes from "../routes/routing";

// creates an instance of an Express server
const app = express();

// defines the server port
const port = 3005;

// Settings for web pages
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(routes);

// Set server to listen to the port
app.listen(port, () => {
    console.log(`listening on port: ${port}.`)
});  