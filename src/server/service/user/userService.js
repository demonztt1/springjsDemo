
let  Service =qGuan.find("service")
let  Resource =qGuan.find("resource")

@Service("userService")
@Resource("userDao")
class  userService{

    add(user){
        console.log("add")
      // this.userDao.add(user)
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