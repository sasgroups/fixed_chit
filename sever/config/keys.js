module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://punnamganesh752_db_user:AbUg7yMu1Is4HyXW@ac-1wu4tgf-shard-00-00.qe4yvjf.mongodb.net:27017,ac-1wu4tgf-shard-00-01.qe4yvjf.mongodb.net:27017,ac-1wu4tgf-shard-00-02.qe4yvjf.mongodb.net:27017/chitfund?ssl=true&replicaSet=atlas-104v91-shard-0&authSource=admin&appName=Cluster0',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here'
};
