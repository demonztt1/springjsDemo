
import { Service } from './qguan/stc/com/1110111011101110/qguan/decorator/Service.js'
import { Resource } from './qguan/stc/com/1110111011101110/qguan/decorator/Resource.js'


@Service("userService")
@Resource("userDao")
class  userService{

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