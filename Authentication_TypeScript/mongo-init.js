// MongoDB initialization script
db = db.getSiblingDB('auth_db');

// Create a user for the auth_db database
db.createUser({
    user: 'auth_user',
    pwd: 'auth_password',
    roles: [
        {
            role: 'readWrite',
            db: 'auth_db'
        }
    ]
});

// Create collections if needed
db.createCollection('users');

print('MongoDB initialization completed for auth_db database');
