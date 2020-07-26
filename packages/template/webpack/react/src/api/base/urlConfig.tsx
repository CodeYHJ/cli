
export const getUrl = () => {
    const env = process.env.NODE_ENV
    if (env === 'pro') {
        return "proUrl"
    } else {
        return "/pi"
    }
}