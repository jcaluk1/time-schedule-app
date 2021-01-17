const file = require("../utils/file");
const path = require("path");
const fileLocation = path.join(__dirname, "../aktivnosti.txt");

const Activity = {
    getActivities: async () => {
        try {
            const data = await file.read(fileLocation);
            const activities = data.trim().split("\n").map(row => {
                const [naziv, tip, pocetak, kraj, dan] = row.trim().split(",");
                return { naziv, tip, dan, pocetak, kraj };
            });
            return activities;
        } catch (err) {
            return [];
        }
    },
    setActivites: async (activites) => {
        const data = activites.map(act => `${act.naziv},${act.tip},${act.pocetak},${act.kraj},${act.dan}`).join("\n");
        await file.write(fileLocation, data);
        return true;
    }
};

module.exports = Activity;
