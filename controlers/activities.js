const Activity = require("../modelsFile/Activity");


exports.getActivites = async (req, res, next) => {
    return res.json(req.activites);
};

exports.postActivity = async (req, res, next) => {
    const { pocetak, kraj, dan } = req.body;
    const someActivityOverlap = req.activites.some(act => dan == act.dan && act.pocetak < kraj && kraj <= act.kraj || pocetak < act.kraj && act.kraj < kraj);
    if (someActivityOverlap) {
        return res.status(400).json({ message: "Već postoji aktivnost u datom terminu" });
    }
    await Activity.setActivites([...req.activites, req.body]);
    return res.status(201).json({ message: "Uspješno dodana aktivnost!" });
};

exports.deleteActivity = async (req, res, next) => {
    const differentNameActivites = req.activites.filter(act => act.naziv !== req.params.naziv.trim());
    if (req.activites.length === differentNameActivites.length) {
        res.status(400).json({ message: "Greška - aktivnost nije obrisana!" });
    } else {
        await Activity.setActivites(differentNameActivites);
        res.status(202).json({ message: "Uspješno obrisana aktivnost!" });
    }
};
