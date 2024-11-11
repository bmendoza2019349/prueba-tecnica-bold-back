import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { addProduct, deleteProduct, showProducts } from "./products.controller.js";

const router = Router();

router.post(
    "/products",
    [
      check("name", "El nombre del producto es obligatorio").not().isEmpty(),
      check("description", "La descripción del producto es obligatoria").not().isEmpty(),
      check("price", "El precio debe ser un número válido").isFloat({ gt: 0 }),
      check("inventory", "El inventario debe ser un número entero").isInt({ min: 0 }),
      check("category", "La categoría del producto es obligatoria").not().isEmpty(),
      check("availability", "La disponibilidad es obligatoria y debe ser uno de los valores permitidos")
        .isIn(["DISPONIBLE", "EN CAMINO", "AGOTADO"]),
      validarCampos
    ],
    addProduct
  );

  router.get("/products", showProducts);
  
  router.delete("/products/:id", deleteProduct);
  
  export default router;