const fs = require("fs");

module.exports.getAll = async () => {
    const users = await getUserData();
    const usersWithAge = []
    for (let user of users) {
        const age = calculateAge(user.birthdate);
        user = {
            ...user,
            age: age
        }
        usersWithAge.push(user)
    };
    return usersWithAge
};

module.exports.post = async (newUser) => {
    const existUsers = await getUserData();
    const userData = { id: existUsers.length + 1, ...newUser };
    existUsers.push(userData);
    saveUserData(existUsers);
    return (userData);
}

module.exports.put = async (userId, newUser) => {
    const existUsers = await getUserData();
    const findExist = existUsers.findIndex(user => user.id === userId);
    if (findExist == -1) {
        return ({ error: true, msg: 'id not exist' });
    };
    let updateUser = existUsers[findExist];
    updateUser = {
        ...updateUser,
        ...newUser
    };
    existUsers[findExist] = updateUser;
    saveUserData(existUsers);
    return updateUser;
}

module.exports.getById = async (userId) => {
    const existUsers = await getUserData();
    const findExist = existUsers.find(user => user.id === userId);
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'user not exist' });
    };
    const age = calculateAge(findExist.birthdate);
    const userWithAge = {
        ...findExist,
        age: age
    };
    return userWithAge;
}

module.exports.delete = async (userId) => {
    const existUsers = await getUserData();
    const filterUser = existUsers.filter(user => user.id !== userId);
    if (existUsers.length === filterUser.length) {
        return ({ error: true, msg: 'user does not exist' });
    }
    saveUserData(filterUser);
    return ({ id: filterUser.indexOf(userId) });
}

const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync('./db/users.json', stringifyData);
};

const getUserData = async () => {
    const jsonData = await fs.promises.readFile('./db/users.json');
    return JSON.parse(jsonData);
};

const calculateAge = (birthdate) => {
    const today = new Date();
    const dateOfBirth = birthdate;
    const year = Number(dateOfBirth.substr(0, 4));
    const month = Number(dateOfBirth.substr(5, 2)) - 1;
    const day = Number(dateOfBirth.substr(8, 2));
    let age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        age--;
    };
    return age;
};