const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["social", "shop"], // Default is "social"
    default: "social",
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  platform: {
    type: String, // e.g., "Instagram", "YouTube", "Facebook"
    enum: ["YouTube", "Facebook", "Instagram", "Other"],
  },
  clickData: [
    {
      date: { type: Date, default: Date.now },
    },
  ],
  clicks: {
    type: Number,
    default: 0, // Track the number of times a link is clicked
  },
  shopClicks: { type: Number, default: 0 },
  ctaClicks: { type: Number, default: 0 },
  device: {
    type: String,
    enum: ["Linux", "Mac", "iOS", "Windows", "Android", "Other"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;
