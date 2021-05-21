class Scroll {
  constructor() {
    this.hd=document.getElementById('header');
    this.scroll();
  }

  scroll(){
    window.addEventListener('scroll', ()=> {
      let y = window.pageYOffset;
      if(y<=80){
        this.hd.style.background = '#fff0';
        this.hd.style.shadow='0 3px 8px 0 rgba(2, 23, 58, 0.2)' ;
      }else{
        this.hd.style.background = '#92eadf';
      }
    });
  }


}
const scroll = new Scroll();