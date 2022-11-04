import { useTheme } from '@mui/material';
import React,{ useEffect } from 'react';

function BackgroundAnimation() {
    const theme = useTheme()

    var options = {
        particleColor: theme.palette.mode === 'dark' ? "rgba(200,200,200,0.7)" : "rgba(110,110,110,0.5)",
        lineColor: theme.palette.mode === 'dark' ? "rgba(0,181,255,0.54)" : "rgba(0,181,255,0.37)",
        particleAmount: 40,
        defaultRadius: 2,
        variantRadius: 1,
        defaultSpeed: 0.35,
        variantSpeed: 0.45,
        linkRadius: 120
    };

    console.log('render animation')

    useEffect(() => {

        var rgb = options.lineColor.match(/\d+/g);
        let w, h, id, canvas, ctx, particles;
        function init() {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            resizeReset();
            initialiseElements();
            animationLoop()
        }

        function resizeReset() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function initialiseElements() {
            particles = [];
            for (var i = 0; i < options.particleAmount; i++) {
                particles.push(new Particle());
            }
        }

        
        function animationLoop() {
            ctx.clearRect(0, 0, w, h);
            drawScene();
            id = requestAnimationFrame(animationLoop);
        }

        function drawScene() {
            drawLine();
            drawParticle();
        }

        function drawParticle() {
            for (var i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
        }

        function drawLine() {
            for (var i = 0; i < particles.length; i++) {
                linkPoints(particles[i], particles);
            }
        }

        function linkPoints(point, hubs) {
            for (var i = 0; i < hubs.length; i++) {
                var distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
                var opacity = 1 - distance / options.linkRadius;
                if (opacity > 0) {
                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + opacity + ')';
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(hubs[i].x, hubs[i].y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }

        function checkDistance(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }

        function Particle() {
            var _this = this;

            _this.x = Math.random() * w;
            _this.y = Math.random() * h;
            _this.color = options.particleColor;
            _this.radius = options.defaultRadius + Math.random() * options.variantRadius;
            _this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
            _this.directionAngle = Math.floor(Math.random() * 360);
            _this.vector = {
                x: Math.cos(_this.directionAngle) * _this.speed,
                y: Math.sin(_this.directionAngle) * _this.speed
            }

            _this.update = function () {
                _this.border();
                _this.x += _this.vector.x;
                _this.y += _this.vector.y;
            }

            _this.border = function () {
                if (_this.x >= w || _this.x <= 0) {
                    _this.vector.x *= -1;
                }
                if (_this.y >= h || _this.y <= 0) {
                    _this.vector.y *= -1;
                }
                if (_this.x > w) _this.x = w;
                if (_this.y > h) _this.y = h;
                if (_this.x < 0) _this.x = 0;
                if (_this.y < 0) _this.y = 0;
            }

            _this.draw = function () {
                ctx.beginPath();
                ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = _this.color;
                ctx.fill();
            }
        }

        init()

        return (() => {
            console.log('remove')
            window.cancelAnimationFrame(id);
        })
    }, [options])
    return (
        <canvas id="canvas" style={{
            display: 'block',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -9999,
        }}></canvas>
    )
}



export default React.memo(BackgroundAnimation)