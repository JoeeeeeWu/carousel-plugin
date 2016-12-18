;
(function ($) {
    var Carousel = function (poster) {
        var self=this;
//        保存单个旋转木马dom对象
        this.poster = poster;
//        保存幻灯片dom对象
        this.posterItemMain = poster.find("ul.poster-list");
//        保存下一个幻灯片的按钮
        this.nextBtn = poster.find("div.poster-next-btn");
//        保存前一个幻灯片的按钮
        this.prevBtn = poster.find("div.poster-prev-btn");  
        this.posterItems=poster.find("li.poster-item");
        if(this.posterItems.length%2==0){
            this.posterItemMain.append(this.posterItems(0).clone());
            this.posterItems=this.posterItemMain.children();
        }
//        保存第一帧dom对象
        this.posterFirstItem=this.posterItems.first();
//        保存最后一帧dom对象
        this.posterLastItem=this.posterItems.last();
        this.rotateFlag=true;
        if(this.posterItems.length%2==0){
            this.posterItemMain.append(this.posterFirstItem.clone());
        }
        //        默认配置参数
        this.setting = {
//            幻灯片的宽度
            "width": 1000,
//            幻灯片的高度
            "height": 250,
//            第一帧对的宽度
            "posterWidth": 720,
//            第一帧的高度
            "posterHight": 250,
//            排列方式
            "verticalAlign": "middle",
            "scale": 0.9,
//            自动轮播速度
            "speed": 500,
            "autoPlay": true,
            "delay":3000,
        };
        $.extend(this.setting,this.getSetting());
        this.setSettingValue();
        this.setPosterPos();
        
        this.nextBtn.click(function(){
            if(self.rotateFlag){
                self.rotateFlag=false;
                self.carouselRotate("left");
            }
        });
        this.prevBtn.click(function(){
            if(self.rotateFlag){
                self.rotateFlag=false;
                self.carouselRotate("right");
            }
        });
//        是否开启自动轮播
        if(this.setting.autoPlay){
            this.autoPlay();
            this.poster.hover(function(){
                window.clearInterval(self.timer);
            },function(){
                self.autoPlay();
            });
        };
    }
    Carousel.prototype = {
        constructor : Carousel,
        autoPlay : function(){
            var self=this;
            this.timer=window.setInterval(function(){
                self.nextBtn.click();
            },self.setting.delay);
        },
//        旋转
        carouselRotate : function(dir){
            var _this_=this,
                zIndexArr=[];
            if(dir==="left"){
                this.posterItems.each(function(){
                    var self=$(this),
                        prev=self.prev().get(0)?self.prev():_this_.posterLastItem,
                        width=prev.width(),
                        height=prev.height(),
                        zIndex=prev.css("zIndex"),
                        opacity=prev.css("opacity"),
                        left=prev.css("left"),
                        top=prev.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                       width:width,
                        height:height,
                        zIndex:zIndex,
                        opacity:opacity,
                        left:left,
                        top:top
                    },_this_.setting.speed,function(){
                        _this_.rotateFlag=true;
                    });
                });
                this.posterItems.each(function(i){
                        $(this).css("zIndex",zIndexArr[i]);
                    });
            }else if(dir==="right"){
                this.posterItems.each(function(){
                    var self=$(this),
                        next=self.next().get(0)?self.next():_this_.posterFirstItem,
                        width=next.width(),
                        height=next.height(),
                        zIndex=next.css("zIndex"),
                        opacity=next.css("opacity"),
                        left=next.css("left"),
                        top=next.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                       width:width,
                        height:height,
                        zIndex:zIndex,
                        opacity:opacity,
                        left:left,
                        top:top
                    },_this_.setting.speed,function(){
                        _this_.rotateFlag=true;
                    });
                });
                this.posterItems.each(function(i){
                        $(this).css("zIndex",zIndexArr[i]);
                    });
            }
        },
//        设置剩余帧的位置关系
        setPosterPos : function(){
            var sliceItems=this.posterItems.slice(1),
                sliceSize=sliceItems.length/2,
                rightSlice=sliceItems.slice(0,sliceSize),
                leftSlice=sliceItems.slice(sliceSize),
                level = Math.floor(this.posterItems.length/2),
                rw=this.setting.posterWidth,
                rh=this.setting.posterHight,
                gap=((this.setting.width-this.setting.posterWidth)/2)/level,
                firstLeft=(this.setting.width-this.setting.posterWidth)/2,
                fixOffsetLeft=firstLeft+rw,
                _self=this;
//            设置右边帧的位置关系
            rightSlice.each(function(i){
                var j=i;
                level--;
                rw=rw*_self.setting.scale;
                rh=rh*_self.setting.scale;
                $(this).css({
                    zIndex : level,
                    width : rw,
                    height : rh,
                    opacity : 1/(++i),
                    left : fixOffsetLeft+(++j)*gap-rw,
                    top : _self.setVerticalAlign(rh),
                });
            });
//            设置左边帧的位置关系
            var lw=rightSlice.last().width(),
                lh=rightSlice.last().height(),
                oloop=Math.floor(this.posterItems.length/2);
            leftSlice.each(function(i){
                $(this).css({
                    zIndex : i,
                    width : lw,
                    height : lh,
                    opacity : 1/oloop,
                    left : i*gap,
                    top : _self.setVerticalAlign(lh),
                });
                lw=lw/_self.setting.scale;
                lh=lh/_self.setting.scale;
                oloop--;
            });
        },
//        设置垂直对齐
        setVerticalAlign : function(height){
            var verticalType=this.setting.verticalAlign,
                top = 0;
            if(verticalType==="middle"){
                top=(this.setting.height-height)/2;
            }else if(verticalType==="top"){
                top=0;
            }else if(verticalType==="bottom"){
                top=this.setting.height-height;
            }else{
                top=(this.setting.height-height)/2;
            }
            return top;
        },
//        设置配置参数去控制基本的宽高
        setSettingValue : function(){
            this.poster.css({
                width : this.setting.width,
                height : this.setting.height,
            });
            this.posterItemMain.css({
                width : this.setting.width,
                height : this.setting.height,
            });
//            计算前后切换按钮宽度
            var w = (this.setting.width-this.setting.posterWidth)/2;
            this.nextBtn.css({
                width : w,
                height : this.setting.height,
                zIndex : Math.ceil(this.posterItems.length/2),
            });
            this.prevBtn.css({
                width : w,
                height : this.setting.height,
                zIndex : Math.ceil(this.posterItems.length/2),
            });
            this.posterFirstItem.css({
                width : this.setting.posterWidth,
                height : this.setting.posterHight,
                left : w,
                zIndex : Math.floor(this.posterItems.length/2),
            });
        },
//        获取人工配置参数
        getSetting : function(){
            var setting = this.poster.attr("data-setting");
            if(setting && setting !== ""){
                return $.parseJSON(setting);
            }else{
                return {};
            }
            
    }
        
    }
    Carousel.init = function (posters) {
        var _this_ = this;
        posters.each(function () {
            new _this_($(this));
        });
    }
    window["Carousel"] = Carousel;
})(jQuery);