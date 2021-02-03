export class Topg {
  constructor() {
    document.addEventListener("DOMContentLoaded", this.two_js(), false);
    this.elements();
  }
  two_js() {
    this.two = new Two({
      width: window.innerWidth, height: window.innerHeight,
      autostart: true
    }).appendTo(document.getElementById("svgStage"));

    this.s_w = this.two.width;
    this.s_h = this.two.height;
  }

  getRandomColor() {
    return 'rgb('
      + Math.floor(Math.random() * 255) + ','
      + Math.floor(Math.random() * 255) + ','
      + Math.floor(Math.random() * 255) + ')';
  }

  gladation_color() {
    //グラデーションを作る
    let colors = [
      '#92eadf',
      'rgb(255, 0, 61)',
      'rgb(246, 255, 0)',
      'rgb(0, 102, 255)',
      'rgb(153, 102, 255)',
      'rgb(0, 225, 255)'
    ];
    colors.index = 0;

    let random_num = Math.ceil(Math.random() * 5);

    let linearGradient = this.two.makeLinearGradient(
      this.s_w / 2, - this.s_h / 2, this.s_w / 2, this.s_h / 2,
      new Two.Stop(0, colors[0]),
      new Two.Stop(1, colors[random_num]),
      new Two.Stop(1, colors[0])
    );

    return linearGradient;
  }

  elements() {
    let frame = this.two.makeRectangle(this.s_w / 2, this.s_h / 2, this.s_w, this.s_h);
    frame.noFill().stroke = this.gladation_color();
    frame.linewidth = 150;

    this.two.update();

    /*
    *
    ウィンドウのリサイズによって変える
    *
    */
    window.addEventListener("resize", () => {
      this.s_w = this.two.width = window.innerWidth;
      this.s_h = this.two.height = window.innerHeight;

      frame.translation.set(this.s_w / 2, this.s_h / 2);
      frame.width = this.s_w;
      frame.height = this.s_h;
    }, false);
  }

}
let top_anime = new Topg();