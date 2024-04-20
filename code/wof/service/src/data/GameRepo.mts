import { DataTypes, Model, Sequelize } from "sequelize";
import { getSequelize } from "./sequelize.mjs";

export type Game = {
    lastUpdate: number;
    date: string;
    isRunning: boolean;
    isRoundDone: boolean;
    canToggle: boolean;
    resultId: null | string | number;
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
        resultId: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
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
    await repo.findOrCreate({
        where: { id: 1 },
        defaults: {
            isRoundDone: true,
            isRunning: false,
            lastUpdate: performance.now(),
            canToggle: true,
            resultId: null
        }
    });
    return repo;
}
