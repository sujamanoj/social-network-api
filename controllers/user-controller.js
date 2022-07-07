const { response } = require("express");
const { User, Thought } = require("../models");

const userController = {
  // /api/users
  // get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: ["-username", "-__v"],
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })

      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No User found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // create User
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No User found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete User
  // deleteUser({ params }, res) {
  //   User.findOneAndDelete({ _id: params.id })
  //     .then(dbUserData => res.json(dbUserData))
  //     .catch(err => res.json(err));
  // },

  //Delete user and users associated thoughts
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No User found with this id!" });
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // /api/users/:userid/fiends/:friendId
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  removeFriend({ params, body }, res) {
    User.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedFriend) => {
        if (!deletedFriend) {
          return res.status(404).json({ message: "No friend with this id!" });
        }
        return User.findOneAndUpdate(
          { friends: params.friendId },
          { $pull: { friends: params.friendId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
