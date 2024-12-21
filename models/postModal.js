const { ObjectId } = require("mongodb");
const { mainDB } = require("../libs/db");

module.exports.getAllPostsModal = async () => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const posts = postsCollection.find({}).toArray();
    return posts;
  } catch (error) {
    return { status: 500 };
  }
};

module.exports.deletePostModal = async (postID, file) => {
  try {
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    const postFind = (
      await postsCollection.find({ _id: new ObjectId(postID) }).toArray()
    ).flat();
    if (postFind) {
      await postsCollection.deleteOne({ _id: new ObjectId(postID) });
      return { status: 200 };
    } else {
      return { status: 422 };
    }
  } catch (error) {
    return { status: 500 };
  }
};

module.exports.createPostModal = async (reqBoby) => {
  try {
    const newPostModal = {
      ...reqBoby,
      timestamp: new Date(),
    };
    const db = await mainDB();
    const postsCollection = db.collection("posts");
    await postsCollection.insertOne(newPostModal);
    return { status: 201 };
  } catch (error) {
    return { status: 500 };
  }
};
