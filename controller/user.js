exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    console.log("REQ PROFILE:",req.profile)
    return res.json(req.profile)

}