import { QueryResolvers, Resolver, Resolvers } from "../generated-types/graphql.mjs";

export function getResolvers(): Resolvers {
  return {
    DisplaySettings: {
      showResultAfterMS: {
        resolve:
          async (source, args, context, info) => {
            return 100;
          }
      },
    }
  }
}

type PartialResolve<T> = { [key in keyof T]: T[key] extends Resolver<infer TR> ? Resolver<Partial<TR>> : T[key] };

export function getQueryResolvers(): PartialResolve<QueryResolvers> {
  return {
    displaySettings: {
      resolve:
        async (source, args, context, info) => {
          return { showResultAfterMS: 100, };
        }
    },
    gameSettings: {
      resolve() {
        return {
          maxSpins: 3,
          chanceToWin: 0.5,
          sumOfChances: 12,
          sumOfLooseChance: 12,
          sumOfWinChance: 12
        };
      }
    },

    firstname: {
      resolve() {
        return "Stefan"
      }
    },
  };
}