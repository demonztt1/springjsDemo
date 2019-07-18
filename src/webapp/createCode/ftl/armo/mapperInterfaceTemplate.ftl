`package com.bireturn.amro.tdms.em.dao.mapper.${packageName};

import com.bireturn.amro.tdms.em.dao.entity.emeo.${toCamelCaseVer(tableName,1)};
import tk.mybatis.mapper.common.Mapper;

public interface ${toCamelCaseVer(tableName,1)}Mapper extends Mapper<${toCamelCaseVer(tableName,1)}> {

}`