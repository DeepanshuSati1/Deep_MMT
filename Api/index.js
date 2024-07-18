import express from "express";
import dotenv from "dotenv";
import authen from "./routes/authen.js";
import bookings from "./routes/booking.js";
import flight from "./routes/flight.js";
import hotels from "./routes/hotel.js";
import users from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/connectdb.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authen);
app.use("/api/users", users);
app.use("/api/hotels", hotels);
app.use("/api/booking", bookings);
app.use("/api/air", flight);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(port, () => console.log(`> Server running on port ${port}`));
