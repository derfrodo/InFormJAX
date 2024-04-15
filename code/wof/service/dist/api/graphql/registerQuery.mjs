export function getQueryResolvers() {
    return {
        displaySettings: {
            resolve: async (source, args, context, info) => {
                return { showResultAfterMS: 100, showResultForMS: 1000, __typename: "DisplaySettings" };
            }
        }
    };
}
