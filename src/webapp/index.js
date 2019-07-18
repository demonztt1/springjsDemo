import index from './index.html'

import boxTest from './static/css/index.css'
import common from './static/css/common.css'
import tabs from './static/css/tabs.css'
import iframes from './static/css/iframes.css'
import tree from './static/css/tree.css'

import jquery from 'jquery'
window.$=jquery;

$("title").html('xxx');

$(document).ready(function() {
    //每个有子菜单的菜单项添加点击事件
    $(".tree .fa").click(function(){
        //获取当前菜单旁边input的check状态
        var isChecked = $(this).hasClass("fa-plus-circle")
        //展开和收齐的不同状态下更换右侧小图标
        if(isChecked){
            $(this).addClass("fa-minus-circle").removeClass("fa-plus-circle");
            $(this).parent().parent() .children("ul").show()
        }else{
            $(this).addClass("fa-plus-circle").removeClass("fa-minus-circle");
            $(this).parent().parent().children("ul").hide();
        }
    });

});