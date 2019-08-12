`<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head id="i18n_" module="">
    <!--#include virtual="/views/items/resource_.shtml"-->
    <title data-i18n="">EO</title>
</head>
<body class="ibody">
<div id="title" class="title" style="width:100%; height: 100%">
    <fieldset class="fieldset_eui">
        <legend data-i18n="common:COMMON_OPERATION.SEARCH">搜索</legend>
        <form id="ffSearch" class="form-horizontal">
            <table class="table table-bordered table-info">
                <tr>
                    <th class="th" style="width:80px;" align="right">EO编号：</th>
                    <td class="td5">
                        <input class="easyui-combobox" id="dataType" name="dataType" style="width:100px;"/>
                    </td>
                    <th class="th" style="width:80px;" align="right">适用类型：</th>
                    <td class="td5">
                        <input class="easyui-textbox" id="dataNo" name="dataNo" style="width:100px;"/>
                    </td>
                    <th class="th" style="width:80px;" align="right">状态：</th>
                    <td class="td5">
                        <input class="easyui-textbox" id="dataVer" name="dataVer" style="width:100px;"/>
                    </td>
                    <th class="th" style="width:80px;" align="right">编写人：</th>
                    <td class="td5">
                        <input class="easyui-combobox" id="dataStatus" name="dataStatus" style="width:100px;"/>
                    </td>

                </tr>
                <tr>
                    <th class="th" style="width:80px;" align="right">章节：</th>
                    <td class="td5">
                        <input class="easyui-combobox" id="applyModel" name="applyModel" style="width:100px;"/>
                    </td>

                    <th class="th" style="width:80px;" align="right">适用型号：</th>
                    <td class="td5">
                        <input class="easyui-textbox" id="ata" name="ata" style="width:100px;"/>
                    </td>
                    <th class="th" style="width:80px;" align="right">分类：</th>
                    <td class="td5">
                        <input class="easyui-textbox" id="ata" name="ata" style="width:100px;"/>
                    </td>
                    <th class="th" style="width:80px;" align="right">工作性质：</th>
                    <td class="td5">
                        <input class="easyui-textbox" id="ata" name="ata" style="width:100px;"/>
                    </td>
                    <td class="td5">
                        <a class="searchBtn" type="button" onclick="searchData()"
                           data-options="iconCls:'icon-search'">
                            <span data-i18n="common:COMMON_OPERATION.QUERY">查询</span></a>
                        <a class="clearBtn" onclick="doClear_()" data-options="iconCls:'icon-clear'">
                            <span data-i18n="common:COMMON_OPERATION.RESET">重置</span></a>
                        <a class="searchBtn" onclick="editDetailData('add')" data-options="iconCls:'icon-clear'">
                            <span data-i18n="common:RES.COMMON.ADD_TO">添加</span></a>
                    </td>
                </tr>
            </table>
        </form>
    </fieldset>
    <table id="dg"></table>
</div>
<script type="text/javascript" src="/js/datagrid_utils.js"></script>
<script type="text/javascript">
    var PAGE_DATA = {};
    var COMBOBOX_DATA = {};
    var flag = "";
    var companyCode;

    function i18nCallBack() {
        //绑定回车查询事件
        bindFormonSearch_('#ffSearch', function () {
            searchData()
        });

        InitFuncCodeRequest_({
            data: {
                domainCode: "DM_REC_PRIVIDOR,DM_DATA_TYPE_TECHNOLOGY,DM_EXTER_STATUS2,DA_FLEET,DM_URGENT_LEVEL,DM_APPLIC_TYPE,DM_EXTER_STATUS,DM_DATA_FROM,DM_HOW_DEALWITH",
                FunctionCode: "EM_EO_LIST_ADMIN"
            },
            successCallBack: function (jdata) {
                if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                    $('#dataType').combobox({
                        panelHeight: '140px',
                        data: jdata.data.DM_DATA_TYPE_TECHNOLOGY,
                        valueField: 'VALUE',
                        textField: 'TEXT'
                    });
                    $('#applyModel').combobox({
                        panelHeight: '100px',
                        data: jdata.data.DA_FLEET,
                        valueField: 'VALUE',
                        textField: 'TEXT'
                    });
                    $('#urgentLevel').combobox({
                        panelHeight: '100px',
                        data: jdata.data.DM_URGENT_LEVEL,
                        valueField: 'VALUE',
                        textField: 'TEXT'
                    });
                    // $('#ata').combobox({
                    //     panelHeight: '100px',
                    //     data: jdata.data.DA_ATA,
                    //     valueField: 'VALUE',
                    //     textField: 'TEXT'
                    // });
                    $('#dataStatus').combobox({
                        panelHeight: '100px',
                        data: jdata.data.DM_EXTER_STATUS,
                        valueField: 'VALUE',
                        textField: 'TEXT'
                    });
                    $('#dataFrom').combobox({
                        panelHeight: '100px',
                        data: jdata.data.DM_REC_PRIVIDOR,
                        valueField: 'VALUE',
                        textField: 'TEXT'
                    });

                    PAGE_DATA['dataType'] = DomainCodeToMap_(jdata.data["DM_DATA_TYPE_TECHNOLOGY"]);
                    PAGE_DATA['applyModel'] = DomainCodeToMap_(jdata.data["DA_FLEET"]);
                    PAGE_DATA['urgentLevel'] = DomainCodeToMap_(jdata.data["DM_URGENT_LEVEL"]);
                    // PAGE_DATA['ata'] = DomainCodeToMap_(jdata.data["DA_ATA"]);
                    PAGE_DATA['dataStatus'] = DomainCodeToMap_(jdata.data["DM_EXTER_STATUS"]);
                    PAGE_DATA['dataFrom'] = DomainCodeToMap_(jdata.data["DM_REC_PRIVIDOR"]);
                    PAGE_DATA['applic'] = DomainCodeToMap_(jdata.data["DM_APPLIC_TYPE"]);
                    PAGE_DATA['howDealwith'] = DomainCodeToMap_(jdata.data["DM_HOW_DEALWITH"]);

                    //获取CompanyCode
                    InitFuncCodeRequest_({
                        data: {FunctionCode: "COMMON_COMPANY_CODE"},
                        successCallBack: function (jdata) {
                            if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                                companyCode = jdata.data;
                                InitDataGrid();
                            }
                        }
                    });
                } else {
                    MsgAlert({content: jdata.msg, type: 'error'});
                }
            }
        });
    }

    function InitDataGrid() {
        $("#dg").MyDataGrid({
            identity: 'dg',
            sortable: true,
            singleSelect: true,
            queryParams: {companyCode: companyCode},
            pageSize: 15,
            columns: {
                param: {FunctionCode: 'EM_EO_LIST_ADMIN'},
                alter: {
                    TEST_UPLOAD: {
                        formatter: function (value, row, index) {
                            if (row.TEST_UPLOAD) {
                                return '<a href="javascript:void(0);" rowindex="' + index + '" class="attach">' +
                                    '<img src="/img/edit2.png" border="0" style="width:15px;height:15px;"/></a>'
                            }
                        }
                    },
                    DATA_TYPE: {
                        formatter: function (value) {
                            return PAGE_DATA['dataType'][value];
                        }
                    },
                    APPLY_MODEL: {
                        formatter: function (value) {
                            return PAGE_DATA['applyModel'][value];
                        }
                    },
                    URGENT_LEVEL: {
                        formatter: function (value) {
                            return PAGE_DATA['urgentLevel'][value];
                        }
                    },
                    DATA_STATUS: {
                        formatter: function (value) {
                            return PAGE_DATA['dataStatus'][value];
                        }
                    },
                    DATA_FROM: {
                        formatter: function (value) {
                            return PAGE_DATA['dataFrom'][value];
                        }
                    },
                    APPLY_TYPE: {
                        formatter: function (value) {
                            return PAGE_DATA['applic'][value];
                        }
                    },
                    HOW_DEALWITH: {
                        formatter: function (value) {
                            return PAGE_DATA['howDealwith'][value];
                        }
                    },
                    ISSUE_DATE: {
                        type: 'datetime'
                    },
                    EFFECT_DATE: {
                        type: 'datetime'
                    },
                    EVA_LIMIT_DATE: {
                        type: 'datetime'
                    },
                    RECEIVE_DATE: {
                        type: 'datetime'
                    }
                }
            },
            onLoadSuccess: function () {
                InitSuspend('a.attach', {
                    'onmouseover': function (thiz, event, callback) {
                        var index = $(thiz).attr("rowindex");
                        var row = $("#dg").datagrid('getRows')[index];
                        InitFuncCodeRequest_({
                            data: {
                                SOURCE_ID: row.PKID,
                                CATEGORY: "dmDataRecExter",
                                FunctionCode: 'ATTACHMENT_RSPL_GET'
                            },
                            successCallBack: function (jdata) {
                                if (jdata.code === RESULT_CODE.SUCCESS_CODE) {

                                }
                                var html = "";
                                for (var i = 0; i < jdata.data.length; i++) {
                                    html += '<li><a target="_blank" onclick="downFileLocal(' + jdata.data[i].PKID + ')">' + jdata.data[i].ORG_NAME + '</a><span onclick="deleteFile(\'' + jdata.data[i].PKID + '\');return false;" class="icon-cross"></span></li>';
                                }
                                callback(html);
                            }
                        });
                    }
                });
            },
            contextMenus: [
                {
                    id: "m-edit", i18nText: "编写", auth: "",
                    onclick: function () {
                        var rowData = getDG('dg').datagrid('getSelected');
                        if (!rowData.PKID) {
                            MsgAlert({content: "请选择数据！", type: 'error'});
                            return;
                        }
                        flag = "E";
                        openDetai('edit', rowData.PKID);
                    }
                },
                {
                    id: "m-edit", i18nText: "转发", auth: "",
                    onclick: function () {
                        var rowData = getDG('dg').datagrid('getSelected');
                        if (!rowData.PKID) {
                            MsgAlert({content: "请选择数据！", type: 'error'});
                            return;
                        }
                        flag = "E";
                        openDetai('edit', rowData.PKID);
                    }
                },
                {
                    id: "m-delete", i18nText: "删除", auth: "",
                    onclick: function () {
                        var rowData = getDG('dg').datagrid('getSelected');
                        if (!rowData.PKID) {
                            MsgAlert({content: "请选择数据！", type: 'error'});
                            return;
                        }
                        if (!confirm("确认删除该记录？")) {
                            return;
                        }
                        InitFuncCodeRequest_({
                            data: {pkid: rowData.PKID, FunctionCode: 'DM_DATA_REC_EXTER_DEL'},
                            successCallBack: function (jdata) {
                                if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                                    MsgAlert({content: $.i18n.t('msg_tip:TIP.COMMON.OPT_SUCCESS')});
                                    reload_();
                                } else {
                                    MsgAlert({content: jdata.msg, type: 'error'});
                                }
                            }
                        });
                    }
                },
                {
                    id: "m-delete", i18nText: "打印", auth: "",
                    onclick: function () {
                        var rowData = getDG('dg').datagrid('getSelected');
                        if (!rowData.PKID) {
                            MsgAlert({content: "请选择数据！", type: 'error'});
                            return;
                        }
                        if (!confirm("确认删除该记录？")) {
                            return;
                        }
                        InitFuncCodeRequest_({
                            data: {pkid: rowData.PKID, FunctionCode: 'DM_DATA_REC_EXTER_DEL'},
                            successCallBack: function (jdata) {
                                if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                                    MsgAlert({content: $.i18n.t('msg_tip:TIP.COMMON.OPT_SUCCESS')});
                                    reload_();
                                } else {
                                    MsgAlert({content: jdata.msg, type: 'error'});
                                }
                            }
                        });
                    }
                },
                {
                    id: "m-issue", i18nText: "改变", auth: "",
                    onclick: function () {
                        var rowData = getDG('dg').datagrid('getSelected');
                        if (!rowData.PKID) {
                            MsgAlert({content: "请选择数据！", type: 'error'});
                            return;
                        }
                        issueCheck(rowData.PKID);
                    }
                },

                {
                    id: "m-dis", i18nText: "终结", auth: "",
                    onclick: function () {
                        var rowData = getDG('dg').datagrid('getSelected');
                        if (!rowData.PKID) {
                            MsgAlert({content: "请选择数据！", type: 'error'});
                            return;
                        }
                        if (!confirm("确认作废该记录？")) {
                            return;
                        }
                        InitFuncCodeRequest_({
                            data: {pkid: rowData.PKID, FunctionCode: 'DM_DATA_REC_EXTER_DIS'},
                            successCallBack: function (jdata) {
                                if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                                    MsgAlert({content: $.i18n.t('msg_tip:TIP.COMMON.OPT_SUCCESS')});
                                    reload_();
                                } else {
                                    MsgAlert({content: jdata.msg, type: 'error'});
                                }
                            }
                        });
                    }
                },
                {
                    id: "m-upload", i18nText: "上传附件", auth: "",
                    onclick: function () {
                        var rowData = getDG('dg').datagrid('getSelected');
                        if (!rowData.PKID) {
                            MsgAlert({content: "请选择数据！", type: 'error'});
                            return;
                        }
                        common_uploadFile({
                            identity: 'dg',
                            param: {
                                cat: "dmDataRecExter",
                                sourceId: rowData.PKID,
                                successCellBack: "",
                                fialCellBack: ""
                            }
                        });

                    }
                }
            ]
        });
    }

    //发布前检验
    function issueCheck(mpkid) {
        var rowData = getDG('dg').datagrid('getSelected');

        var $form = $("#mform");
        var datas = $form.serializeObject();
        //保存校验
        if (isEmpty(mpkid)) {
            alert("请先保存数据！");
            return;
        }
        if (!confirm("确定要发布吗，发布后不可再收回？")) {
            return;
        }
        //发布前，需先验证是否上传附件，如果没有，则不能发布
        datas = $.extend({}, datas, {CATEGORY: 'dmDataRecExter', SOURCE_ID: mpkid, FunctionCode: 'DM_EXTER_ARC'});
        InitFuncCodeRequest_({
            data: datas, successCallBack: function (jdata) {
                if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                    if (jdata.data.ARC != 0) {
                        issue(mpkid);
                    } else {
                        alert("未上传附件，请先上传附件。");

                    }
                } else {
                    MsgAlert({content: jdata.msg ? jdata.msg : jdata.data, type: 'error'});
                }
            }
        });
    }

    //发布
    function issue(mpkid) {
        var $form = $("#mform");
        var datas = $form.serializeObject();
        datas = $.extend({}, datas, {mpkid: mpkid, FunctionCode: 'DM_DATA_REC_EXTER_ISS'});
        //发布前，需先验证是否上传附件，如果没有，则不能发布
        InitFuncCodeRequest_({
            data: datas, successCallBack: function (jdata) {
                if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                    MsgAlert({content: jdata.msg ? jdata.msg : $.i18n.t('msg_tip:TIP.COMMON.OPT_SUCCESS')});
                    searchData();
                } else {
                    MsgAlert({content: jdata.msg ? jdata.msg : jdata.data, type: 'error'});
                }
            }
        });
    }

    //刷新
    function reload_() {
        $("#dg").datagrid("reload");
    }

    //新增
    function editDetailData(operation) {
        flag = "A";
        openDetai(operation, '');
    }

    //打开资料类型详细页面
    function openDetai(operation, pkid) {
        var title_ = $.i18n.t('EO详细页');
        ShowWindowIframe({
            width: "1248",
            height: "900",
            title: title_,
            param: {operation: operation, pkid: pkid},
            url: "/views/em/emeo/eoEdit.shtml"
        });
    }

    //查询
    function searchData() {
        onSearch_('dg', '#ffSearch');
    }

    //重置
    function doClear_() {
        $("#ffSearch").form('clear');
        searchData();
    }

    //上传
    function common_uploadFile(edopt) {
        var title_ = $.i18n.t('common:COMMON_OPERATION.UPLOAD');
        ShowWindowIframe({
            width: 575,
            height: 200,
            title: title_,
            param: $.extend({}, edopt.param),
            url: "/views/data_manager/dm/upload/attachment_add.shtml"
        });
    }

    //删除的时候一块删除业务表的file_path
    function deleteFile(pkid) {
        if (!confirm("确认删除?")) {
            return;
        }
        InitFuncCodeRequest_({
            data: {pkid: pkid, FunctionCode: 'DM_DATA_UP_DELETE'},
            successCallBack: function (jdata) {
                if (jdata.code == 200) {
                    InitFuncCodeRequest_({
                        data: {pkid: pkid, FunctionCode: 'ATTACHMENT_RSPL_DEL'},
                        successCallBack: function (jdata) {
                            if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                                MsgAlert({content: jdata.msg ? jdata.msg : $.i18n.t('msg_tip:TIP.COMMON.OPT_SUCCESS')});
                                reload_();
                            }
                        }
                    });

                }
            }
        });
    }


</script>
</body>
</html>`