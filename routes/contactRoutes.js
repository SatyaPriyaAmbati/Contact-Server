const express=require("express");
const router=express.Router();
const {
  getContacts,
  CreateContact,
  UpdateContact,
  DeleteContact,
  getcontact
    }=require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts);
router.route("/").post(CreateContact);
router.route("/:id").get(getcontact);
router.route("/:id").put(UpdateContact);
router.route("/:id").delete(DeleteContact);

module.exports=router;