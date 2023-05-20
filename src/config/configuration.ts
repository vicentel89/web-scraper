export default () => ({
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
});
