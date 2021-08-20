import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("home");
});

/*
routes.get("/specialty-pizzas/:id", (req, res) => {
    let id: number = Number(req.params.id);
    console.log(id);
    const specPizzas = [
        {id: 1, name: "A Bit Fishy", price: 12},
        {id: 2, name: "No Piggies Please", price: 15},
        {id: 3, name: "Yep! It's Got It", price: 18}
    ];
    // const lookUpPizza = specPizzas.find(item => item.id === id);
    // console.log(lookUpPizza)
    const filterPizzas = specPizzas.filter(item => item.id === id);
    const selectedPizza = filterPizzas[0];
    const price = filterPizzas[0].price.toFixed(2);
    console.log(selectedPizza.name)

    res.render("specialty", {selectedPizza, price})
});
*/

routes.get("/specialty-pizzas", (req, res) => {
    let name = req.query.name;
    let price = req.query.price;

    res.render("specialty", {name, price});
});

routes.get("/reviews", (req, res) => {
    res.render("reviews");
});

routes.post("/reviews", (req, res) => {
    let name = req.body.name;
    let comment = req.body.comment;
    let rating: number = Number(req.body.rating);

    res.render("review_confirm", {name, comment, rating});
});

routes.get("/pizza_builder", (req, res) => {
    const toppingsArr = ["Pepperoni", "Sausage", "Chicken", "Mushroom", "Olive", "Green Pepper", "Onion", "Banana Pepper", "Anchovies", "Pineapple"];
    
    res.render("pizza_builder", {toppingsArr});
});

routes.post("/pizza_builder", (req, res) => {
    let size = req.body.size;
    // console.log(size);
    let numToppings = req.body.num_toppings;
    let gluten_free = !!req.body.gluten_free;
    let instructions = req.body.instructions;
    let pizzaPrice: any;
    
    if (size === "Small") {
        pizzaPrice = (Number(numToppings) * .50) + 7.00;
    } else if (size === "Medium") {
        pizzaPrice = (Number(numToppings) * 1.00) + 10.00;
    } else {
        pizzaPrice = (Number(numToppings) * 1.25) + 12.00;
    };

    let totalPrice: any;

    if (gluten_free) {
        totalPrice = Number((pizzaPrice + 2.00) / 1).toFixed(2);
    } else {
        totalPrice = Number(pizzaPrice / 1).toFixed(2);
    };

    let freeDelivery;

    if (totalPrice >= 15.00) {
        freeDelivery = true;
        // console.log("Because your order meets the $15.00 minimun, we'll bring it to you for FREE!");
    };

    res.render("pizza_confirm", {size, numToppings, gluten_free, totalPrice, instructions, freeDelivery});
});


export default routes;