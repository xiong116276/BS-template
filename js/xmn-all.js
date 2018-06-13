//xmn.tips('您还没有登录！'); 默认提示
//xmn.tips('您还没有登录！','success'); 成功提示
//xmn.tips('您还没有登录！','error');   错误提示
//xmn.tips('您还没有登录！','warning'); 警告提示
//xmn.tips('数据请求中...'，'loading'); 警告提示
//xmn.tips('数据请求中...');
//xmn.tips.error('数据请求中...');
//xmn.tips.success('数据请求中...');
//xmn.tips.warning('数据请求中...');
//xmn.tips.loading('数据请求中...');

//xmn.dialog.alert('您还没有输入验证码...','success,warning,error,infomation,default',function(args){//callback});
//xmn.dialog.confirm('确定要删除这条数据吗？',function(yes){//this is the yes callback function},function(no){});
//xmn.dialog.prompt('订单金额',function(value){alert("输入的值为："+value);});

//xmn.dialog.open({title:'百度一下','url':'http://www.baidu.com',width:'790px||90%',height:'600px||90%','screen':'default||full'}).max(); // max方法调用表示将窗口默认全屏

//xmn.modal({title:'百度一下',width:'790px||90%',height:'600px||90%','template':'html elements',btns:[{'type':'yes',value:'确定',callback:function(){}},{'type':'no',value:'关闭',callback:function(){}}]});
//xmn.browser();

;!(function (win) {
  var Xmn = function (version) {
    this.version = version;
  };

  //创建普通元素
  Xmn.prototype.element = function (tag,attrs,html) {
    var element = document.createElement(tag);
    // 判断第二个参数是属性还是内容
    if(typeof(attrs) === "string"){
      html = attrs;
      attrs = null;
    }
    // 判断是否有属性
    if(attrs !== undefined){
      for(var attr in attrs){
        element.setAttribute(attr,attrs[attr]);
      }
    }
    // 判断是否有内容
    if(html !== undefined){
      element.innerHTML = html;
    }
    return element;
  };

  //自动生成guid
  Xmn.prototype.guid = function(){
    function S4() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  };

  //创建SVG元素
  Xmn.prototype.svg = function(attrs,html){
    var svgns = "http://www.w3.org/2000/svg";
    var element = document.createElementNS(svgns, 'svg');
    // 判断第二个参数是属性还是内容
    if(typeof(attrs) === "string"){
      html = attrs;
      attrs = null;
    }
    // 判断是否有属性
    if(attrs !== undefined){
      for(var attr in attrs){
        element.setAttribute(attr,attrs[attr]);
      }
    }
    // 判断是否有内容
    if(html !== undefined){
      element.innerHTML = html;
    }
    return element;
  };

  //btns 下拉菜单
  Xmn.prototype.btnDropMenu = function () {
    $(".btn-drop").on("click",function () {
      $(this).find(".btn-menus").toggle();
    });
  };

  // 拖拽元素
  Xmn.prototype.drag = function (element) {
    $(element).on("mouseenter",function () {
      $(this).css("cursor","move");
    });
    $(element).on("mousedown",function (event) {
      event = event || window.event;
      var panel=$(event.currentTarget).parents(".modal-container")[0];

      // 计算鼠标移动的距离
      var reX=event.clientX-panel.offsetLeft;
      var reY=event.clientY-panel.offsetTop;

      var panelW = parseFloat(getComputedStyle(panel).width);
      var panelH = parseFloat(getComputedStyle(panel).height);
      var modalW = parseFloat(getComputedStyle($(".modal-page")[0]).width);
      var modalH = parseFloat(getComputedStyle($(".modal-page")[0]).height);

      document.onmousemove=function(event){
        event = event || window.event;

        // 计算面板与边缘距离
        var x = event.clientX-reX;
        var y = event.clientY-reY;
        // 水平边界
        if(x <= panelW/2){
           x = panelW/2
        }else if (x >= (modalW - panelW/2)){
          x = modalW - panelW/2;
        }
        // 垂直边界
        if(y <= 0){
          y=0
        }else if(y >= modalH - panelH){
          y = modalH - panelH;
        }

        panel.style.left=x +'px';
        panel.style.top=y +'px';
      };
    });
    $(element).on("mouseup",function () {
      document.onmousemove=null;
    });
  };

  // 左侧菜单栏
  Xmn.prototype.layout = function () {
    $(".menu-list .menu-item").on("click",function (e) {
      var e = e.currentTarget;
      $(e).toggleClass("active").siblings().removeClass('active');

      var url = $(e).attr("data-target");
      var str = $(e).find(".text").text();
      if( $(e).find(".menu-list-2 .item").length > 0) {
        $($(e).find(".menu-list-2 .item")[0]).addClass("active").siblings().removeClass('active');
        $(".menu-list .menu-list-2 .item").on("click",function (e) {
          e.stopPropagation();
          url = $(this).attr("data-target");
          str = $(this).parent().siblings().find(".text").text()
            +"<i class=\"icon iconfont icon-youjiantou2\"></i>"
            +$(this).text().split('·')[1];

          $(this).addClass("active").siblings().removeClass('active');
          $(".content-page iframe").attr("src",url);

          $(".bread-nav .nav-item").html(xmn.element("a",str));
        });
      }
      $(".content-page iframe").attr("src",url);
      $(".bread-nav .nav-item").html(xmn.element("a",str));
    });
  };

  // 弹出tips
  Xmn.prototype.tips = function (content,type,speed) {
    if(typeof(type) !== 'string'){
      speed = type;
      type = null;
    }
    speed = speed?speed:500;
    var fragPage = xmn.element("div", {"class": "modal-page"});
    // // 模态框
    // $(xmn.element("div", {"class": "modal-mask"})).appendTo($(fragPage));
    // 内容
    var icon = "";
    switch (type){
      case 'success':icon = '<i class="icon iconfont icon-success color-8"></i> ';break
      case 'error':icon = '<i class="icon iconfont icon-error color-10"></i> ';break
      case 'warning':icon = '<i class="icon iconfont icon-warning color-6"></i> ';break
      case 'loading':icon = '<i class="icon iconfont icon-loading"></i> ';break
    }
    var str = icon+content;

    $(xmn.element("div", {"class": "tips"}, str)).appendTo($(fragPage));

    $(fragPage).appendTo($(document.body));

    $(".modal-page").show().find(".tips")
      .animate({"top":"100px"},speed,"linear",
        function () {
          var timer = setTimeout(function () {
            var h = getComputedStyle($(".modal-page .tips")[0]).height;
            $(".modal-page .tips").animate({"top":"-"+h},speed,"linear",function () {
              $(".modal-page .tips").parents(".modal-page").remove();
            });
          },1000);
        });
    if(arguments.length === 0){
      return {
        "error"  : function (content,speed) {xmn.tips(content,"error",  speed)},
        "success": function (content,speed) {xmn.tips(content,"success",speed)},
        "warning": function (content,speed) {xmn.tips(content,"warning",speed)},
        "loading": function (content,speed) {xmn.tips(content,"loading",speed)},
      }
    }
  };

  //modal
  Xmn.prototype.modal = function (obj,callback) {
    var _title    = obj.title
      , _url      = obj.url
      , _content  = obj.content
      , _width    = obj.width
      , _height   = obj.height
      , _type     = obj.type
      , _btns     = obj.btns
      , _speed    = obj.speed?obj.speed:500
      ,_maxBtn    = obj.maxBtn
    ;
      if(obj.maxBtn === undefined){_maxBtn = true};
    // 最大化按钮
    var _btnMax = "";

    if(_url){// iframe
      _width = obj.width?obj.width:"1200px";
      _height = obj.height?obj.height:"500px";
      if(_maxBtn){
        _btnMax = '<i class="icon iconfont icon-zuidahua fr"></i>';
      }else{
        _btnMax = '';
      }
      _content = '<iframe src="'+_url+'" width="100%" height="100%" frameborder="0"></iframe>';
    };

    if(_type){
      var icon = "";
      switch (_type){
        case 'success'    :icon = '<i class="icon iconfont icon-success color-8"></i> ';break;
        case 'error'      :icon = '<i class="icon iconfont icon-error color-10"></i> ';break;
        case 'warning'    :icon = '<i class="icon iconfont icon-warning color-6"></i> ';break;
        case 'information':icon = '<i class="icon iconfont icon-information color-2"></i> ';break;
        default :icon = "";
      }
      _content = icon + _content;
    };

    var _guid = xmn.guid();
    var fragPage = xmn.element("div", {"class": "modal-page","id":_guid});
    // 灰色半透明背景
    $(xmn.element("div", {"class": "modal-mask"})).appendTo($(fragPage));
    // 内容框
    var fragContainer = xmn.element("div", {"class": "modal-container","style":"width:"+_width+";height:"+_height});
    // title
    if(_title){
      $(xmn.element(
        "div",
        {"class": "title color-bg-1"},
        _title +'<i class="icon iconfont icon-guanbi fr btn-close"></i> ' + _btnMax)
      ).appendTo($(fragContainer));
    };

    var fragContent = xmn.element("div", {"class": "content"},_content);

    $(fragContent).appendTo($(fragContainer));
    $(fragContainer).appendTo($(fragPage));
    $(fragPage).appendTo($(document.body));

    if(_btns){
      var btnsList =xmn.element("div", {"class": "fr btns"});
      for(var i = 0,len = _btns.length;i < len ;i++){
        var btn = xmn.element("button",{"class":_btns[i].class},_btns[i].value);

        $(btn).appendTo($(btnsList));
        $(btn).on("click",_btns[i].callback);
      }
      $(btnsList).appendTo($(fragContainer));
      $(fragContent).css({"bottom":"65px", "padding-bottom":0});
      $(fragContainer).css("padding-bottom","65px");
    }

    $(".modal-page").show().find(".modal-container").animate({"top":"100px"},_speed,"linear",function () {
      if(typeof(callback) === 'function'){
        callback();
      }
    });

    // title可被拖动
    xmn.drag(".modal-page .title");

    // 面板中的点击事件
    $(document.body).off("click").on("click",function (e) {
      var e = e.target;
      if($(e).hasClass("btn-close")){// 关闭按钮
        _height=_height?_height:getComputedStyle($(e).parents(".modal-container")[0]).height;
        $(e).parents(".modal-container").animate({"top":"-"+_height},_speed,"linear",function () {
          $(e).parents(".modal-page").remove();
        });
      }else if($(e).hasClass("icon-zuidahua")){// 最大化按钮
        $(e).parents(".modal-container").css({
          "width":"100%",
          "height":"100%",
          "top":0,
          "left":"50%",
          "right":0,
        });
        $(e).removeClass("icon-zuidahua").addClass("icon-narrow");
      }else if($(e).hasClass("icon-narrow")){//缩小窗口按钮
        $(e).parents(".modal-container").css({
          "width":_width?_width:"auto",
          "height":_height?_height:"auto",
          "bottom":"auto",
          "top":"100px",
        });
        $(e).removeClass("icon-narrow").addClass("icon-zuidahua");
      }
    });

    return _guid;
  };

  // 提示框
  Xmn.prototype.dialog = {
    alert:function (content,type,callback) {
      if(typeof type === 'function'){
        callback = type;
        type = "";
      }
      var obj = {
        title:"提示信息",
        content:content,
        type:type,
        width:'400px',
        height:'160px',
        btns:[
          {
            class:'btn btn-color-0 btn-close',
            value:'确定',
            callback:callback
          }
        ]
      };
      xmn.modal(obj);
    },
    confirm:function (content,callback1,callback2) {
      var obj = {
        title:"提示信息",
        content:content,
        width:'500px',
        height:'210px',
        btns:[
          {
            class:'btn btn-color-0',
            value:'确定',
            callback:callback1
          },
          {
            class:'btn btn-default btn-close',
            value:'取消',
            callback:callback2
          }
        ]
      };
      xmn.modal(obj);
    },
    prompt:function (content,callback1,callback2) {
      var obj = {
        title:"提示信息",
        content:content+"<input class='prompt-input'/>",
        width:'400px',
        height:'200px',
        btns:[
          {
            class:'btn btn-color-0',
            value:'确定',
            callback:callback1
          },
          {
            class:'btn btn-default btn-close',
            value:'取消',
            callback:callback2
          }
        ]
      };

      xmn.modal(obj);
    }
  };

  //文件管理
  var setting = {
    uploadImageExtension: "jpg,jpeg,bmp,gif,png",
    uploadFlashExtension: "swf,flv",
    uploadMediaExtension: "swf,flv,mp3,wav,avi,rm,rmvb",
    uploadFileExtension: "zip,rar,7z,doc,docx,xls,xlsx,ppt,pptx"
  };
  var message = {
    "admin.browser.title": "选择文件",
    "admin.browser.upload": "本地上传",
    "admin.browser.parent": "上级目录",
    "admin.browser.orderType": "排序方式",
    "admin.browser.name": "名称",
    "admin.browser.size": "大小",
    "admin.browser.type": "类型",
    "admin.browser.select": "选择文件",
  };
  Xmn.prototype.browser = function (obj) {
    var settings = {
      type: "image",
      isUpload: true,
      browserUrl: "data/file-data.json",
      uploadUrl: "",
      parentUrl: "data/file-data.json",
      callback: null,
      width:"500px",
      height:"365px"
    };
    $.extend(settings, obj);

    var token = xmn.cookie.get("token");
    var cache = new Array();

    var fragPage = xmn.element("div", {"class": "modal-page"});

    // 灰色半透明背景
    $(xmn.element("div", {"class": "modal-mask"})).appendTo($(fragPage));

    // 内容框
    var fragContainer = xmn.element("div", {"class": "modal-container","style":"width:"+settings.width+";height:"+settings.height});

    // title
    $(xmn.element("div", {"class": "title color-bg-1"}, message["admin.browser.title"] +'<i class="icon iconfont icon-guanbi fr btn-close"></i> ')).appendTo($(fragContainer));

    //content
    var fragContent = xmn.element("div", {"class": "content"});
    var browserFrameId = "browserFrame" + (new Date()).valueOf() + Math.floor(Math.random() * 1000000);
    var $browserFrame;
    var $browserForm;
    var $browserUploadButton;
    var $browserUploadInput;
    var $browserParentButton;
    var $browserOrderType;
    var $browserLoadingIcon;

    //browserBar按钮
    var $browserBar = xmn.element("div", {"class":"browserBar"});
    if (settings.isUpload) {
      $browserFrame = $('<iframe id="' + browserFrameId + '" name="' + browserFrameId + '" style="display: none;"><\/iframe>').appendTo($browserBar);
      $browserForm = $('<form action="' + settings.uploadUrl + '" method="post" encType="multipart/form-data" target="' + browserFrameId + '" style="position: absolute;"><input type="hidden" name="token" value="' + token + '" \/><input type="hidden" id="folderId"  \/><input type="hidden" name="fileType" value="' + settings.type + '" \/><\/form>').appendTo($browserBar);
      $browserUploadButton = $('<a class="btn btn-color-0 btn-sm"><i class="icon iconfont icon-shangchuan"></i> '+message["admin.browser.upload"]+' <input type="file" name="file"></a>').appendTo($browserForm);
      $browserUploadInput = $('<input type="file" name="file" \/>').appendTo($browserUploadButton);
    }
    $browserLoadingIcon = $('<span class="loadingIcon" style="display: none;">&nbsp;<\/span>').appendTo($browserBar);
    $browserParentButton = $("<a class=\"btn btn-color-0 btn-sm btn-prev\"><i class=\"icon iconfont icon-fanhui\"></i> "+message["admin.browser.parent"]+"</a> ").appendTo($browserBar);
    $browserOrderType = $('<select name="orderType" style="display:none;" class="browserOrderType"><option value="name">' + message["admin.browser.name"] + '<\/option><option value="size">' + message["admin.browser.size"] + '<\/option><option value="type">' + message["admin.browser.type"] + '<\/option><\/select>').appendTo($($browserBar));
    $($browserBar).appendTo($(fragContent));

    //browserList
    var $browserList = $('<div class="browserList"><\/div>').appendTo($(fragContent));
    function browserList(folderId) {
      var key = settings.type + "_" + folderId + "_" + $browserOrderType.val();
      if (cache[key] == null) {
        $.ajax({
          url: settings.browserUrl,
          type: "GET",
          data:{fileType: settings.type, orderType: $browserOrderType.val(), folderId: folderId},
          dataType: "json",
          cache: false,
          beforeSend: function() {
            $browserLoadingIcon.show();
          },
          success: function(data) {
            createBrowserList(folderId, data);
            cache[key] = data;
          },
          complete: function() {
            $browserLoadingIcon.hide();
          }
        });
      } else {
        createBrowserList(folderId, cache[key]);
      }
    };

    function createBrowserList(folderId,data) {
      $browserList.html("");
      $("#folderId").val(folderId);
      $.each(data, function(i, fileInfo) {
        var iconUrl;
        var title;
        var id = fileInfo.id;

        if (fileInfo.isDirectory) {
          iconUrl = "images/folder.png";
          title = fileInfo.name;
        } else if (new RegExp("^\\S.*\\.(jpg|jpeg|bmp|gif|png)$", "i").test(fileInfo.name)) {
          iconUrl = fileInfo.url;
          title = fileInfo.name + " (" + Math.ceil(fileInfo.size / 1024) + "KB, " + new Date(fileInfo.lastModified).toLocaleString() + ")";
        } else {
          iconUrl = "/resources/img/file_icon.gif";
          title = fileInfo.name + " (" + Math.ceil(fileInfo.size / 1024) + "KB, " + new Date(fileInfo.lastModified).toLocaleString() + ")";
        }
        $(xmn.element(
          "div",
          {"class":"browserItem"},
          '<img  src="' + iconUrl + '" title="' + title + '" url="' + fileInfo.url + '" isDirectory="' + fileInfo.isDirectory + '" data-id="'+fileInfo.id+'"  ><p class=\"text\">'+title+'</p>'
        )).appendTo($browserList);
      });

      $browserList.appendTo($(fragContent));

      $browserList.find("img").on("click",function () {
        var $this = $(this);
        var isDirectory = $this.attr("isDirectory");
        if (isDirectory === "true") {
          browserList($this.attr('data-id'));
        } else {
          var url = $this.attr("url");
          if (settings.input != null) {
            settings.input.val(url);
          } else {
            alert(url);
            // $browserButton.parent().parent().find(":text").val(url);
            // $browserButton.parent().parent().find(".imageId").val($this.attr('data-id'));
          }
          if (settings.callback != null && typeof settings.callback == "function") {
            settings.callback(url,$this.attr('data-id'));
          }

          $this.parents(".modal-container").animate({"top":"-100%"},500,"linear",function () {
            $this.parents(".modal-page").remove();
          });
        }
      });

      if (folderId === "") {
        $browserParentButton.unbind("click");
      } else {
        var folderId = $("#folderId").val();
        $browserParentButton.unbind("click").bind("click", function() {
          $.ajax({
            url: settings.parentUrl,
            type: "GET",
            data: {folderId: folderId},
            dataType: "json",
            cache: false,
            beforeSend: function() {
              $browserLoadingIcon.show();
            },
            success: function(data) {
              console.log(data);
              browserList(data.object);
            }
          });
        });
      }

      $browserOrderType.unbind("change").bind("change", function() {
        browserList(folderId);
      });
    };

    browserList("");
    $(fragContent).appendTo($(fragContainer));
    $(fragContainer).appendTo($(fragPage));
    $(fragPage).appendTo($(document.body));

    // 显示面板
    $(".modal-page").show().find(".modal-container").animate({"top":"100px"},500,"linear");

    // title可被拖动
    xmn.drag(".modal-page .title");

    // 面板中的点击事件
    $(document.body).off("click").on("click",function (e) {
      var e = e.target;
      if($(e).hasClass("btn-close")){// 关闭按钮
        $(e).parents(".modal-container").animate({"top":"-100%"},500,"linear",function () {
          $(e).parents(".modal-page").remove();
        });
      }
    });
  };

  // 标签页
  Xmn.prototype.tabs = function () {

    $(".tabs li").on("click",function (e) {
      var e = e.currentTarget;

      $(e).addClass("active").siblings().removeClass("active");
      var id = $(e).find("a").attr("href");
      $(id).show().siblings().hide();
    });
    $("a").click(function(event){
      event.preventDefault();
    });
  };

  // 进度条
  Xmn.prototype.progress = function(){
    $("xmn-progress").each(function(){
      var _progress = $(this);
      var _type = _progress.attr('x-type');
      var _value = _progress.attr('x-value');
      var _color = _progress.attr('x-color');
      var _radius = parseFloat(_progress.attr('x-radius'));
      var _width = _radius * 2 , _height = _width;
      if(_value>=100){_value=100;}
      if(_type == 'svg'){
        var _svg = xmn.svg({width:_width,height:_height},
          '<circle cx="'+_radius+'" cy="'+_radius+'" r="'+( (_width - 10)/2)+'" stroke-width="10"></circle>' +
          '<circle class="circle-bar" cx="'+_radius+'" cy="'+ _radius + '" r="'+((_width - 10) / 2)+'" stroke-width="10" ' +
          'transform="matrix(0,-1,1,0,0,'+_width+')" stroke-dasharray="0 1069"></circle> <text x="'+((_width - 30)/2)+'" y="'+ (_radius + 5) + '">'+_value+'%</text>');
        _progress.append($(_svg));
        var percent = _value / 100, perimeter = Math.PI * 2 * (_width - 10)/2;
        $(_svg).find("text").css('stroke',_color);
        $(_svg).find("circle").eq(1).attr('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent)).css('stroke',_color);
      }else if(_type == 'canvas'){
        var _canvas = xmn.element('canvas',{width:_width,height:_height},'你的浏览器不支持canvas!');
        _value= _value - 25;
        var ctx = _canvas.getContext("2d");
        var cw = _canvas.width;
        ctx.clearRect(0,0,_canvas.width,_canvas.height);
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.strokeStyle="#f5f5f5";
        ctx.arc(cw/2,cw/2,(cw-ctx.lineWidth)/2,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle=_color;
        var percent = _value / 100, perimeter = Math.PI * 2;
        ctx.arc(cw/2,cw/2,(cw-ctx.lineWidth)/2,-(0.25*perimeter),perimeter * percent);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.font="16px Arial";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillStyle= _color;
        ctx.fillText((_value+25)+"%",cw/2,cw/2);
        ctx.closePath();
        _progress.append(_canvas);
      }
    });
  };

  //cookies
  Xmn.prototype.cookie = {
    add:function(name, value, options) {
      if (arguments.length > 1 && name != null) {
        if (options == null) {
          options = {};
        }
        if (value == null) {
          options.expires = -1;
        }
        if (typeof options.expires == "number") {
          var time = options.expires;
          var expires = options.expires = new Date();
          expires.setTime(expires.getTime() + time * 1000);
        }
        document.cookie = encodeURIComponent(String(name)) + "=" + encodeURIComponent(String(value)) + (options.expires ? "; expires=" + options.expires.toUTCString() : "") + (options.path ? "; path=" + options.path : "") + (options.domain ? "; domain=" + options.domain : ""), (options.secure ? "; secure" : "");
      }
    },
    get:function(name) {
      if (name != null) {
        var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
        return value ? decodeURIComponent(value[1]) : null;
      }
    },
    remove:function(name, options) {
      addCookie(name, null, options);
    }
  };

  // jquery-validate表单验证
  if($.validator != null){
    Xmn.prototype.validate = function (element,obj) {
      (function( factory ) {
        if ( typeof define === "function" && define.amd ) {
          define( ["jquery", "jquery.validate"], factory );
        } else {
          factory( jQuery );
        }
      }(function( $ ) {
        $.extend($.validator.messages, {
          required: "这是必填字段",
          remote: "请修正此字段",
          email: "请输入有效的电子邮件地址",
          url: "请输入有效的网址",
          date: "请输入有效的日期",
          dateISO: "请输入有效的日期 (YYYY-MM-DD)",
          number: "请输入有效的数字",
          digits: "只能输入数字",
          creditcard: "请输入有效的信用卡号码",
          equalTo: "你的输入不相同",
          extension: "请输入有效的后缀",
          maxlength: $.validator.format("最多可以输入 {0} 个字符"),
          minlength: $.validator.format("最少要输入 {0} 个字符"),
          rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
          range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
          max: $.validator.format("请输入不大于 {0} 的数值"),
          min: $.validator.format("请输入不小于 {0} 的数值")
        });
      }));

      $().ready(function() {
        $(element).validate(obj);
      });
    };
    Xmn.prototype.validator = jQuery.validator;
  };

  //富文本插件
  if(typeof(KindEditor) != "undefined"){
    Xmn.prototype.kindEditor = function (fun) {
      KindEditor.ready(fun);
    };
  };

  //模板插件kino.razor
  if(window.kino !==undefined){
    Xmn.prototype.template = function (str, obj) {
      kino.razor(str,obj);
    }
  }

  //图表插件echarts
  if(window.echarts !==undefined){
    Xmn.prototype.echarts = echarts;
  }

  Xmn.prototype.init = function () {
    xmn.layout();
    xmn.tabs();
    xmn.btnDropMenu();
  };

  win.xmn = new Xmn();
  xmn.init();

  //扩展modal
  xmn.modal.close = function(id){
    var _height = _height ? _height : getComputedStyle($(".modal-page#" + id).find(".modal-container")[0]).height;
    $(".modal-page#" + id).find(".modal-container").animate({"top":"-"+_height},500,"linear",function () {
      $(".modal-page#" + id).remove();
    });
  };
})(window);






