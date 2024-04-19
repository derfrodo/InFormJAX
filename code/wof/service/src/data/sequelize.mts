import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite",
});

export async function getSequelize() {
    await sequelize.authenticate();
    await sequelize.sync({});
    return sequelize;
}