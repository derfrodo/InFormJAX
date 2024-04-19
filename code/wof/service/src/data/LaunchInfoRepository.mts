import { DataTypes, Model, Sequelize } from "sequelize"
import { getSequelize } from "./sequelize.mjs";

class LaunchInfo extends Model<{
    date: Date;
    initialized: boolean;
}> { }

let repo: (ReturnType<typeof createLaunchInfoRepository> extends Promise<infer T> ? T : never) | null = null;
export const getLaunchInfoRepository = async () => {
    const sequelize = await getSequelize();

    if (repo) {
        return repo;
    }
    repo = await createLaunchInfoRepository(sequelize);
    return repo;
}

async function createLaunchInfoRepository(sequelize: Sequelize) {
    const repo = sequelize.define<LaunchInfo>("LaunchInfos", {
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        initialized: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    await repo.sync({});
    return repo;
}
