const Link = require("../schema/link.schema");
const mongoose = require("mongoose");
const moment = require("moment");

// ✅ Get analytics data
exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ 1. Total clicks on links, shop, and CTA
    const totalClicks = await Link.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$clicks" },
        },
      },
    ]);

    const analyticsOverview = {
      links: totalClicks.find((item) => item._id === "social")?.total || 0,
      shop: totalClicks.find((item) => item._id === "shop")?.total || 0,
      cta: totalClicks.find((item) => item._id === "cta")?.total || 0,
    };

    // ✅ 2. Clicks in the last 6 months
    const last6Months = await Link.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },

      { $unwind: { path: "$clickData", preserveNullAndEmptyArrays: true } },

      {
        $match: {
          "clickData.date": {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$clickData.date" },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    console.log("Last 6 Months Clicks:", last6Months);

    const recentClicks = await Link.find({}, { clickData: 1 }).limit(5);
    console.log("Recent Clicks Data:", recentClicks);

    // ✅ 3. Traffic by Device
    const trafficByDevice = await Link.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$device",
          total: { $sum: "$clicks" },
        },
      },
    ]);

    // ✅ 4. Clicks by Site
    const clicksBySite = await Link.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$platform",
          total: { $sum: "$clicks" },
        },
      },
    ]);

    // ✅ 5. Traffic by Links
    const trafficByLinks = await Link.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$title",
          total: { $sum: "$clicks" },
        },
      },
    ]);

    res.status(200).json({
      analyticsOverview,
      last6Months,
      trafficByDevice,
      clicksBySite,
      trafficByLinks,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
