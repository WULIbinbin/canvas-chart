;
(function($) {
    $.fn.extend({
        canvasHHL: function(opt) {
            var opt = $.extend({
                        cRadius: '',//内圆边框宽度
                        rRadius: '',//外圆边框宽度
                        clip: '',//内外圆半径
                        rate: '',//退货率，小数
                        cwidth: '',//canvas宽
                        cheight: '',//canvas高
                        ftext:'',//说明
                        isTouch: false//是否直接显示
                    }, opt);
            var canvas = document.createElement('canvas');
            canvas.width = opt.cwidth;
            canvas.height = opt.cheight;
            var width = canvas.width,
            height = canvas.height,
            ctx = canvas.getContext('2d');
            canvas.style.border = '1px solid #ccc';
            canvas.style.background = '#fff';
             if(window.devicePixelRatio) {
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.height = height * window.devicePixelRatio * 2;
                    canvas.width = width * window.devicePixelRatio * 2;
                    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                } else {
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.height = height * 2;
                    canvas.width = width * 2;
                }
            var Circle = function() {   
                ctx.beginPath();         
                ctx.arc(canvas.width / 2, canvas.width / 2 + 10, opt.clip, 0, Math.PI * 2, true);
                ctx.lineWidth = opt.cRadius;
                ctx.strokeStyle = '#ccc';
                ctx.stroke();
                ctx.font = '28px 微软雅黑';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#4d4d4d';
                ctx.fillText(opt.ftext, canvas.width / 2, 50);      
                ctx.closePath();    
            }
                   
            var Ring = function() {
                var rates = 0,
                that = this;
                var timer = setInterval(function() {
                    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);                
                    Circle();       
                    ctx.beginPath();
                    ctx.font = '28px 微软雅黑';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#868686';
                    var pret = Math.floor(rates * 100);
                    ctx.fillText( pret+ '%', canvas.width / 2, canvas.width / 2 + 22);
                    if(!opt.isTouch) {
                        ctx.arc(canvas.width / 2, canvas.width / 2 + 10, opt.clip, 1.5 * Math.PI, 1.5 * Math.PI + Math.PI * 2 * rates, false);
                    } else {
                        ctx.arc(canvas.width / 2, canvas.width / 2 + 10, opt.clip, 1.5 * Math.PI, 1.5 * Math.PI + Math.PI * 2 * rate, false);
                    }
                    ctx.lineWidth = opt.rRadius;
                    if(opt.rate < 0.33) {
                        ctx.strokeStyle = '#41c472';
                    } else if(opt.rate > 0.33 && opt.rate < 0.66) {
                        ctx.strokeStyle = '#f48208';
                    } else {
                        ctx.strokeStyle = '#f33d1f';
                    }
                    ctx.stroke();
                    ctx.closePath();
                    rates += 0.01;
                    if(rates >= opt.rate) {
                        clearInterval(timer);
                    }
                },12);
                
            }
            isTouched = false;
            $(this).on('mouseover', function() {
                $(this).append(canvas);
                $(this).children('canvas').fadeIn(100);               
                 if(!isTouched){
                    setTimeout(function() {
                          Ring();
                    }, 140);
                 }
                 isTouched = true;
            }).on('mouseleave', function() {
                $(this).children('canvas').fadeOut(100)
            })
        }
    })
})(jQuery);