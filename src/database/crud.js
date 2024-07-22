import db from './db';

export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT, Password TEXT, DateCreated TEXT);',
            [],
            () => {
                console.log('Table created successfully');
            },
            error => {
                console.log('Error creating table:', error);
            }
        );

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ContactInfo (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Phone TEXT, Address TEXT, Email TEXT);',
            [],
            () => {
                console.log('ContactInfo table created successfully');
            },
            error => {
                console.log('Error creating ContactInfo table:', error);
            }
        );
    });
};

export const addUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
        const dateCreated = new Date().toISOString(); // Current date and time in ISO format
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Users (Name, Email, Password, DateCreated) VALUES (?, ?, ?, ?);',
                [name, email, password, dateCreated],
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


export const updateUser = (email, name, password) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE Users SET Name = ?, Password = ? WHERE Email = ?;',
                [name, password, email],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        resolve(true);
                    } else {
                        reject(new Error('Failed to update user'));
                    }
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

export const getUserByEmail = (email, setUser) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Users WHERE Email = ?;',
            [email],
            (tx, results) => {
                if (results.rows.length > 0) {
                    setUser(results.rows.item(0));
                } else {
                    setUser(null);
                }
            },
            error => {
                console.log('Error fetching user:', error);
            }
        );
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

export const addContactInfo = (email, name, phone, address) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO ContactInfo (Email, Name, Phone, Address) VALUES (?, ?, ?, ?);',
                [email, name, phone, address],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        resolve(true);
                    } else {
                        reject(new Error('Failed to add contact information'));
                    }
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

export const updateContactInfo = (email, name, phone, address) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE ContactInfo SET Name = ?, Phone = ?, Address = ? WHERE Email = ?;',
                [name, phone, address, email],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        resolve(true);
                    } else {
                        reject(new Error('Failed to update contact information'));
                    }
                },
                error => {
                    reject(error);
                }
            );
        });
    });
};

export const getContactInfoByEmail = (email, setContactInfo) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM ContactInfo WHERE Email = ?;',
            [email],
            (tx, results) => {
                if (results.rows.length > 0) {
                    setContactInfo(results.rows.item(0));
                } else {
                    setContactInfo(null);
                }
            },
            error => {
                console.log('Error fetching contact information:', error);
            }
        );
    });
};