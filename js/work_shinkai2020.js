export class Shinkai {
  constructor() {
    window.addEventListener("load", this.initCjs());
    this.set();
    let rellax = new Rellax('.shinkai_move');
  }

  // * createJS を初期化
  initCjs() {
    //キャンバスとステージを設定
    let canvas = document.getElementById("cjsCanvas");
    this.stage = new createjs.Stage(canvas);
    window.addEventListener("resize", (evt) => {
      this.onResize(evt);
    });
    this.onResize();

    this.stage.enableMouseOver();
    if (createjs.Touch.isSupported() == true) {
      // タッチ操作を有効にします。
      createjs.Touch.enable(this.stage)
    }

    // Ticker を設定
    createjs.Ticker.framerate = 24;
    createjs.Ticker.addEventListener("tick", this.stage);
    createjs.Ticker.addEventListener("tick", () => { this.loop() });

  }

  /**
   *
   * 画面サイズ変更
   * @param {*} evt
   *
   */
  onResize(evt = null) {
    let canvas = document.getElementById("cjsCanvas");
    // console.log(window.innerWidth);
    // 画面幅・高さを取得=>Canvas要素の大きさを画面幅・高さに合わせる
    this.stage.canvas.width = window.innerWidth;
    this.stage.canvas.height = window.innerHeight;

    this.cv_w = canvas.width;
    this.cv_h = canvas.height;

    this.stage.update();
  }

  set() {
    // bubble発生
    let bubbles = [];
    this.emitBubbles = () => {
      //bubble
      for (let b = 0; b < 1; b++) {
        let bubble = new createjs.Shape();
        bubble.graphics.beginStroke("#fff")
        bubble.graphics.drawCircle(0, 0, 7 * Math.random());
        // パーティクルの発生場所
        bubble.x = Math.random() * this.cv_w;
        bubble.y = 700 - Math.random() * 100;
        bubble.alpha = 0;
        // 速度
        bubble.vx = -2 * (Math.random() - 0.5);
        bubble.vy = -2 * (Math.random() - 0.5);

        this.stage.addChild(bubble);
        bubbles.push(bubble);
        createjs.Tween.get(bubble).to({ alpha: Math.random() + 0.1 }, Math.min(800, Math.random() * 1200));

      }
    }

    // bubble更新
    this.updateBubbles = () => {
      for (let b = 0; b < bubbles.length; b++) {
        // オブジェクトの作成
        let bubble = bubbles[b];
        // 摩擦
        bubble.vx *= 1.005;
        bubble.vy -= 0.05;
        // 速度を位置に適用
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        bubble.life -= 1;// 寿命を減らす
        // 寿命の判定
        if (bubble.y <= 1) {
          this.stage.removeChild(bubble)// ステージから削除
          bubbles.splice(b, 1);// 配列からも削除
        }
      }
    }

  }

  loop() {
    this.updateBubbles();
    let emit = Math.floor(Math.random() * 4);
    if (emit == 0) {
      this.emitBubbles();//少なめに発生させる
    } 
  }

}
const shinkai = new Shinkai();