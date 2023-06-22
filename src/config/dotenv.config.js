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
        user:"adminCoder@coder.com",
        pass:"adminCod3r123"
    }
}