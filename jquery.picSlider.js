///<reference path="http://apps.bdimg.com/libs/jquery/2.0.0/jquery.min.js"/>

(function($){
    var defaults={
        dotstyle: "dotStyle-FillUp",
        pauseTime: "20000"
    }
    var autoSlider=function(pic_num){
        var nextIndex=(currentIndex==pic_num)?0:currentIndex+1;
        var nextImgSrc=$(".picSlider img:eq(" + nextIndex + ")").attr("src");
        $("#slider").css("background-image","url("+nextImgSrc+")");
        var $curSeleDot = $(".dotList a:eq(" + currentIndex + ")");
        var $nextSeleDot= $(".dotList a:eq(" + nextIndex + ")");
        $curSeleDot.removeClass("active").addClass("inactive");
        $nextSeleDot.removeClass("inactive").addClass("active");
        currentIndex=nextIndex;
    }
    var currentIndex=0;
    $.fn.extend({
        "pictureSlider":function(options){
            var $this=$(this);
            var options= $.extend(defaults,options);
            var pauseTime=options.pauseTime;
            var dotstyle=options.dotstyle;
            var defaultSrc=$(".picSlider img:eq(" + 0 + ")").attr("src");
            $("#slider").css("background-image","url("+defaultSrc+")");
            //获取图片数量
            var num=$(".picSlider img").size()-1;
            //添加导航圆点
            $this.after("<div class='dotNagiv "+ dotstyle +"'></div>");
            $(".dotNagiv").append("<ul class='dotList'></ul>");
            $(".dotList").append("<li><a class='active' href='#'></a></li>");
            for (var i=1;i<=num;i++){
                $(".dotList").append("<li><a href='#'></a></li>");
            }
            //每隔20s自动切换下一张，顺序轮流播放
            var t=setInterval(function(){autoSlider(num);},pauseTime); //autoSlider函数名不能加引号, 用匿名函数包装来解决使用函数名作为调用句柄时不能带参数的问题
            $(".dotList").find("a").each(function(index){
                //鼠标悬停在导航圆点上来切换图片
                $(this).mouseover(function() {
                    clearInterval(t);
                    var $curSeleDot = $(".dotList a:eq(" + currentIndex + ")");
                    $curSeleDot.removeClass("active").addClass("inactive");
                    $(this).removeClass("inactive").addClass("active");
                    var newImgSrc=$(".picSlider img:eq(" + index + ")").attr("src");
                    $("#slider").css("background-image","url("+newImgSrc+")");
                    currentIndex=index;
                    t=setInterval(function(){autoSlider(num);},pauseTime); //这里t不能重新定义
                    return $(this);
                })
            })
        }
    });
})(jQuery);

