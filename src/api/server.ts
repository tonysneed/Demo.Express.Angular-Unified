// Create a RESTful Web API with Express

import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

import { productsRouter } from "./routes/products";

namespace express_web_api {

    // Initialize express and set port number
    let app = express();
    let port: number = process.env.PORT || 3000;
    let staticRoot = path.join(__dirname, "../");
    let scripts = path.join(__dirname, "../../node_modules");

    // Server static files
    app.use(express.static(staticRoot));
    app.use("/node_modules", express.static(scripts));

    // Plug in body parser middleware for posting JSON
    app.use(bodyParser.json());

    // Add products router
    app.use("/api/products", productsRouter);

    // Start the web app
    app.listen(port, () => console.log(`Express app listening on port ${port}`));
}