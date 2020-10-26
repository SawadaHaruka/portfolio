export class Scroll {
  constructor() {
    this.ttt=document.getElementById('ttt');
    this.hd=document.getElementById('header');
    this.scroll();
    //②リンク用アイコンに変更
    this.ttt.style.cursor = 'pointer';

    this.menu();
  }

  scroll(){
    window.addEventListener('scroll', ()=> {
      let y = window.pageYOffset;
      if(y<=80){
        this.hd.style.background = '#fff0';
        this.hd.style.shadow='0 3px 8px 0 rgba(2, 23, 58, 0.2)' ;
        this.ttt.style.opacity= '0';
      }else{
        // this.hd.style.background = '#a0dfda';
        this.hd.style.background = '#92eadf';
        this.ttt.style.opacity= '1';
        this.mouse_evt(this.ttt);
      }
    });
  }

//マウスイベント
  mouse_evt(target){
    //押した
    target.addEventListener("mousedown", (evt) => {
      window.scroll({
        top:0,
        behavior:"smooth"
      });
    }, false);
  }


  menu(){
    let btn = document.querySelector('.Toggle');
    let nav = document.querySelector('.menu');
     
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      nav.classList.toggle('open');
    });
  }

}
let scroll = new Scroll();