class Txanime {
  constructor() {
    document.addEventListener("DOMContentLoaded", this.init(), false);
  }

  ttt_scroll(){
    window.addEventListener('scroll', ()=> {
      let y = window.pageYOffset;
      if(y<=80){
        this.ttt.style.opacity= '0';
      }else{
        this.ttt.style.opacity= '1';
        this.mouse_evt(this.ttt);
      }
    });
  }

//マウスイベント
  mouse_evt(target){
    target.addEventListener("mousedown", (evt) => {
      window.scrollTo({
        top,
        behavior:"smooth"
      });
    }, false);
  }

//メニューをトグル
  menu(){
    let btn = document.querySelector('.Toggle');
    let nav = document.querySelector('.menu');
     
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      nav.classList.toggle('open');
    });
  }

  text() {
    let text = {
      duration: 1200,
      distance: '50px', //要素の移動距離
      origin: 'bottom', //要素が移動してくる方向
    };
    ScrollReveal().reveal('.work', text);

    let fbts = {
      delay: 100,
      duration: 1000,
      distance: '30px',
      origin: 'bottom',
      scale: 1.1,
      interval: 150
    };
    ScrollReveal().reveal('.fbts', fbts);

    let icon = {
      delay: 100,
      duration: 1000,
      distance: '30px',
      origin: 'bottom',
      scale: 1.2,
      interval: 150
    };
    ScrollReveal().reveal('.icon', icon);

    let sp_img = {
      duration: 1000,
      distance: '80px',
      origin: 'bottom',
      opacity:1,
      easing: 'ease' 
    };
    ScrollReveal().reveal('.sp_img', sp_img);

    let work2 ={
      // delay: 500,
      duration: 300,
      opacity:0,
      easing: 'ease' 
    };
    ScrollReveal().reveal('.work2', work2);

    let timeup ={
      delay: 200,
      duration: 300,
      opacity:0,
      scale: 1.6,
      easing: 'ease-in' 
    };
    ScrollReveal().reveal('#timeup', timeup);
  }

  init(){
    this.ttt=document.getElementById('ttt');
    this.ttt.style.cursor = 'pointer'; //リンク用アイコンに変更
    this.ttt_scroll();
    this.menu();
    this.text();
  }

}

const anime = new Txanime();