import { Sequelize } from "sequelize";

const db = new Sequelize("library_management", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default db;
