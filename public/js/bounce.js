$(document).ready(
    function () {
        var xpos = 0;
        var ypos = 0;
        var speed = 0;
        var lastStamp = 0;
        var lastX = 0;
        var gravity = 0.096;
        var leftSpeed = 0;
        var rightSpeed = 0;

        $(document).keydown(function (e) {
            switch(e.key) {
                case "ArrowDown":
                    speed += 4;
                    break;
                case "ArrowUp":
                    speed -= 4;
                    break;
                case "ArrowLeft":
                    xpos -= 4;
                    leftSpeed += 4;
                    break;
                case "ArrowRight":
                    xpos += 4;
                    rightSpeed += 4;
                    break;
            }
        });

        function update(progress) {
            if (rightSpeed > 0) {
                xpos += Math.floor(rightSpeed);
            }
            if (leftSpeed > 0) {
                xpos -= Math.floor(leftSpeed);
            }

            ypos += Math.floor(speed);

            if (xpos > ($(".game").css("width").slice(0,-2) * 1 - 100)) {
                leftSpeed = rightSpeed;
                rightSpeed = 0;
            }

            if (xpos < 0) {
                rightSpeed = leftSpeed;
                leftSpeed = 0;
            }

            if (ypos > ($(".game").css("height").slice(0,-2) * 1 - 100)) {
                ypos = $(".game").css("height").slice(0,-2) * 1 - 100;

                if (rightSpeed > 0) {
                    speed -= rightSpeed * gravity;
                }
                else if (leftSpeed > 0) {
                    speed -= leftSpeed * gravity;
                }
                else {
                    speed -= gravity;
                }
                speed *= -1;
            }

            if (ypos < 0) {
                speed *= -1;
            }

            speed += gravity;
            if (leftSpeed > 0) {
                leftSpeed -= 0.01;
            }
            else if (rightSpeed > 0) {
                rightSpeed -= 0.01
            }
        }

        function draw() {
            $(".obj").css("margin-left", xpos + "px");
            $(".obj").css("margin-top", ypos + "px");
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
