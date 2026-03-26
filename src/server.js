require("dotenv").config();

const app = require("./app");
const prisma = require("./config/prisma");

const PORT = process.env.PORT || 5000;

async function testDB() {
  try {
    const users = await prisma.user.findMany();
    console.log("Prisma connected. Users:", users);
  } catch (err) {
    console.error("Prisma error:", err.message);
  }
}

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await testDB();
});