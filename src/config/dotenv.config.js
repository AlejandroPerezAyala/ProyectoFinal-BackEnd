import dotenv from 'dotenv'

dotenv.config()

export const config = {
    server: {
        port: process.env.PORT
    },
    db: {
        url: process.env.MONGO_URL
    },
    auth:{
        user:process.env.ADMIN_USER,
        pass:process.env.ADMIN_PASSWORD
    }
}