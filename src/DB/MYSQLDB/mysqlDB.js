import mysql from "mysql";
import { config } from "dotenv";
config();
const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: `${process.env.user}`,
  password: `${process.env.password}`,
  database:"Radio"
});
conn.connect(function (err) {
  if (err) {
      console.log('Error connecting to Database',err);
      return;
  }
  console.log('Connection established');
});
export default conn;

