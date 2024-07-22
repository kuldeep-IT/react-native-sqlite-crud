import db from './db';

export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT, Password TEXT);',
            [],
            () => {
                console.log('Table created successfully');
            },
            error => {
                console.log('Error creating table:', error);
            }
        );
    });
};

export const addUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Users (Name, Email, Password) VALUES (?, ?, ?);',
                [name, email, password],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        resolve(true);
                    } else {
                        reject(new Error('Failed to add user'));
                    }
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

export const getUsers = (setUsers) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Users;',
            [],
            (tx, results) => {
                const rows = results.rows;
                let users = [];
                for (let i = 0; i < rows.length; i++) {
                    users.push({
                        ...rows.item(i),
                    });
                }
                setUsers(users);
            },
            error => {
                console.log('Error fetching users:', error);
            }
        );
    });
};
