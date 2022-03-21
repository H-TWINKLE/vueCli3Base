export const drag = function (el: any) {
    el.onmousedown = function (e: any) {
        const l = e.clientX - el.offsetLeft
        const t = e.clientY - el.offsetTop
        document.onmousemove = function (e) {
            el.style.left = e.clientX - l + 'px'
            el.style.top = e.clientY - t + 'px'
        }
        el.onmouseup = function () {
            document.onmousemove = null
            el.onmouseup = null
        }
    }
}
