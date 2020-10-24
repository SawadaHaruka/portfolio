export class Txanime {
  constructor() {
    this.text();
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