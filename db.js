const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://test:test@test.bu1rlwd.mongodb.net/test",
  (err) => {
    if (!err) console.log("Connected to MongoDB");
    else console.log("Failed to connect to MongoDB");
  }
);
