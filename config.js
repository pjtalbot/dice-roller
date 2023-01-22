require('dotenv').config();

const DB_URI = process.env.NODE_ENV === 'test' ? 'postgresql:///roller_test' : 'postgresql:///roller';

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
	DB_URI,
	SECRET_KEY,
	BCRYPT_WORK_FACTOR
};
