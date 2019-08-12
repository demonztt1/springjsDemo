`package com.bireturn.amro.tdms.em.services.${packageName};

import com.bireturn.amro.exception.common.CommonSystemException;
import com.bireturn.amro.framework.AmroContextUtil;
import com.bireturn.amro.framework.Result;
import com.bireturn.amro.framework.context.AmroContext;
import com.bireturn.amro.init.LoginAccount;
import com.bireturn.amro.tdms.constants.ErrorMsgConstant;
import com.bireturn.amro.tdms.em.dao.entity.${packageName}.${toCamelCaseVer(tableName,1)};
import com.bireturn.amro.tdms.em.dao.mapper.${packageName}.${toCamelCaseVer(tableName,1)}Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @author 闫景军
 * @version 1.0
 * @ClassName ${toCamelCaseVer(tableName,1)}Service
 * @Description
 * @date 2019/3/28  17:57
 **/
@Component("${toCamelCaseVer(tableName)}Service")
public class ${toCamelCaseVer(tableName,1)}Service {
    Logger logger = LoggerFactory.getLogger(${toCamelCaseVer(tableName,1)}Service.class);

    @Resource
    ${toCamelCaseVer(tableName,1)}Mapper ${toCamelCaseVer(tableName)}Mapper;



    //增加或编辑
    public Result addOrEdit() {
        AmroContext context = AmroContextUtil.getAmroContext();
        ${toCamelCaseVer(tableName,1)} ${toCamelCaseVer(tableName)}= context.getRequestParamClass(${toCamelCaseVer(tableName,1)}.class);
        LoginAccount loginAccount = context.getLoginAccount();
        String user = loginAccount.getAccountId();
        Result res=new Result();
        try {
            if(null!=${toCamelCaseVer(tableName)}.getPkid()){
                ${toCamelCaseVer(tableName)}Mapper.updateByPrimaryKeySelective(${toCamelCaseVer(tableName)});
            }else {
                ${toCamelCaseVer(tableName)}Mapper.insert(${toCamelCaseVer(tableName)});
            }

            res.setCode(0);
        }  catch (Exception e) {
            logger.error("新增修改数据失败！", e);
            CommonSystemException.throwCustomException(ErrorMsgConstant.ERR_DEL_BY_SELF, new Object[]{e.toString()});
        }
        return  res;
    }

    //删除
    public Result del(){
        AmroContext context = AmroContextUtil.getAmroContext();
        ${toCamelCaseVer(tableName,1)} ${toCamelCaseVer(tableName)}= context.getRequestParamClass(${toCamelCaseVer(tableName,1)}.class);
        LoginAccount loginAccount = context.getLoginAccount();
        String user = loginAccount.getAccountId();
        Result res=new Result();
        ${toCamelCaseVer(tableName,1)} new${toCamelCaseVer(tableName,1)};
        try {
            if(null!=${toCamelCaseVer(tableName)}.getPkid()){

                new${toCamelCaseVer(tableName,1)}=${toCamelCaseVer(tableName)}Mapper.selectByPrimaryKey(${toCamelCaseVer(tableName)});
            }else {
                return  Result.buildError();
            }
            if (null==new${toCamelCaseVer(tableName,1)}){
                return  Result.buildError();
            }

            ${toCamelCaseVer(tableName)}Mapper.deleteByPrimaryKey(${toCamelCaseVer(tableName)});
            res=Result.buildSuccess();
        }  catch (Exception e) {
            logger.error("删除数据失败！", e);
            CommonSystemException.throwCustomException(ErrorMsgConstant.ERR_DEL_BY_SELF, new Object[]{e.toString()});
        }
        return  res;
    }
}`
