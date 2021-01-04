const fs = require("fs");

exports.read = (fileLocation) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileLocation, "utf8", (err, data) => {
            if (err) reject(err);
            else resolve(data.toString());
        });
    });
};

exports.write = (fileLocation, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileLocation, data, (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
};
