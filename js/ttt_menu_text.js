export class Txanime {
  constructor() {
    window.onload = ()=> {
      this.ttt=document.getElementById('ttt');
      this.ttt.style.cursor = 'pointer'; //リンク用アイコンに変更
      this.ttt_scroll();
      
      this.menu();
  
      this.text();
    }

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
      scale: 0.9
    };
    ScrollReveal().reveal('.work', text);

    let icon = {
      delay: 100,
      duration: 1000,
      distance: '30px',
      origin: 'bottom',
      scale: 1.2,
      interval: 150
    };
    ScrollReveal().reveal('.icon', icon);
  }

}

let anime = new Txanime();