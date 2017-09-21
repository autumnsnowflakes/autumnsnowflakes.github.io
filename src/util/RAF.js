// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

let PI_D2 = Math.PI / 2,
  easingEquations = {
    easeOutSine: function (pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine: function (pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    },
    easeInOutQuint: function (pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5);
      }
      return 0.5 * (Math.pow((pos - 2), 5) + 2);
    }
  };

// main function
function scrollToX(parentId,targetX, spd, ease) {
  // scrollTargetX: the target scrollX property of the window
  // speed: time in pixels per second 
  // easing: easing equation to use

  let scrollX = document.getElementById(parentId).scrollLeft,
    scrollTargetX = targetX || 0,
    speed = spd || 2000,
    easing = ease || 'easeOutSine',
    currentTime = 0;

  // min time .1, max time .8 seconds
  let time = Math.max(.1, Math.min(Math.abs(scrollX - scrollTargetX) / speed, .8));

  // add animation loop
  function tick() {
    currentTime += 1 / 60;

    let p = currentTime / time;
    let t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);

      document.getElementById(parentId).scrollLeft = scrollX + (scrollTargetX - scrollX) * t;

    } else {
      console.log('scroll done');
      document.getElementById(parentId).scrollLeft = scrollTargetX;
    }
  }

  // call it once to get started
  tick();
}

function scrollToY(parentId, targetY, spd, ease) {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second 
  // easing: easing equation to use

  let scrollY = document.getElementById(parentId).scrollTop,
    scrollTargetY = targetY || 0,
    speed = spd || 2000,
    easing = ease || 'easeOutSine',
    currentTime = 0;

  // min time .1, max time .8 seconds
  let time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js

  // add animation loop
  function tick() {
    currentTime += 1 / 60;

    let p = currentTime / time;
    let t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);

      document.getElementById(parentId).scrollTop = scrollY + (scrollTargetY - scrollY) * t;

    } else {
      console.log('scroll done');
      document.getElementById(parentId).scrollTop = scrollTargetY;
    }
  }

  // call it once to get started
  tick();
}

// scroll it!

export default {
  scrollToX,
  scrollToY
};