const app = require("./index");

const connect = require("../configs/db");
const port = process.env.PORT || 8000;
app.listen(port, () => {
  connect();
  console.log(`Listening to port ${port}`);
});