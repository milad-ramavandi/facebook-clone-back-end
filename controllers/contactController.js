const { getAllContactsModal } = require("../models/contactModal");

const getAllContactsController = async (res, options) => {
  const contacts = await getAllContactsModal();
  res.writeHead(200, {...options});
  res.write(JSON.stringify(contacts));
  res.end();
};

module.exports = {getAllContactsController}
