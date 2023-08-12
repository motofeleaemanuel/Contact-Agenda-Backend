const Contact = require("../models/ContactSchema");

const createContact = async (req, res) => {
  const { name, phone, email, info, location } = req.body;
  try {
    const contact = await Contact.findOne({ $or: [{ name }, { phone }] });
    if (contact) {
      return res.status(409).json({ message: "Contact already exists" });
    }
    const newContact = await Contact.create({
      name,
      phone,
      email,
      info,
      location,
    });
    return res
      .status(201)
      .json({ message: "Contact created successfully", contact: newContact });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ message: "Error creating contact" });
  }
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const updatedAttributes = req.body;
  console.log(id, updatedAttributes);
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    Object.keys(updatedAttributes).forEach((key) => {
      if (updatedAttributes[key] !== "") {
        contact[key] = updatedAttributes[key];
      }
    });
    console.log(contact);
    await contact.save();
    res.json({ message: "Contact updated successfully", contact });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong while updating the croduct" });
  }
};

const deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    await Contact.deleteOne({ _id: id });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllContacts = async (req, res) => {
  const { searchText } = req.query;
  console.log(searchText);
  try {
    let query = {};

    if (searchText) {
      query = {
        $or: [
          { name: { $regex: searchText, $options: "i" } },
          { phone: { $regex: searchText, $options: "i" } },
        ],
      };
    }
    const contacts = await Contact.find(query);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    console.log(contact);
    res.status(200).send({ contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  updateContactById,
  deleteContactById,
  getAllContacts,
  getContactById,
};
