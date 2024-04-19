import { DataTypes, Model, Sequelize } from "sequelize";
import { getSequelize } from "./sequelize.mjs";
import { getGameRepo } from "./GameRepo.mjs";

type GameResult = {
    resultId: number;
    date: string;
}

class GameResultModel extends Model<GameResult & { id: number }> {

}

let repo: (ReturnType<typeof createGameResultsRepo> extends Promise<infer T> ? T : never) | null = null;
export const getGameResultsRepo = async () => {
    const sequelize = await getSequelize();

    if (repo) {
        return repo;
    }
    repo = await createGameResultsRepo(sequelize);
    return repo;
}

async function createGameResultsRepo(sequelize: Sequelize) {
    const repo = sequelize.define<GameResultModel>("GameResults", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        resultId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    repo.belongsTo(await getGameRepo())

    await repo.sync({});
    return repo;
}
