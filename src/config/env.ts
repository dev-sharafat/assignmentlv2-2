import 'dotenv/config'

export const config = {
    port: process.env.PORT || 5000,
    db: {
        userName: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }
}