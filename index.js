// 判断浏览器如果高度如果比内容区域高度高，则把footer绝对定位到页面底部
const pageAdap = ()=>{
    const footer = document.getElementsByTagName('footer')[0]
    if(window.innerHeight > document.querySelector('main>.z-container').offsetHeight + 95){
        footer.style.position = 'absolute';
        footer.style.bottom = '0';
        footer.style.right = '0';
        footer.style.left = '0';
    }else{
        footer.removeAttribute('style')
    }
};
pageAdap();
window.addEventListener('resize', pageAdap);

// 小分辨率下导航切换
const sideTrigger = ()=>{
    var nav = document.getElementsByTagName('nav')[0];
    if(nav.style.display){
        nav.firstElementChild.style.width = '0';
        setTimeout(()=>{
            nav.removeAttribute('style');
        },400);
    }else{
        nav.style.display = 'block';
        nav.style.opacity = '1';
        nav.style.visibility = 'visible';
        setTimeout(()=>{
            nav.firstElementChild.style.width = '50%';
        },100);
    }
}
document.querySelector('.side-trigger').addEventListener('click',sideTrigger)