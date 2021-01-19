/* Prefix MH stands for menu_highlighter */

const MH_MENU = 'menu-item-'

const mh_highlight_menu = function(path){
    document.getElementsByClassName(MH_MENU + path)[0].classList.remove('no-highlight')
}