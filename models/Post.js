const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // ✅ FIXED NAME
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments : [
        {
          user: {
            type : mongoose.Schema.Types.ObjectId,
             ref: "User",
          },

          text: {
            type: String,
            required : true,
          },
        },
    ],

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);