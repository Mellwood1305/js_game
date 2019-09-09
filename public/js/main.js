$(document).ready(
    function () {
        var xpos = 0;
        var ypos = 0;
        var dir = 'right';
        var speed = 100;
        var lastStamp = 0;
        var lastX = 0;

        $(document).keydown(function (e) {
            switch(e.key) {
                case 'ArrowDown':
                    if (ypos < ($('.game').css('height').slice(0,-2) * 1 - 100)) {
                        ypos += speed;
                    } else {
                        ypos = 0;
                    }
                    //dir = 'down';
                    break;
                case 'ArrowUp':
                    if (ypos > 0) {
                        ypos -= speed;
                    } else {
                        ypos = $('.game').css('height').slice(0,-2) * 1 - 100;
                    }
                    //dir = 'up';
                    break;
                case 'ArrowLeft':
                    if (xpos > 0) {
                        xpos -= speed;
                    } else {
                        xpos = $('.game').css('width').slice(0,-2) * 1 - 100;
                    }
                    //dir = 'left';
                    break;
                case 'ArrowRight':
                    if (xpos < ($('.game').css('width').slice(0,-2) * 1 - 100)) {
                        xpos += speed;
                    } else {
                        xpos = 0;
                    }
                    break;
            }
        });

        function update(progress) {
            /*if (dir == 'right') {
                xpos += 4;
            } else if (dir == 'left') {
                xpos -= 4;
            } else if (dir == 'down') {
                ypos += 4;
            } else if (dir == 'up') {
                ypos -= 4;
            }*/

            /*if (xpos > ($('.game').css('width').slice(0,-2) * 1 - 100)) {
                dir = 'left';
            }

            if (xpos <= 1) {
                dir = 'right';
            }

            if (ypos > ($('.game').css('height').slice(0,-2) * 1 - 100)) {
                dir = 'up';
            }

            if (ypos <= 1) {
                dir = 'down';
            }*/
        }

        function draw() {
            $('.obj').css('margin-left', xpos + 'px');
            $('.obj').css('margin-top', ypos + 'px');
        }

        function loop(timestamp) {
            var progress = timestamp - lastRender;

            if (timestamp >= lastStamp + 1000) {
                lastStamp = timestamp;
                lastX = xpos;
            }


            update(progress);
            draw();

            lastRender = timestamp;
            window.requestAnimationFrame(loop);
        }
        var lastRender = 0;
        window.requestAnimationFrame(loop);
    }
)
