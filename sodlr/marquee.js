(function($) {
      $.fn.eleWidth = function() {
        // var calc = '<span style="display:none">' + $(this).text() + '</span>';
        // $('body').append(calc);
        // var width = $('body').find('span:last').width();
        // $('body').find('span:last').remove();
        var width = $(this).width();
        return width;
      };

      $.fn.textWidth = function() {
        var calc = '<span style="display:none">' + $(this).text() + '</span>';
        $('body').append(calc);
        var width = $('body').find('span:last').width();
        $('body').find('span:last').remove();
        return width;
      };


      $.fn.marquee = function(args) {
        var that = $(this);
        var textWidth = that.textWidth();
        var eleWidth = that.eleWidth();
        if (eleWidth >= args.maxWidth){
            eleWidth = args.maxWidth;
        }
        var offset = that.width(),
            width = offset,
            args = $.extend(true, {
            count: -1,
            speed: 1e1,
            leftToRight: false,
            pause: 0,
            maxWidth: 299
            }, args),
            css = {
            'text-indent': that.css('text-indent'),
            'overflow': that.css('overflow'),
            'white-space': that.css('white-space'),
            'width': args.maxWidth,
            'text-align': "center"
            },
            marqueeCss = {
            'text-indent': width,
            'overflow': 'hidden',
            'white-space': 'nowrap',
            'width': eleWidth,
            'text-align':"left"
            },
            i = 0,
            stop = eleWidth * -1,
            dfd = $.Deferred();

            if (eleWidth < args.maxWidth){
                that.css(css); 
                return; 
            }

            if (eleWidth >= textWidth){
                var stop = eleWidth * -1
            } else {
                var stop = textWidth * -1
            }


        function go() {
          if (!that.length) return dfd.reject();
          if (width == stop) {
            i++;
            if (i == args.count) {
              setTimeout(go, args.speed);
            }
            if (args.leftToRight) {
              width = eleWidth * -1;
            } else {
              width = offset;
            }
          }
          that.css('text-indent', width + 'px');
          if (args.leftToRight) {
            width++;
          } else {
            width--;
          }
          if (width == 0) {
            if (args.pause != 0) {
                setTimeout(go, args.pause);
            } else {
              setTimeout(go, args.speed);
            }
          } else {
            setTimeout(go, args.speed);
          }
        };
        if (args.leftToRight) {
          width = eleWidth * -1;
          width++;
          stop = offset;
        } else {
          width--;
        }
        that.css(marqueeCss);
        setTimeout(go,args.speed);
        return dfd.promise();
      };
    })(jQuery);