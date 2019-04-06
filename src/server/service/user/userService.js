import  userDao from  '../../dao/user/userDao'

class  userService{
    constructor(){
        this.userDao=userDao;
    }


    add(user){
        userDao.add(user)
    }


    findById(user){
        userDao.findById(user)
    }

    findAll(user){
        userDao.findAll(user)
    }
    edit(user){
        userDao.edit(user);
    }
}