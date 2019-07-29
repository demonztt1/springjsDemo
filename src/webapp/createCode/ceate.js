import   toCamelCaseVer     from '../../static/js/create/toCamelCaseVer.js'
//import   JSZip     from  './jszip.min.js'
//console.log(toCamelCaseVer.to("xxxx_xxx_xxx",true));
window.create=create
window.createList=createList
function  create() {
    var fields = $("#dg").datagrid("getRows");
    var ftls = $("#dg1").datagrid("getRows");
  //  var title = $("#title").val();
    var title = "eo"
    var tableName = $("#tableName").val();
   // var packageName = $("#packageName").val();
    var packageName ="emeo"
    var zip = new JSZip();

    ftls.forEach((e,i)=>{
        let htmlobj=$.ajax({url:e.ftlPath,async:false});
            let htmlpath=`${e.packagePath}/${packageName==""?toCamelCaseVer(tableName).toLowerCase():packageName}/${toCamelCaseVer(tableName,1)}${e.suffix}`;
         // let obj1=`${htmlobj.responseText}`
             let obj1= eval(htmlobj.responseText)
            zip.file(htmlpath,obj1);
        }
    )

//var img = zip.folder("images");
//img.file("smile.gif", imgData, {base64: true});
    zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
}

function  createList() {
   // var fields = $("#dg").datagrid("getRows");
    var fields=[];
    var ftls = $("#dg1").datagrid("getRows");
    var title = "eo" //$("#title").val();
    var tableName = "";
    var packageName ="emeo"// $("#packageName").val();
    var tableNameList = $('#tableNameList').val().split('\n')

    var zip = new JSZip();
    tableNameList.forEach((tName)=>{
        let resdata = $.ajax('http://127.0.0.1:3001/data/tableFields?tableName='+tName,true);
    fields=eval(resdata.responseText)
        tableName=tName;
        ftls.forEach((e,i)=>{
        let htmlobj=$.ajax({url:e.ftlPath,async:false});
            let htmlpath=`${e.packagePath}/${packageName==""?toCamelCaseVer(tableName).toLowerCase():packageName}/${toCamelCaseVer(tableName,1)}${e.suffix}`;
            // let obj1=`${htmlobj.responseText}`
            let obj1= eval(htmlobj.responseText)
            zip.file(htmlpath,obj1);
        }
        )
    }
    )


//var img = zip.folder("images");
//img.file("smile.gif", imgData, {base64: true});
    zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
}