import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    event["db"] = await mysql.createConnection({
    });
});
