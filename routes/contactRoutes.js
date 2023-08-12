const express = require("express");
const {
  createContact,
  updateContactById,
  deleteContactById,
  getAllContacts,
  getContactById,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/contact", createContact);
router.put("/contact/:id", updateContactById);
router.delete("/contact/:id", deleteContactById);
router.get("/contact", getAllContacts);
router.get("/contact/:id", getContactById);

module.exports = router;
