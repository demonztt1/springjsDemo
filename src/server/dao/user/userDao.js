import  connection from  '../../../config/mysqldb'




class  userDao{
    constructor(){
        this.connection=connection;
    }


    add(user){
        let  addSql = 'INSERT INTO sys_user ( name,pwd ) VALUES( ?,?)';
        //解析请求参数
        var params = URL.parse(req.url, true).query;
        var addSqlParams = [ user.name ,user.pwd];

        //增
        this.connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
        });
    }

    findById(id,callback){
        let  sql = 'SELECT * FROM sys_user';
        //查
        this.connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            //    console.log(params.id);
            //把搜索值输出
            callback(result);

        });
    }

    findAll(){
        let  sql = 'SELECT * FROM sys_user';
        //查
        this.connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            //    console.log(params.id);

            //把搜索值输出
            return result;
        });
    }

    edit(user){

        let  editSql = 'UPDATE sys_user SET  `name`=?  WHERE id = ?';
        //解析请求参数
        let params = URL.parse(req.url, true).query;
        let editSqlParams = [ user.name,user.id ];

        //增
        this.connection.query(editSql,editSqlParams,function (err, result) {
            if(err){
                console.log('[UPDATE  ERROR] - ',err.message);
                return;
            }
        });
    }
}
module.exports =userDao ;