import { DataTypes, Model, Sequelize } from "sequelize";
import { getSequelize } from "./sequelize.mjs";

type Game = {
    lastUpdate: number;
    date: string;
    isRunning: boolean;
    isRoundDone: boolean;
    canToggle: boolean;
};

class GameModel extends Model<Game & { id: number }> { }

let repo: (ReturnType<typeof createGameRepo> extends Promise<infer T> ? T : never) | null = null;
export const getGameRepo = async () => {
    const sequelize = await getSequelize();

    if (repo) {
        return repo;
    }
    repo = await createGameRepo(sequelize);
    return repo;
}

async function createGameRepo(sequelize: Sequelize) {
    const repo = sequelize.define<GameModel>("Games", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        lastUpdate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isRunning: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isRoundDone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        canToggle: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    await repo.sync({});
    repo.findOrCreate({
        where: { id: 1 },
        defaults: {
        }
    })
    return repo;
}
