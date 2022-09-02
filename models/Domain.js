var mongoose = require("mongoose");

const domainSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
});

module.exports = mongoose.model("Domain", domainSchema);
