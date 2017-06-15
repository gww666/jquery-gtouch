(function () {

    var handle = (function () {
        //touch对象，内含配置信息
        var touch = {
            direction : 20,
            duration : 1000
        };

        //绑定touch监听事件
        function bindSwipeEvent(ele, name, callback, options) {
            var startPoint, endPoint;
            ele.on("touchstart", function (event) {
                startPoint = event.touches[0];
                var startPageX = event.touches[0].pageX;
                var startPageY = event.touches[0].pageY;
                function clearData() {
                    startPoint = undefined;
                    endPoint = undefined;
                }
                ele.on("touchend", function (event) {
                    // console.log(event);
                    endPoint = event.changedTouches[0];
                    var endPageX = event.changedTouches[0].pageX;
                    var endPageY = event.changedTouches[0].pageY;

                    if (startPoint && endPoint && (name === getDirection(startPageX, endPageX))) {
                        callback();
                        clearData();
                    }
                });
            });
        }

        //判断该用户当前行为是左滑还是右滑
        function getDirection(startX, endX) {
            if (startX - endX > touch.direction) {
                return "swipeLeft";
            } else if (endX - startX > touch.direction) {
                return "swipeRight";
            }
        }

        //绑定事件
        touch.fun = function (ele, name, callback, options) {
            if (options) {
                bindSwipeEvent(ele, name, callback, options);
            } else {
                bindSwipeEvent(ele, name, callback);
            }
        }
        return touch;
    })();

    $.fn.touchSwipe = function (name, callback, options) {
        var ele = this;
        console.log(this);
        handle.fun(ele, name, callback, options);
    }

})();