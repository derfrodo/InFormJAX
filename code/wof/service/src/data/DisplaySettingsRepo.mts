import { DataTypes, Model, Sequelize } from "sequelize";
import { sessionWheelSettings } from "../api/data/sessionWheelSettings.mjs";
import { DisplaySettings, WheelSettings } from "../api/generated-types/graphql.mjs";
import { getSequelize } from "./sequelize.mjs";
import { sessionDisplaySettings } from "../api/data/sessionDisplaySettings.mjs";

class DisplaySettingsModel extends Model<DisplaySettings & { id: number }> { }

let repo: (ReturnType<typeof createDisplaySettingsRepo> extends Promise<infer T> ? T : never) | null = null;
export const getDisplaySettingsRepo = async () => {
    const sequelize = await getSequelize();

    if (repo) {
        return repo;
    }
    repo = await createDisplaySettingsRepo(sequelize);
    return repo;
}

async function createDisplaySettingsRepo(sequelize: Sequelize) {
    const repo = sequelize.define<DisplaySettingsModel>("WheelSettings", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        showResultAfterMS: {
            type: DataTypes.INTEGER
        },
        showResultForMS: {
            type: DataTypes.INTEGER
        },
    });
    await repo.sync({});
    await repo.findOrCreate({
        where: {
            id: 1
        },
        defaults: {
            ...sessionDisplaySettings
        }
    });
    return repo;
}
