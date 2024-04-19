import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";
import { WHEELVALUES, getMaternaValue } from "../api/data/getWheelValues.mjs";
import { getSequelize } from "./sequelize.mjs";
import { WheelValueData } from "./WheelValueData.mjs";

class WheelValueModel extends Model<WheelValueData> { }

let repo: (ReturnType<typeof createWheelValuesRepo> extends Promise<infer T> ? T : never) | null = null;
export const getWheelValuesRepo = async () => {
    const sequelize = await getSequelize();

    if (repo) {
        return repo;
    }
    repo = await createWheelValuesRepo(sequelize);
    return repo;
}

async function createWheelValuesRepo(sequelize: Sequelize) {
    const repo = sequelize.define<WheelValueModel>("WheelValues", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageText: {
            type: DataTypes.STRING,
        },
        imagePath: {
            type: DataTypes.STRING,
        },
        winText: {
            type: DataTypes.STRING,
        },
        win: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        winChance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },


    })
    await repo.sync({});
    const count = await repo.findAndCountAll();

    if (count.count === 0) {
        console.log("Initialize Default Wheel Values")
        for (const value of [(await getMaternaValue()), ...WHEELVALUES]) {
            await repo.findOrCreate({ where: { name: value.name }, defaults: { ...value } })
        }

    }
    return repo;
}


