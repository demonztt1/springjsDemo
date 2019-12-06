`package com.bireturn.amro.tdms.em.dao.entity.${packageName};

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;
@Table(name = "${tableName}")
public class ${toCamelCaseVer(tableName,1)} {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select SEQ_${tableName.toUpperCase()}_PKID.nextval from dual")

   ${ (function () {
            let str=""
        fields.forEach((fobj,i)=>{
        str= str+`

        //	${fobj.COMMENTS} 	${tableName}.${fobj.COLUMN_NAME}	length=${fobj.DATA_LENGTH}	nullable=${fobj.NULLABLE}`

       if ( fobj.DATA_TYPE === "NVARCHAR2"){
      str= str+ `
       private String  ${toCamelCaseVer(fobj.COLUMN_NAME)};`
       }
       if ( fobj.DATA_TYPE === "DATE"){
         str= str+ `
        private Date  ${toCamelCaseVer(fobj.COLUMN_NAME)};`
        }

     if ( fobj.DATA_TYPE === "INT"){
              str= str+ `
     private int  ${toCamelCaseVer(fobj.COLUMN_NAME)};`
     }

        })

        return str;
        })()}

    // set get方法
    ${ (function () {
             let str=""
    fields.forEach((fobj,i)=>{
        str= str+`

        //	${fobj.COMMENTS} 	${tableName}.${fobj.COLUMN_NAME}	length=${fobj.DATA_LENGTH}	nullable=${fobj.NULLABLE}`
       if ( fobj.DATA_TYPE === "NVARCHAR2"){
      str= str+ `
       public String get${toCamelCaseVer(fobj.COLUMN_NAME,1)}() {

              return ${toCamelCaseVer(fobj.COLUMN_NAME)};
        }

        public void set${toCamelCaseVer(fobj.COLUMN_NAME,1)}(String ${toCamelCaseVer(fobj.COLUMN_NAME)}) {

                this.${toCamelCaseVer(fobj.COLUMN_NAME)} = ${toCamelCaseVer(fobj.COLUMN_NAME)};
        }
       `
       }
       if ( fobj.DATA_TYPE === "DATE"){
         str= str+ `
      public Date get${toCamelCaseVer(fobj.COLUMN_NAME,1)}() {

             return ${toCamelCaseVer(fobj.COLUMN_NAME)};
       }

       public void set${toCamelCaseVer(fobj.COLUMN_NAME,1)}(Date ${toCamelCaseVer(fobj.COLUMN_NAME)}) {

               this.${toCamelCaseVer(fobj.COLUMN_NAME)} = ${toCamelCaseVer(fobj.COLUMN_NAME)};
       }
      `}

     if ( fobj.DATA_TYPE === "INT"){
         str= str+ `
      public int get${toCamelCaseVer(fobj.COLUMN_NAME,1)}() {

             return ${toCamelCaseVer(fobj.COLUMN_NAME)};
       }

       public void set${toCamelCaseVer(fobj.COLUMN_NAME,1)}(int ${toCamelCaseVer(fobj.COLUMN_NAME)}) {

               this.${toCamelCaseVer(fobj.COLUMN_NAME)} = ${toCamelCaseVer(fobj.COLUMN_NAME)};
       }
      `}

        })

        return str;
        })()}
}
`