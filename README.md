# CRUD Learning WebApp Express+Rest+React

## ToDo

- [X] GET `/users` - return all data from `users.json` file
- [X] POST `/users` - add new user to `users.json` file
    -[X] create id - take largetst id from users and new id will be this number + 1
- [X] PUT `/users/1` - update user from `users.json` with id `1`
- [X] GET `/users/1` - return user from `users.json` with id `1`
- [X] DELETE `/users/1` - delete user from `users.json` with id `1`
    - [X] create tests for delete
- [ ] user object should contain age calculated from birthdate

Refactoring
-[ ] UserDB module
-[ ] Validation

## Instal, run, test

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run test
```

go to browser and open `http://localhost:5000`


## Git branches Workflow

when starting to work on task need to open new branch `feature/`

```bash
git checkout -b feature/branch-name
```
