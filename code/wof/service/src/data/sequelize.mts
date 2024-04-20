import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite",
    logging: false
});

export async function getSequelize() {
    await sequelize.authenticate();
    await sequelize.sync({});
    return sequelize;
}