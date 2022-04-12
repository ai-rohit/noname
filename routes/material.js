const express = require("express");
const materialController = require("../controllers/materialController");
const { wrapAsync } = require("../helpers");

const router = express.Router();

router.get("/", wrapAsync(materialController.getMaterials));
router.post("/", wrapAsync(materialController.addMaterial));
router.get("/:id", wrapAsync(materialController.getSingleMaterial));
router.put("/:id", wrapAsync(materialController.updateMaterial));
router.delete("/:id", wrapAsync(materialController.deleteMaterial));

module.exports = router;