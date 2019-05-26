import  UserDao from  '../../dao/user/userDao'

class  userService{
    constructor(){

        this.userDao=new UserDao;
    }


    add(user){
        this.userDao.add(user)
    }


    findById(user,callback){
          this.userDao.findById(user,function (resData) {
              callback(resData);
          });
    }

    findAll(user){
        this.userDao.findAll(user)
    }
    edit(user){
        this.userDao.edit(user);
    }
}

module.exports =userService ;