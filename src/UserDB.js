const fs = require("fs");


class UsersDb {
    constructor(path = '') {
        this.pathDB = path
    }
    async getAll() {
        const users = await getJsonDataFromFile(this.pathDB)
        users.map((user) => { user.age = calculateAge(user.birthdate) })
        return users;
    }
    async getOne(userId = 0) {
        const users = await getJsonDataFromFile(this.pathDB)
        if (userId > users.length) return;
        const user = users.find(user => user.id === userId)
        user.age = calculateAge(user.birthdate)
        return user;
    }
    async add(userData = {}) {
        const users = await getJsonDataFromFile(this.pathDB)
        let id = 1;
        for (let user of users) {
            if (user.id === id) {
                id++;
            }
            else return;
        }
        const user = { id: id, ...userData }
        users.push(user);
        saveUserData(this.pathDB, users);
        return user;
    }
    async updateUser(userId = 0, userData = {}) {
        const existUsers = await getJsonDataFromFile(this.pathDB);
        const findExist = existUsers.findIndex(user => user.id === userId);
        if (findExist == -1) {
            return;
        };
        let updateUser = existUsers[findExist];
        updateUser = {
            ...updateUser,
            ...userData
        };
        existUsers[findExist] = updateUser;
        saveUserData(this.pathDB, existUsers);
        return updateUser;
    }
    async deleteUser(userId = 0) {
        const existUsers = await getJsonDataFromFile(this.pathDB);
        const filterUser = existUsers.filter(user => user.id !== userId);
        if (existUsers.length === filterUser.length) {
            return;
        };
        saveUserData(this.pathDB, filterUser);
        return ({ id: filterUser.indexOf(userId) });
    }
}

const saveUserData = (path, data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFile(path, stringifyData, (error) => {
        if (error) console.log('error', error)
    });
};

const getJsonDataFromFile = (path) => {
    return fs.promises.readFile(path, (error) => {
        if (error) console.log('error', error)
    }).then(JSON.parse)
    //TODO handle file read errors 
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

module.exports = UsersDb