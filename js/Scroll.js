class Scroll {
  constructor() {
    this.scroll();
  }

  scroll() {
    let hd = document.getElementById('header');
    let menu_white = document.getElementsByClassName('menu_white');
    let len = menu_white.length;

    window.addEventListener('scroll', () => {
      let y = window.pageYOffset;
      if (y <= 80) {
        hd.style.background = '#fff0';
        hd.style.shadow = '0 3px 8px 0 rgba(2, 23, 58, 0.2)';
      } else {
        hd.style.background = '#92eadf';
      }

      for (let a = 0; a < len; a++) {
        if (y <= 80) {
          menu_white[a].style.color = 'white';
        } else {
          menu_white[a].style.color = 'black';
        }
      }

    });


  }
}
const scroll = new Scroll();