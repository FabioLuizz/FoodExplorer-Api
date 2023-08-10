const { Router } = require("express")

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const FavoritesController = require('../controllers/FavoritesController');

const favoritesController = new FavoritesController();

const FavoritesRoutes = Router();

FavoritesRoutes.use(ensureAuthenticated);

FavoritesRoutes.post("/:product_id", favoritesController.create)
FavoritesRoutes.get("/", favoritesController.index)

module.exports = FavoritesRoutes;