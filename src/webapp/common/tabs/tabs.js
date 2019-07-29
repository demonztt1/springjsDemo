import  tabs from './tabs.html'
import tabsss from '../../../static/css/tabs.css'
import iframes from '../../../static/css/iframes.css'
import jquery from 'jquery'
window.$=jquery;
window.tabAddHandler=tabAddHandler;
parent.window.tabAddHandler=tabAddHandler;
var tab;

$( function() {
    tab = new TabView( {
        containerId :'tab_menu',
        pageid :'page',
        cid :'tab1',
        position :"top"
    });
    tab.add( {
        id :'tab1_index1',
        title :"主页",
        url :"elements.html",
        isClosed :false
    });

    /**tab.add( {
		id :'tab1_index1',
		title :"主页",
		url :"/per/undoTask!gettwo",
		isClosed :false
	});
     **/
});

function tabAddHandler(mid,mtitle,murl){
    tab.update({
        id :mid,
        title :mtitle,
        url :"../../"+murl,
        isClosed :true
    });
    tab.add({
        id :mid,
        title :mtitle,
        url :"../../"+murl,
        isClosed :true
    });

    tab.activate(mid);
}

function cmainFrameT(){
    var hmainT = document.getElementById("page");
    var bheightT = document.documentElement.clientHeight;
    hmainT .style.width = '100%';
    hmainT .style.height = (bheightT  - 51) + 'px';
}
cmainFrameT();
window.onresize=function(){
    cmainFrameT();
};






var TabOption = function () {
};
TabOption.prototype = {
    containerId: "", pageid: "", cid: "", position: top, action: function (b, a) {
    }
};
var TabItemOption = function () {
};
TabItemOption.prototype = {id: "tab_", title: "", url: "", isClosed: true};
function TabView(f) {
    var a = {current: null, current_index: 0, current_page: null};
    var g = new TabOption();
    $.extend(g, f);
    var b = g.position == "bottom" ? "_bottom" : "";
    this.id = g.cid;
    this.pid = g.pageid;
    this.tabs = null;
    this.tabContainer = null;
    var h =`         <ul   id="{0}" ></ul>     `
    var c =`         <li   id="{0}">
                            <span class="icon-close"></span>
                            {1}</li>`
    var i;

    if ($("#scrollContent").attr("childScrollContent") == "true") {
        i = ` <div class="iframes" id="{0}">
                    <iframe src="{1}"></iframe>
                </div>`
    } else {
        i = ` <div class="iframes" id="{0}">
                    <iframe src="{1}"></iframe>
                </div>`
    }

  /*  if (g.position == "bottom") {
        c = '<table class="tab_item_bottom"  id="{0}" border="0" cellpadding="0" cellspacing="0"><tr><td class="tab_item1_bottom"></td><td class="tab_item2_bottom tab_title">{1}</td><td class="tab_item2_bottom">< div class= "tab_close tab_close_bottom" > < /div></td > < td class= "tab_item3_bottom" > < /td></tr > < /table>';
        h = '<div class="benma_ui_tab benma_ui_tab_bottom" id="{0}"><div class="tab_hr tab_hr_bottom"></div ></div>'
    }*/
    $("#" + g.containerId).append(h.replace("{0}", this.id));

    this.init = function () {
        this.tabContainer = $("#" + this.id);
        this.tabs = this.tabContainer.find(".tab_item" + b);
        this.tabs.each(function () {
            e(this)
        })
    };
    this.add = function(n) {
        var m = new TabItemOption();
        $.extend(m, n);
        if ($("#" + m.id).length > 0) {
            this.activate(m.id);
        } else {
            if (m.title.length > 10) {
                m.title = m.title.substring(0, 10)
            }
            if (m.title.length < 4) {
                m.title = "&nbsp;" + m.title
                e + "&nbsp;"
            }
            var k = i.replace("{0}", "page_" + m.id).replace("{1}", m.url);
            $("#" + this.pid).append(k);
            var l = c.replace("{0}", m.id).replace("{1}", m.title);
            this.tabContainer.append(l);
            e($("#" + m.id));
            if (!m.isClosed) {
                $($("#" + m.id)).find(".icon-close").hide()
            }
            this.activate(m.id)
        }
    };
    this.update = function (k) {
        var l = k.id;
        $("#" + l).find(".tab_title").html(k.title);
        $("#" + l).trigger("click");
        $("#page_" + l).attr("src", k.url)
    };
    this.activate = function (k) {
        $("#" + k).trigger("click")
    };
    this.close = function (k) {
        j(k)
    };
    this.init()

    function e(n) {
        var p = $(n);
        if (a.current == null || a.current != this) {
            $(p).click(function () {
                if (a.current != null) {
                    $(a.current).removeClass("active");
                }
                a.current=this;
                $(a.current).addClass("active");
                d($(this).attr("id"),false)
            });
            //添加关闭事件
            var o=$(p).find(".icon-close")
                .mouseover(function(){$(this).addClass("active")})
                .mouseout(function () {$(this).removeClass("active")})
                .click(function () {j(p.attr("id"))})
        }
    }

    function d(l, k) {
        if (k) {
        }
        if (a.current_page) {
            a.current_page.hide()
        }
        a.current_page = $("#page_" + l);
        a.current_page.show();
        g.action
        ($("#" + l), a.current_page)
    }

    function j(o) {
        var n = $("#page_" + o);
        var k = $("#" + o);
        if ($(a.current).attr("id") == k.attr("id")) {
            var l = k.next();
            if (l.attr("id")) {
                $("#" + l.attr("id")).trigger("click")
            } else {
                var m = k.prev();
                if (m.attr("id"
                    )) {
                    $("#" + m.attr("id")).trigger("click")
                }
            }
        } else {
        }
        n.remove();
        k.remove()
    }

}





