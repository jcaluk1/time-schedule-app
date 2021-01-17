module.exports = (error, req, res, next) => {
    console.log({ error });
    res.status(400).json({ succes: false, error });
}