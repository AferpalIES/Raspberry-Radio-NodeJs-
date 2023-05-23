import mysql from "mysql";

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "pyc",
  password: "pyc2022!",
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

