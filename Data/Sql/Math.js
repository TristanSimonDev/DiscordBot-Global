let MathUtils  = {}

MathUtils.random_xp = () => {
    return xp_gain = Math.floor(Math.random() * 5 + 3)
}

MathUtils.required_xp = (user_level) => {
    return Math.max(1, Math.log(user_level) * (Math.sqrt(((user_level * Math.log(Math.max(2, user_level))) * user_level) / Math.log10(Math.max(2, user_level))))) * Math.max(1, Math.log(Math.log(user_level)) * Math.log10(user_level)) | 1
}

MathUtils.level_boost = (user_level) => {
    return (Math.log10(user_level + 1 / (user_level + 1 / Math.log(user_level) + 1)) * user_level) + 1
}

MathUtils.level_skipps = (user_xp, required_xp) => {
    return Math.floor((Math.sqrt(1 + 8 * (user_xp / required_xp)) - 1) / 2);
}

//MathUtils
module.exports = MathUtils 