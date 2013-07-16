$(document).ready(function (e) {
    init();
});

/**
 * 初始
 */
function init() {
    switchContent(1);
    beginBtn();
    initDatepicker()
}

var fileName, selectedDay;

/**
 * 按钮
 */
function beginBtn() {
    $("#next-btn,#next-btn2").click(function(){
        switchContent(2);
        createJson();
    });
}

/**
 * 内容切换 
 */
function switchContent(currentID){
    $("#nav-index").empty();
    var _html;
    switch(currentID){
        case 1:
            $("#step2").hide();
            $("#step1").show();

            $("#progress-bar").width("60%");

            _html = '<li class="active">设置日期和图片路径<span class="divider">/</span></li><li class="unenable-color">生成json</li>';

            break;
        case 2:
            $("#step1").hide();
            $("#step2").show();

            $("#progress-bar").width("100%");

            _html = '<li><a href="#" id="goto-step1">设置日期和图片路径</a><span class="divider">/</span></li><li class="active">生成json</li>';
            break;
    }
    $("#nav-index").append( _html );

    $("#goto-step1").unbind("click");
    $("#goto-step1").click(function(){
        switchContent(1);
    });
}

function initDatepicker(){
    
    $( "#datepicker" ).datepicker({
        numberOfMonths: 2,
        showButtonPanel: true,
        dateFormat: "yymmdd",
        onSelect: function(dateText, inst) {
            createDataToInput(dateText);
        }
    });
    
}

var nxmixServer = "http://xmas2011.nxmix.com/";
var upaiyunServer = "http://nextday-pic.b0.upaiyun.com/";
var upaiyunFileServer = "http://nextday-file.b0.upaiyun.com/";

function createDataToInput(day){
    selectedDay = day;
    var pic = nxmixServer + day + "/default@2x.jpg";
    var squarepicurl = upaiyunServer + day + "/default@2x.jpg!jpg85";
    var bigpicurl = upaiyunServer + day + "/big.jpg!jpg85";
    var bigpicurl2x = upaiyunServer + day + "/big@2x.jpg!jpg85";
    //var nitingimg2x = upaiyunServer + day + "/mimg@2x.jpg";
    var ip5default2x = upaiyunServer + day + "/default-568h@2x.jpg!jpg85";
    var ip5big2x = upaiyunServer + day + "/big-568h@2x.jpg!jpg85";
    var musicurl = upaiyunFileServer + selectedDay + "/"
    
    //$("#nitingimg2x").val(nitingimg2x);
    $("#pic").val(pic);
    $("#squarepicurl").val(squarepicurl);
    $("#bigpicurl").val(bigpicurl);
    $("#bigpicurl2x").val(bigpicurl2x);
    $("#iPhone5Standard").val(ip5default2x);
    $("#iPhone5Big").val(ip5big2x);    
    $("#clientMusicURL").val(musicurl);
}

function createJson(){
    
    var _event = $("#event").val();
    var _pic = $("#pic").val();
    var _squarepicurl = $("#squarepicurl").val();
    var _bigpicurl = $("#bigpicurl").val();
    var _bigpicurl2x = $("#bigpicurl2x").val();
    var _comment1 = $("#comment1").val();
    var _comment2 = $("#comment2").val()
    var _color_back = $("#color_back").val();
    var _nitingmusiccode = 'INVALID_'+ (+new Date()).toString();
    //var _nitingimg2x = $("#nitingimg2x").val();
    var _ip5default2x = $("#iPhone5Standard").val();
    var _ip5big2x = $("#iPhone5Big").val();
    var _musicurl = $("#clientMusicURL").val();
    var _songName = $("#songName").val();
    var _artist = $("#artist").val();

    var now = new Date();
    var _modifiedat = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString() + '-' + now.getDate().toString() + ' ' + now.getHours().toString() + ':' + now.getMinutes().toString() + ':' + now.getSeconds().toString();
    
    var data = {
        data: [
            {
                event                   : _event,
                pic                     : _pic,
                squarepicurl            : _squarepicurl,
                "squarepicurl@2x"       : _squarepicurl,
                "squarepicurl-568h@2x"  : _ip5default2x,
                "bigpicurl-568h@2x"     : _ip5big2x,
                bigpicurl               : _bigpicurl,
                "bigpicurl@2x"          : _bigpicurl2x,
                comment1                : _comment1,
                comment2                : _comment2,
                color_back              : _color_back,
                nitingmusiccode         : _nitingmusiccode,
                //"nitingimg@2x"          : _nitingimg2x,
                musicurl                : _musicurl,
                songname                : _songName,
                artist                  : _artist,
                modifiedat              : _modifiedat
            }
        ]
    };
    jsonData = JSON.stringify(data, null, '  ');
    
    //var jsonData = '{"data":[{"event": "' + _event + '","pic": "' + _pic + '","squarepicurl": "' + _squarepicurl + '","bigpicurl": "' + _bigpicurl + '","bigpicurl@2x": "' + _bigpicurl2x + '","comment1": "' + _comment1 + '","comment2": "' + _comment2 + '","color_back": "' + _color_back + '","nitingmusiccode": "' + _nitingmusiccode + '","nitingimg@2x":"' + _nitingimg2x + '"}]}';
    
    $("#jsonData").empty();
    $("#jsonData").append(jsonData);

    //initCopyClipboard();

    $("#copy-btn").unbind("click");
    $("#copy-btn").click( function(){

        initCopyText( $("#jsonData").text() );

    } );
}

/**
 * 模拟复制
 * @param text 要复制的文本
 */
function initCopyText( text ){
    var input = $("#copyText");
    input.text(text);
    input.focus();
    input.select();
    document.execCommand( 'Copy' );
    alert("复制成功！");
}