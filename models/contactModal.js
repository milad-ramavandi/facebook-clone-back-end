const { mainDB } = require("../libs/db");

const getAllContactsModal = async () => {
  try {
    const db = await mainDB();
    const contactsCollection = db.collection("contacts");
    const contacts = contactsCollection.find({}).toArray();
    return contacts;
  } catch (error) {
    return { status: 500 };
  }
};

module.exports = { getAllContactsModal };
