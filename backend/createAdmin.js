const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User"); // ✅ USE USER

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    // 🔥 delete old users (optional but recommended)
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: "sandugadesaniya@gmail.com",
      password: hashedPassword,
    });

    console.log("✅ User (Admin) Created Successfully");
    process.exit();

  } catch (err) {
    console.log(err);
  }
};

createAdmin();