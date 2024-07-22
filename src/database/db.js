import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'mainDB',
        location: 'default',
    },
    () => {
        console.log('Database opened successfully');
    },
    error => {
        console.log('Error opening database:', error);
    }
);

export default db;
