`<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head id="i18n_" module="">
    <!--#include virtual="/views/items/resource_.shtml"-->
    <!--<link rel="stylesheet" href="/css/table.css">-->

    <script type="text/javascript" src="/views/ws/dict/pinyin_dict_firstletter.js"></script>
    <script type="text/javascript" src="/views/ws/dict/pinyinUtil.js"></script>

</head>
<body>

<div style="">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <form class="form-horizontal m-t" id="mform">
                <input type="hidden" id="orgName" name="orgName" />
                <table cellspacing="0" cellpadding="2" class="table table-bordered table-info">
                 ${ (function () {
                            let str=""
                            for( let i=0; i<fields.length;){
                                str =str + `
                        <tr>
                              ${ (function () {
                                         let strs=""

                                         let w=0;
                                         for(let l=i; l<fields.length;w++){
                                         strs= strs+ `

                            <th class="tdl">${fields[l].COLUMN_NAME}:</th>
                            <td class="tdr">
                                <input class="easyui-textbox" name="${toCamelCaseVer(fields[l].COLUMN_NAME)}" id="${toCamelCaseVer(fields[l].COLUMN_NAME)}"
                                       data-options="onChange:setPym,required:true"/>
                            </td>
                            <th class="tdl">${fields[l].COLUMN_NAME}:</th>
                                                    <td class="tdr">
                                                        <input class="easyui-combobox" name="${toCamelCaseVer(fields[l].COLUMN_NAME)}" id="${toCamelCaseVer(fields[l].COLUMN_NAME)}" value="N"
                                                               data-options="required:true"/>
                                                    </td>
                            `
                            l++;
                                if(l%2 ===0 ){
                                 return strs;
                                }
                             }
                                                         return strs;
                                                                })()}
                        </tr> `
                                i=i+2
                            }


                     return str;
                            })()}

                    <tr>
                        <td colspan="8" align="center">
                            <input class="btn btn-primary" id="save" onclick="InitSaveForm_();" type="submit" value="保存"
                                   style="margin:5px;"/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</div>

</body>
<script type="text/javascript">

        var param = {};
        var sex;
        var orgId;
        var state;
        var accountType;

        function i18nCallBack() {
            param = getParentParam_();
            InitFuncCodeRequest_({
                data: {
                    domainCode: "WS_SYS_ACCOUNT_STATE,WS_SYS_ACCOUNT_TYPE,HR_SEX,HR_ORG",
                    FunctionCode: "ANALYSIS_DOMAIN_BYCODE"
                },
                successCallBack: function (jdata) {
                    state = DomainCodeToMap_(jdata.data["WS_SYS_ACCOUNT_STATE"]);
                    accountType = DomainCodeToMap_(jdata.data["WS_SYS_ACCOUNT_TYPE"]);
                    sex = DomainCodeToMap_(jdata.data["HR_SEX"]);
                    orgId = DomainCodeToMap_(jdata.data["HR_ORG"]);
                    if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                        $('#state').combobox({
                            panelHeight: '150px',
                            data: jdata.data['WS_SYS_ACCOUNT_STATE'],
                            valueField: 'VALUE',
                            textField: 'TEXT',
                        });
                        $('#accountType').combobox({
                            panelHeight: '150px',
                            data: jdata.data['WS_SYS_ACCOUNT_TYPE'],
                            valueField: 'VALUE',
                            textField: 'TEXT',
                        });
                        $('#sex').combobox({
                            panelHeight: '150px',
                            data: jdata.data['HR_SEX'],
                            valueField: 'VALUE',
                            textField: 'TEXT',
                        });
                        $('#orgId').combobox({
                            panelHeight: '150px',
                            data: jdata.data.HR_ORG,
                            valueField: 'VALUE',
                            textField: 'TEXT',
                            onSelect: function (data, row) {
                                $('#orgName').val(data.TEXT);
                            }
                        });
                    }
                    else {
                        MsgAlert({content: jdata.msg, type: 'error'});
                    }
                }
            });
            InitSaveForm_();
        }

        function InitSaveForm_() {
            var $form = $("#mform");
            $form.form({
                onSubmit: function () {
                    var isValidate = $(this).form('validate');
                    if (!isValidate) {
                        return false;
                    }
                    var data = $form.serializeObject();
                    data = $.extend({}, data, {FunctionCode: "WS_SYS_ACCOUNT_ADD"});
                    InitFuncCodeRequest_({
                        data: data,
                        successCallBack: function (jdata) {
                            if (jdata.code == RESULT_CODE.SUCCESS_CODE) {
                                param.OWindow.reload_();
                                MsgAlert({content: jdata.msg ? jdata.msg : $.i18n.t('msg_err:ERRMSG.COMMON.SUCCESS_CODE')});
                                CloseWindowIframe();
                            } else {
                                MsgAlert({content: jdata.msg, type: 'error'});
                            }
                        }
                    });
                    return false;
                }
            });
        }

        //设置拼音码
        function setPym() {
            var name = $("#name").textbox('getValue');
            var pym = window.pinyinUtil.getFirstLetter(name, false);
            $("#pym").textbox('setValue', pym);
        }

    </script>
</html>`