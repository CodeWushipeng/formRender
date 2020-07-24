

export let _MAX_WIDTH = null; // 最大宽度
export const _MIN_WIDTH = 400; // 最小宽度

export function getId(id) {
  return document.getElementById(id)
}

export function getTag(tag) {
  return document.getElementsByTagName(tag)
}

export function clearSelectEmpty() {
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
        let $body   = getTag('body')[0];

        let WIN_WIDTH  = $body.clientWidth;
        let leftWidth = e.pageX - disx;
        _MAX_WIDTH    = WIN_WIDTH - _MIN_WIDTH;
        if (leftWidth < _MIN_WIDTH) {
          leftWidth = _MIN_WIDTH;
        } else if (leftWidth > _MAX_WIDTH) {
          leftWidth = _MAX_WIDTH;
        }
        let rightWidth = WIN_WIDTH - leftWidth;

        console.log('leftWidth', leftWidth)
        console.log('rightWidth', rightWidth)
        $buss.style.width = leftWidth + "px";
        $debugs.style.width = rightWidth + "px";
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      }
    }
  }
}
