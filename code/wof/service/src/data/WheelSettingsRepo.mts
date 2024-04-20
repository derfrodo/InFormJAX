import { DataTypes, Model, Sequelize } from "sequelize";
import { defaultSessionWheelSettings } from "../api/data/sessionWheelSettings.mjs";
import { WheelSettings } from "../api/generated-types/graphql.mjs";
import { getSequelize } from "./sequelize.mjs";

class WheelSettingsModel extends Model<WheelSettings & { id: number }> { }

let repo: (ReturnType<typeof createWheelSettingsRepo> extends Promise<infer T> ? T : never) | null = null;
export const getWheelSettingsRepo = async () => {
    const sequelize = await getSequelize();

    if (repo) {
        return repo;
    }
    repo = await createWheelSettingsRepo(sequelize);
    return repo;
}

async function createWheelSettingsRepo(sequelize: Sequelize) {
    const repo = sequelize.define<WheelSettingsModel>("WheelSettings", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        minClickDelayMS: {
            type: DataTypes.INTEGER
        },

        minAutoplayDurationMS: {
            type: DataTypes.INTEGER
        },
        autoplayAddMaxMS: {
            type: DataTypes.INTEGER
        },
        radius: {
            type: DataTypes.INTEGER
        },
        rotationDurationInner: {
            type: DataTypes.INTEGER
        },
        rotationDurationNotPlaying: {
            type: DataTypes.INTEGER
        },
        rotationDurationPlaying: {
            type: DataTypes.INTEGER
        },
    });
    await repo.sync({});
    await repo.findOrCreate({
        where: {
            id: 1
        },
        defaults: {
            ...defaultSessionWheelSettings
        }
    });
    return repo;
}
