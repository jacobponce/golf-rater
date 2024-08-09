module.exports = {
    port: process.env.PORT || 3000,
    db: {
        user: process.env.DB_USERNAME || 'me',
        password: process.env.DB_PASSWORD || 'ilovegolf',
        database: process.env.DB_NAME || 'api',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: 5432,
    },
};