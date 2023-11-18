const sequelize = require('../db/sequalize')
const User = require('../db/models/user')
const crypto = require('crypto');

async function getUsers() {
    const users = await User.findAll()
    return users
}

async function insertUser(email, password) {
    try {
      await sequelize.sync();
        const hash = crypto.createHash('sha256');
        hash.update(password);
        const hashedPassword = hash.digest('hex');
        
      const newUser= await User.create({
        email,
        password: hashedPassword
      });
      return newUser;
    } 
    catch (error) {
      console.error('There was an error: ', error);
    }
  }

  async function deleteUser(email) {
    try {
        const userToDelete = await User.findOne({
            where: {
                email: email
            }
        });

        if (!userToDelete) {
            return null; 
        }

        await userToDelete.destroy();
        return userToDelete; 
    } catch (error) {
        console.error('There was an error:', error);
        throw error; 
    }
}

async function login(email, password) {
  try {
      const user = await User.findOne({
          where: {
              email,
          }
      });

      if (!user) {
          throw new Error('Wrong email or password');
      }


      const hash = crypto.createHash('sha256');
      hash.update(password);
      const hashedPassword = hash.digest('hex');

      if (hashedPassword !== user.password) {
          throw new Error('Wrong username or password');
      }

      return user;
  } catch (error) {
      throw new Error(error.message);
  }
}
  
module.exports = {
    getUsers,
    insertUser,
    deleteUser, 
    login
}
