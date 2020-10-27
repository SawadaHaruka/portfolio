export class Top {
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

    let tri = this.two.makePolygon(this.s_w / 4, this.s_h * 2 / 3, 120, 3);
    tri.noStroke().fill = this.gladation_color();

    this.two.update();

    this.two.bind('update', function (frameCount, timeDelta) {
      tri.rotation = frameCount / 130;
    });

    tri._renderer.elem.addEventListener("click", () => {
      tri.fill = this.gladation_color();
    });
    tri._renderer.elem.addEventListener("mouseover", () => {
      this.two.bind('update', function (frameCount, timeDelta) {
        tri.rotation = frameCount / 20;
      });
    });

    tri._renderer.elem.addEventListener("mouseout", () => {
      this.two.bind('update', function (frameCount, timeDelta) {
        tri.rotation = frameCount / 100;
      });
    });

    this.rects = [];
    for (let i = 0; i < 12; i++) {
      let degree = i * 360 / 12; //360/要素の数
      let rad = degree * Math.PI / 180;
      let r = 1;
      let x = Math.cos(rad) * r;
      let y = Math.sin(rad) * r;
      let rect = this.two.makeRoundedRectangle(x + this.s_w / 2, y + this.s_h / 2, 30, 30, 2);
      rect.noStroke().fill = this.gladation_color();
      rect.rotation += rad;
      this.rects.push(rect);
    }
    this.group = this.two.makeGroup(this.rects);
    this.group.translation.set(this.s_w * 3 / 4, this.s_h / 3);

    this.rects2 = [];
    for (let j = 0; j < 12; j++) {
      let degree2 = j * 360 / 12;
      let rad2 = degree2 * Math.PI / 180;
      let r2 = 1;//親の半径
      let x2 = Math.cos(rad2) * r2;
      let y2 = Math.sin(rad2) * r2;

      let rect2 = this.two.makeRoundedRectangle(x2 + this.s_w / 2, y2 + this.s_h / 2, 80, 10, 2);
      rect2.noStroke().fill = '#FF00E0';
      rect2.rotation += rad2;
      this.rects2.push(rect2);
    }
    this.group2 = this.two.makeGroup(this.rects2);
    this.group2.translation.set(this.s_w * 4 / 5, this.s_h * 2 / 5);

    this.BIGgroup = this.two.makeGroup(this.group, this.group2);
    this.BIGgroup.opacity = 0;
    this.BIGgroup.scale = 0;

    this.animation();
    this.move();

    let shape = this.two.interpret(document.getElementById('SawadaHaruka')).center();
    shape.translation.set(this.s_w / 2, this.s_h / 2);
    /*
    *
    ウィンドウのリサイズによって変える
    *
    */
    window.addEventListener("resize", () => {
      this.s_w = this.two.width = window.innerWidth;
      this.s_h = this.two.height = window.innerHeight;

      this.group.translation.set(this.s_w * 3 / 4, this.s_h / 3);
      this.group2.translation.set(this.s_w * 4 / 5, this.s_h * 2 / 5);

      frame.translation.set(this.s_w / 2, this.s_h / 2);
      frame.width = this.s_w;
      frame.height = this.s_h;

      tri.translation.set(this.s_w / 4, this.s_h * 2 / 3);

      shape.translation.set(this.s_w / 2, this.s_h / 2);
      shape.width = this.s_w;
      shape.height = this.s_h;
    }, false);
  }

  animation() {
    createjs.Tween.get(this.BIGgroup)
      .to({ opacity: 1, scale: 1 }, 300, createjs.Ease.elasticOut);
  }

  move() {
    let oldSeconds;
    let state = 0;
    let kaiten = Math.ceil(Math.random() * 4); //ランダムで決める回転数

    this.st = 0;
    this.sta = 0;

    //-----------------------------------------------------
    this.two.bind('update', () => {

      this.time = new Date();
      this.sec = this.time.getSeconds();
      let update = false;//updateするべきかどうかの条件を保存しておく一時的な変数
      if (this.sec != oldSeconds) {
        oldSeconds = this.sec;
        update = true;
      }

      // this.group.rotation += (Math.PI * kaiten - this.group.rotation) * 0.03;
      this.group.rotation += 0.02;
      this.group2.rotation -= 0.03;
      // this.group2.rotation += (Math.PI * 2 - this.group2.rotation) * 0.023;
      // this.group2.rotation += (Math.PI * kaiten / 2 - this.group2.rotation) * 0.03;

      // //個々の要素を動かす
      for (let h = 0; h < 12; h++) {
        let aaa = this.rects[h];
        let bbb = this.rects2[h];

        let deg = h * 360 / 12; //360/要素の数
        let radd = deg * Math.PI / 180;

        let rr = 200;
        let xx = Math.cos(radd) * rr;
        let yy = Math.sin(radd) * rr;

        let rrr = 100;
        let xxx = Math.cos(radd) * rrr;
        let yyy = Math.sin(radd) * rrr;


        //マル回回る　かつ　ステートが０だったら
        if (this.group.rotation >= Math.PI * kaiten - 0.01 && state == 0) {
          //回転　＞＝　円周率　＊　４（180度＊４＝２回転）
          // if (this.group.rotation >= Math.PI * 2  && this.state==0) {
          this.group.rotation = 0;
          this.group2.rotation = 0;
          state = 1;
        } else if (this.group.rotation >= Math.PI * kaiten - 0.01 && state == 1) {
          this.group.rotation = 0;
          this.group2.rotation = 0;
          state = 0;
        }

        if (state == 0) {
          createjs.Tween.get(aaa.translation).to({ x: xx, y: yy }, 200);//個々の要素に対して
          createjs.Tween.get(this.group2).to({ fill: '#ffe000' }, 10);//グループ全体に対して

          createjs.Tween.get(bbb.translation).to({ x: xxx, y: yyy }, 200);
          createjs.Tween.get(this.group).to({ fill: '#00e1ff' }, 10);

          createjs.Tween.get(aaa).to({ width: 30, height: 30, radius: 15 }, 100);
          createjs.Tween.get(bbb).to({ width: 20, height: 20, radius: 10 }, 100);

        } else if (state == 1) {
          createjs.Tween.get(aaa.translation).to({ x: xxx, y: yyy }, 200);
          createjs.Tween.get(this.group2).to({ fill: '#ff0043' }, 10);

          createjs.Tween.get(bbb.translation).to({ x: xx, y: yy }, 200);
          createjs.Tween.get(this.group).to({ fill: '#92eadf' }, 10);

          createjs.Tween.get(aaa).to({ width: 20, height: 20, radius: 2 }, 100);
          createjs.Tween.get(bbb).to({ width: 30, height: 30, radius: 2 }, 100);
        }

        //-----------------------------------------------------
        // if (update) {
        //   //5秒ごとに判定
        //   if (this.sec % 10 == 0) {
        //   } else if (this.sec % 2 == 0 && this.sec % 10 == 0) {
        //   } else {
        //   }
        // }

      }
    });
    this.two.update();
  }



}
let top_anime = new Top();