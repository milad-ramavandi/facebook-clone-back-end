const { ObjectId } = require("mongodb");
const { mainDB } = require("../libs/db");

module.exports.getAllStoriesModal = async () => {
 try {
    const db = await mainDB();
    const storiesCollection = db.collection("stories");
    const stories = storiesCollection.find({}).toArray();
    return stories;
 } catch (error) {
    return {status:500}
 }
};

module.exports.addStoryModal = async (reqBody) => {
  try {
    const db = await mainDB();
    const storiesCollection = db.collection("stories");
    await storiesCollection.insertOne(reqBody);
    return { status: 201 };
  } catch (error) {
    return { status: 500 };
  }
};

module.exports.deleteStoryModal = async (storyID) => {
  try {
    const db = await mainDB();
    const storiesCollection = db.collection("stories");
    const storyFind = (
      await storiesCollection.find({ _id: new ObjectId(storyID) }).toArray()
    ).flat();
    if (storyFind) {
      await storiesCollection.deleteOne({ _id: new ObjectId(storyID) });
      return { status: 200 };
    }
    return { status: 422 };
  } catch (error) {
    return {status:500}
  }
};
