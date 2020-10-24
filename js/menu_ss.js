export class Scroll {
  constructor() {
    this.menu();
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