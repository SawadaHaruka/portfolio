class Top_page {
  constructor() {

    document.addEventListener("DOMContentLoaded", this.init(), false);
  }

  init() {
    this.video();
    this.two_top();
    this.two_anime();
  }
  video() {//動画の処理
    let video = document.querySelector('#video');
    video.addEventListener("ended", () => {
      video.pause();//最終フレームで停止
      setTimeout(() => {
        video.load();//初めから再開
      }, 4000);
    })
  }
  gradation_color() {
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

    this.random_num = Math.ceil(Math.random() * 5);
    console.log(this.random_num);
    let linearGradient = this.two.makeLinearGradient(
      this.s_w / 2, - this.s_h / 2, this.s_w / 2, this.s_h / 2,
      new Two.Stop(0, colors[0]),
      new Two.Stop(1, colors[this.random_num]),
      new Two.Stop(1, colors[0])
    );

    return linearGradient;
  }

  //フレームのパート
  two_top() {
    window.addEventListener("DOMContentLoaded", () => {
      if (this.random_num == 2 || this.random_num == 5) {
        let scroll_text = document.querySelector('#scrolldown');
        scroll_text.style.color = 'rgb(0, 0, 0)';
        let scroll_line = document.querySelector('.scrolldown');
        scroll_line.classList.toggle('scroll_');
      }
    }, false);

    this.two = new Two({
      width: window.innerWidth, height: window.innerHeight,
      autostart: true
    }).appendTo(document.getElementById("svgStage_top"));

    this.s_w = this.two.width;
    this.s_h = this.two.height;

    let top_frame = () => {
      let frame = this.two.makeRectangle(this.s_w / 2, this.s_h / 2, this.s_w, this.s_h);
      frame.noFill().stroke = this.gradation_color();
      frame.linewidth = 150;

      this.two.update();
      //ウィンドウのリサイズによって変える
      window.addEventListener("resize", () => {
        this.s_w = this.two.width = window.innerWidth;
        this.s_h = this.two.height = window.innerHeight;

        frame.translation.set(this.s_w / 2, this.s_h / 2);
        frame.width = this.s_w;
        frame.height = this.s_h;
      }, false);
    }
    top_frame();
  }

  random_color() {
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
    let linearGradient = colors[random_num];

    return linearGradient;
  }
  //コメントのパート
  two_anime() {
    let two_stage = new Two({
      width: window.innerWidth, height: window.innerHeight,
      autostart: true
    }).appendTo(document.getElementById("svgStage_anime"));


    let element_anime = () => {
      let tri = two_stage.makePolygon(this.s_w / 5, this.s_h * 2 / 3, 120, 3);
      tri.noStroke().fill = this.random_color();

      two_stage.update();
      two_stage.bind('update', function (frameCount, timeDelta) {
        tri.rotation = frameCount / 130;
      });

      tri._renderer.elem.addEventListener("click", () => {
        tri.fill = this.random_color();
      });
      tri._renderer.elem.addEventListener("mouseover", () => {
        two_stage.bind('update', function (frameCount, timeDelta) {
          tri.rotation = frameCount / 20;
        });
      });
      tri._renderer.elem.addEventListener("mouseout", () => {
        two_stage.bind('update', function (frameCount, timeDelta) {
          tri.rotation = frameCount / 100;
        });
      });

      let rects = [];
      for (let i = 0; i < 12; i++) {
        let degree = i * 360 / 12; //360/要素の数
        let rad = degree * Math.PI / 180;
        let r = 1;
        let x = Math.cos(rad) * r;
        let y = Math.sin(rad) * r;
        let rect = two_stage.makeRoundedRectangle(x + this.s_w / 2, y + this.s_h / 2, 30, 30, 2);
        rect.noStroke().fill = 'rgb(0, 225, 255)';
        rect.rotation += rad;
        rects.push(rect);
      }
      let group = two_stage.makeGroup(rects);
      group.translation.set(this.s_w * 3 / 4, this.s_h / 3);

      let rects2 = [];
      for (let j = 0; j < 12; j++) {
        let degree2 = j * 360 / 12;
        let rad2 = degree2 * Math.PI / 180;
        let r2 = 1;//親の半径
        let x2 = Math.cos(rad2) * r2;
        let y2 = Math.sin(rad2) * r2;

        let rect2 = two_stage.makeRoundedRectangle(x2 + this.s_w / 2, y2 + this.s_h / 2, 80, 10, 2);
        rect2.noStroke().fill = 'rgb(0, 225, 255)';
        rect2.rotation += rad2;
        rects2.push(rect2);
      }
      let group2 = two_stage.makeGroup(rects2);
      group2.translation.set(this.s_w * 3 / 4, this.s_h * 2 / 5);

      this.BIGgroup = two_stage.makeGroup(group, group2);
      this.BIGgroup.opacity = 0;
      createjs.Tween.get(this.BIGgroup)
        .wait(300).to({ opacity: 1 }, 300, createjs.Ease.elasticOut);

      let move = () => {
        let oldSeconds;
        let state = 0;
        let kaiten = Math.ceil(Math.random() * 4); //ランダムで決める回転数

        //-----------------------------------------------------
        two_stage.bind('update', () => {
          let time = new Date();
          let sec = time.getSeconds();
          let update = false;//updateするべきかどうか

          if (sec != oldSeconds) {
            oldSeconds = sec;
            update = true;
          }

          // group.rotation += (Math.PI * kaiten - group.rotation) * 0.02;
          group.rotation += 0.02;

          group2.rotation += 0.03;
          // group2.rotation += (Math.PI * 2 - group2.rotation) * 0.023;
          // group2.rotation += (Math.PI * kaiten / 2 - group2.rotation) * 0.03;

          //個々の要素を動かす
          for (let h = 0; h < 12; h++) {
            let aaa = rects[h];
            let bbb = rects2[h];

            let deg = h * 360 / 12; //360/要素の数
            let radd = deg * Math.PI / 180;

            let rr = 200;
            let xx = Math.cos(radd) * rr;
            let yy = Math.sin(radd) * rr;

            let rrr = 100;
            let xxx = Math.cos(radd) * rrr;
            let yyy = Math.sin(radd) * rrr;


            //マル回回る　かつ　ステートが０だったら
            if (group.rotation >= Math.PI * kaiten - 0.01 && state == 0) {
              //回転　＞＝　円周率　＊　４（180度＊４＝２回転）
              // if (group.rotation >= Math.PI * 2  && this.state==0) {
              group.rotation = 0;
              group2.rotation = 0;
              state = 1;
            } else if (group.rotation >= Math.PI * kaiten - 0.01 && state == 1) {
              group.rotation = 0;
              group2.rotation = 0;
              state = 0;
            }

            if (state == 0) {
              createjs.Tween.get(aaa.translation).to({ x: xx, y: yy }, 200);//個々の要素に対して
              createjs.Tween.get(group2).to({ fill: 'rgb(153, 102, 255)' }, 10);//グループ全体に対して

              createjs.Tween.get(bbb.translation).to({ x: xxx, y: yyy }, 200);
              createjs.Tween.get(group).to({ fill: 'rgb(0, 225, 255)' }, 10);

              createjs.Tween.get(aaa).to({ width: 30, height: 30, radius: 15 }, 100);
              createjs.Tween.get(bbb).to({ width: 20, height: 20, radius: 10 }, 100);

            } else if (state == 1) {
              createjs.Tween.get(aaa.translation).to({ x: xxx, y: yyy }, 200);
              createjs.Tween.get(group2).to({ fill: 'rgb(246, 255, 0)' }, 10);

              createjs.Tween.get(bbb.translation).to({ x: xx, y: yy }, 200);
              createjs.Tween.get(group).to({ fill: '#92eadf' }, 10);

              createjs.Tween.get(aaa).to({ width: 20, height: 20, radius: 2 }, 100);
              createjs.Tween.get(bbb).to({ width: 30, height: 30, radius: 2 }, 100);
            }

          }
        });
        two_stage.update();

      }
      move();

      /*
      ウィンドウのリサイズによって変える
      */
      window.addEventListener("resize", () => {
        group.translation.set(this.s_w * 3 / 4, this.s_h / 3);
        group2.translation.set(this.s_w * 3 / 4, this.s_h * 2 / 5);

        tri.translation.set(this.s_w / 5, this.s_h * 2 / 3);
      }, false);
    }


    element_anime();
  }


}
const top_page = new Top_page();