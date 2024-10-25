const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-route");

main()
  .then(() => console.log("Mongoose Connected"))
  .catch((error) => console.log(error));

async function main() {
  await mongoose.connect(
    "mongodb+srv://musabhassan1999:Hassan123@cluster0.dg2aakn.mongodb.net/megamart"
  );
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
