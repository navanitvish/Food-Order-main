const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const DBConnect = require("./config/database");
const rootEndPoint = require("./config/entrypoint");
dotenv.config();
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,authorization",
};

app.use(cors(corsOptions));

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

DBConnect();

const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");
const menuRoutes = require("./routes/menuRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const couponRoutes = require("./routes/couponRoutes");
const restaurantUserRoutes = require("./routes/restaurent/restaurentRoutes");
const restaurantUserOwnerRoutes = require("./routes/restaurent/restaurentAcessRoute");
const driverUserRoutes = require("./routes/driver/driverRoutes");
const driverUserOwnRoutes = require("./routes/driver/driverAcessRoutes");
const resturantCategory = require("./routes/resturantCategoryRoutes");
const settlementRoutes = require("./routes/settlementRoutes");
const driverTransactionRoutes = require("./routes/driverTransactionRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const paymentHistoryRoutes = require("./routes/paymentHistoryRoute");
const routes = [
  {
    path: `${rootEndPoint}/user/`,
    func: userRoutes,
  },
  {
    path: `${rootEndPoint}/location/`,
    func: locationRoutes,
  },
  {
    path: `${rootEndPoint}/menus/`,
    func: menuRoutes,
  },
  {
    path: `${rootEndPoint}/order/`,
    func: ordersRoutes,
  },
  {
    path: `${rootEndPoint}/restaurant/`,
    func: restaurantRoutes,
  },
  {
    path: `${rootEndPoint}/categories/`,
    func: categoryRoutes,
  },
  {
    path: `${rootEndPoint}/banner/`,
    func: bannerRoutes,
  },
  {
    path: `${rootEndPoint}/review/`,
    func: reviewRoutes,
  },
  {
    path: `${rootEndPoint}/coupon/`,
    func: couponRoutes,
  },
  {
    path: `${rootEndPoint}/restaurantowner/`,
    func: restaurantUserRoutes,
  },
  {
    path: `${rootEndPoint}/restaurantowneruser/`,
    func: restaurantUserOwnerRoutes,
  },
  {
    path: `${rootEndPoint}/driver/`,
    func: driverUserRoutes,
  },
  {
    path: `${rootEndPoint}/driveruser/`,
    func: driverUserOwnRoutes,
  },
  {
    path: `${rootEndPoint}/restcategory/`,
    func: resturantCategory,
  },
  {
    path: `${rootEndPoint}/settle/`,
    func: settlementRoutes,
  },
  {
    path: `${rootEndPoint}/drivertransaction/`,
    func: driverTransactionRoutes,
  },
  {
    path: `${rootEndPoint}/dashboard/`,
    func: adminDashboardRoutes,
  },
  {
    path: `${rootEndPoint}/report/`,
    func: reportRoutes,
  },
  {
    path: `${rootEndPoint}/paymenthistory/`,
    func: paymentHistoryRoutes,
  },
];
routes.forEach(({ path, func }) => {
  app.use(path, func);
});
server.listen(process.env.PORT, (port) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
