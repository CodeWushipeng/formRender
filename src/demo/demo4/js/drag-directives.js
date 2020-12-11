

let   _MAX_WIDTH = null; // 最大宽度
const _MIN_WIDTH = 400;  // 最小宽度

function getId(id) {
  return document.getElementById(id);
}

function _getTags(tag) {
  return document.getElementsByTagName(tag)
}
function getTag(tag) {
  return _getTags(tag)[0];
}

function clearSelectEmpty() {
  window.getSelection().empty();
}

export default {
  drag(el, bindings) {
    el.onmousedown = function (e) {
      let disx = e.pageX - el.offsetLeft;
      // console.log("disx", disx);
      document.onmousemove = function (e) {
        // console.log("onmousemove...");
        // 取消文字的选中状态
        clearSelectEmpty();

        let $buss   = getId('buss');
        let $debugs = getId('debugs');
        let $body   = getTag('body');

        let WIN_WIDTH  = $body.clientWidth;
        let LEFT_WIDTH = e.pageX - disx;
        _MAX_WIDTH    = WIN_WIDTH - _MIN_WIDTH;
        if (LEFT_WIDTH < _MIN_WIDTH) {
          LEFT_WIDTH = _MIN_WIDTH;
        } else if (LEFT_WIDTH > _MAX_WIDTH) {
          LEFT_WIDTH = _MAX_WIDTH;
        }
        let RIGHT_WIDTH = WIN_WIDTH - LEFT_WIDTH;

        console.log('LEFT_WIDTH', LEFT_WIDTH)
        console.log('RIGHT_WIDTH', RIGHT_WIDTH)
        $buss.style.width = LEFT_WIDTH + "px";
        $debugs.style.width = RIGHT_WIDTH + "px";
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      }
    }
  }
}
