function Success(params) {
    res.json({ status: "Success", role: user.role });
}

function IncorrectPass(params) {
    res.json({ status: "IncorrectPassword" });
}

function NoRecord(params) {
    res.json({ status: "NoRecordExists" });
}

module.exports = {Success, IncorrectPass, NoRecord}