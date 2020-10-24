export class Main2 {
  constructor() {
    document.addEventListener("DOMContentLoaded", this.two_js(), false);

  }

  getRandomColor() {
    return 'rgb('
      + Math.floor(Math.random() * 255) + ','
      + Math.floor(Math.random() * 255) + ','
      + Math.floor(Math.random() * 255) + ')';
  }

    two_js() {
    this.two = new Two({
      width: window.innerWidth, height: window.innerHeight,
      autostart: true
    }).appendTo(document.getElementById("svgStage"));

    this.s_w = this.two.width;
    this.s_h = this.two.height;
    
    let rectangl = this.two.makeRectangle(this.s_w / 2, this.s_h / 2, this.s_w, this.s_h);
    rectangl.noFill().stroke =this.getRandomColor();
    rectangl.linewidth = 50;

    window.addEventListener("resize", ()=>{
      this.two=  new Two({
        width: window.innerWidth, height: window.innerHeight,
      });
      this.s_w = this.two.width;
      this.s_h = this.two.height;
      console.log(this.s_w);

      // rectangl.scale(this.s_w / 2, this.s_h / 2, this.s_w, this.s_h);
      rectangl.noFill().stroke =this.getRandomColor();
      rectangl.linewidth = 50;
      rectangl.translation.set(this.s_w / 2, this.s_h / 2);
    }, false);

    let colors = [
      'rgb(160, 223, 218)',
      'rgb(255, 64, 64)',
      'rgb(246, 255, 0)',
      'rgb(0, 102, 255)',
      'rgb(153, 102, 255)',
      'rgb(255, 244, 95)'
    ];
    colors.index = 0;

    let random_num= Math.ceil(Math.random() * 5);
    console.log(random_num);

    let linearGradient = this.two.makeLinearGradient(
      this.two.width / 2, - this.two.height / 2,
      this.two.width / 2, this.two.height / 2,
      new Two.Stop(0, colors[random_num]),
      new Two.Stop(1, colors[0]),
      new Two.Stop(1, colors[0])
    );

    // let rectangle = this.two.makeRectangle(this.s_w / 2, this.s_h / 2, this.s_w, this.s_h);
    // rectangle.noFill().stroke = linearGradient;
    // rectangle.linewidth = 50;



    let rect = this.two.makePolygon(this.two.width / 2, this.two.height / 2, 120, 3);
    rect.noStroke().fill = this.getRandomColor();

    this.two.update();


    this.two.bind('update', function (frameCount, timeDelta) {
      rect.rotation = frameCount / 180;
    });

    rect._renderer.elem.addEventListener("click", () => {
      console.log("click");
      rect.fill = this.getRandomColor();
    });

    rect._renderer.elem.addEventListener("mouseover", () => {
      colors = [
        this.getRandomColor(),
        'rgb(255, 128, 0)',
        this.getRandomColor(),
        'rgb(0, 191, 168)',
        'rgb(153, 102, 255)',
        'rgb(255, 244, 95)'
      ];
      linearGradient = this.two.makeLinearGradient(
        this.two.width / 2, - this.two.height / 2,
        this.two.width / 2, this.two.height / 2,
        new Two.Stop(0, colors[0]),
        new Two.Stop(1, colors[2]),
        new Two.Stop(1, colors[2])
      );
      rect.fill = linearGradient;

      this.two.bind('update', function (frameCount, timeDelta) {
        rect.rotation = frameCount / 20;
      });
    });

    rect._renderer.elem.addEventListener("mouseout", () => {
      this.two.bind('update', function (frameCount, timeDelta) {
        rect.rotation = frameCount / 100;
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
      rect.noStroke().fill = '#FF00E0';
      rect.rotation += rad;
      this.rects.push(rect);
    }
    this.group = this.two.makeGroup(this.rects);
    this.group.translation.set(this.s_w / 2, this.s_h / 2);

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
    this.group2.translation.set(this.s_w / 2, this.s_h / 2);


    this.BIGgroup = this.two.makeGroup(this.group, this.group2);
    this.BIGgroup.opacity = 0;
    this.BIGgroup.scale = 0;


    this.polygon = this.two.makePolygon(this.s_w * 3 / 4, this.s_h * 3 / 4, 100, 3);
    this.polygon.noStroke().fill = '#FF3080';
    this.polygon.rotation = 15;


    //上からやってくる円
    this.circle1 = this.two.makeCircle(this.s_w / 2, 0, 20);
    this.circle1.noStroke().fill = '#dfdf00';

    this.circle2 = this.two.makeCircle(this.s_w / 2, this.s_h, 20);
    this.circle2.noStroke().fill = '#00ffe0';


    this.animation();
    setTimeout(() => { this.move() }, 6000)
  }


  animation() {
    this.tween();

    createjs.Tween.get(this.BIGgroup)
      .wait(7000)
      .to({ opacity: 1, scale: 1 }, 300, createjs.Ease.elasticOut);


    this.two.play();
    this.two.update();
  }

  move() {
    let oldSeconds;
    let state = 0;
    let kaiten = Math.ceil(Math.random() * 4) * 2; //ランダムで決める回転数
    console.log("初期の回転数", kaiten / 2);

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

      this.group.rotation += (Math.PI * kaiten - this.group.rotation) * 0.03;
      // this.group.rotation += 0.01;
      // this.group2.rotation += (Math.PI * 2 - this.group2.rotation) * 0.023;
      this.group2.rotation += (Math.PI * kaiten / 2 - this.group2.rotation) * 0.03;

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
          console.log("回転数", kaiten / 2);
        } else if (this.group.rotation >= Math.PI * kaiten - 0.01 && state == 1) {
          this.group.rotation = 0;
          this.group2.rotation = 0;
          state = 0;
          console.log("回転数", kaiten / 2);
        }

        if (state == 0) {

          createjs.Tween.get(aaa.translation).to({ x: xx, y: yy }, 300);//個々の要素に対して
          createjs.Tween.get(this.group).to({ fill: '#ffe000' }, 10);//グループ全体に対して

          createjs.Tween.get(bbb.translation).to({ x: xxx, y: yyy }, 300);
          createjs.Tween.get(this.group2).to({ fill: 'darkturquoise' }, 10);

          createjs.Tween.get(aaa).to({ width: 30, height: 30, radius: 15 }, 100);
          createjs.Tween.get(bbb).to({ width: 20, height: 20, radius: 10 }, 100);

        } else if (state == 1) {
          createjs.Tween.get(aaa.translation).to({ x: xxx, y: yyy }, 300);
          createjs.Tween.get(this.group).to({ fill: '#ff00aa' }, 10);

          createjs.Tween.get(bbb.translation).to({ x: xx, y: yy }, 300);
          createjs.Tween.get(this.group2).to({ fill: '#00ffaa' }, 10);

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


    }).play();
    this.two.update();
  }

  tween() {
    createjs.Tween.get(this.circle1.translation)
      .wait(2000)
      .to({ y: this.s_h / 2 }, 1500, createjs.Ease.elasticOut)
      .wait(1000)
      .to({ x: this.s_w, y: this.s_h / 2 }, 1500, createjs.Ease.elasticOut)
      .wait(1000)
      .to({ x: this.s_w / 2 }, 1500, createjs.Ease.elasticOut)
      .wait(1000)
      .to({ x: this.s_w + 100, y: 200 }, 1500, createjs.Ease.elasticOut)
      .to({ x: this.s_w / 2, y: this.s_h / 2 }, 1500, createjs.Ease.elasticOut);//個々の要素に対して

    createjs.Tween.get(this.circle1)
      .wait(2000)
      .to({ fill: '#ffe000' }, 1000)
      .wait(2000)
      .to({ fill: '#e0ff00', scale: 7 }, 1500, createjs.Ease.elasticOut)
      .wait(2000)
      .to({ fill: '#00ff00', opacity: 0.5, scale: 1 }, 1500, createjs.Ease.elasticOut);


    createjs.Tween.get(this.circle2.translation)
      .wait(2000)
      .to({ y: this.s_h / 2 }, 1500, createjs.Ease.elasticOut)

      .wait(1000)
      .to({ x: 0, y: this.s_h / 2 }, 1500, createjs.Ease.elasticOut)
      .wait(1000)
      .to({ x: this.s_w / 2 }, 1500, createjs.Ease.elasticOut)
      .wait(1000)
      .to({ x: 0, y: 200 }, 1500, createjs.Ease.elasticOut)
      .wait(1000)
      .to({ x: this.s_w / 2, y: this.s_h / 2 }, 1500, createjs.Ease.elasticOut);

    createjs.Tween.get(this.circle2)
      .wait(2000)
      .to({ fill: '#a0f0ff' }, 1000)
      .wait(2000)
      .to({ fill: '#f0a00f', scale: 7 }, 1500, createjs.Ease.elasticOut)
      .wait(2000)
      .to({ fill: '#00aaff', opacity: 0.5, scale: 1 }, 1500, createjs.Ease.elasticOut);

  }


}


let main2 = new Main2();