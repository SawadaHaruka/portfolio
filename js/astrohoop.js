// YouTube APIの読み込み
//2.このコードは、IFrame Player APIコードを非同期に読み込むそうです。
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//iframe player APIコードを非同期で読み込みます。
//3.この関数は、APIコードのダウンロード後、iframe（およびYouTubeプレーヤー）を作成するそうです。
let player;
function onYouTubeIframeAPIReady () {
  //動画を埋め込む場所を指定(1.のidを入れる)
  player = new YT.Player('youtube', {
    videoId: 'Efy-Va2huBw', //YouTUbeの動画IDを入れる
    //オプションを設定する場所
    playerVars: {
      playsinline: 1,
      loop: 1,
      listType: 'playlist',
      playlist: 'Efy-Va2huBw', //上と同じ動画ID_リピートするには入力必須
      rel: 0, // 関連動画の非表示
      controls: 0, // 動画プレーヤーのコントロール非表示
    },

    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

//プレーヤの準備完了後に呼び出す関数
function onPlayerReady(event) {
  event.target.mute(); //ミュートにしないとスマホで再生されない
  event.target.playVideo(); //ビデオを再生
}
let done = false;

//5.プレーヤーの状態が変化すると、APIはこの関数を呼び出すそうです。
//  プレイヤーの終了のタイミングで再度、動画再生をしています。
function onPlayerStateChange(event) {
  let ytStatus = event.target.getPlayerState();
  if (ytStatus == YT.PlayerState.ENDED) {
    event.target.mute(); //ミュートにしないとスマホで再生されない
    event.target.playVideo(); //ビデオを再生
  }
}