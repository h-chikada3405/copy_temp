function page_loading() {

  /***********************************************************************
  * 変数定義
  ***********************************************************************/
  const wrapper = document.querySelector(".loading_wrapper");
  const mask = document.querySelector(".loading_mask");
  const pageName = document.querySelector("body").dataset.page
  const linkEls = [
    ...document.querySelectorAll('a:not([href*="#"]):not([href*="tel:"]):not([target])'),
  ];

  const currentHostName = window.location.hostname;
  const enterTime = 1.5 // ページ読み込み時のアニメーションの時間　単位：秒
  const leaveTime = 1 // ページ離脱時のアニメーション　単位：秒


  /*
  <<< gsap.timeline() の使い方（簡易版） >>>

  【効果】
  対象の要素の css プロパティを、
  特定の状態から特定の状態に遷移させる。

  ※つなげることで、状態を順番に遷移させていくことも可能。（ここでは説明しません）

  【使い方】

    ① set（プロパティの初期値を設定）

      例）opacity の初期値を 1 にする。

          tl.set(wrapper, {
            autoAlpha: 1,
          },'<')

          ※ set 使用は任意です。
            set を使用しない場合は、css で設定した値が初期値になります。

    ② to（プロパティを初期値から設定値へ変化させる）

      例）1 秒かけて opacity を 0 から 1 にする。

          tl.set(wrapper, {
            autoAlpha: 0,
          },'<')

          tl.to( 対象の要素, {
            autoAlpha: 1,
            duration: 1, // アニメーションにかける秒数
          },'<')

    ③ from（プロパティを設定値から初期値へ変化させる）

      例）1 秒かけて opacity を 0 から 1 にする。

          tl.set(wrapper, {
            autoAlpha: 1,
          },'<')

          tl.from( 対象の要素, {
            autoAlpha: 0,
            duration: 1, // アニメーションにかける秒数
          },'<')

  【よく使うプロパティ】

    tl.to( 対象の要素, {
      autoAlpha: 1, // opacity
      x: 0, // translateX
      y: 0, // translateY
      scale: 0,
      rotation: 0,
      skew: 0,
      transformOrigin: "center center"

      duration: 1, // アニメーションにかける秒数
      delay: 0,
      ease: power1.out // あらかじめ決められた設定値があるので、こだわりたい方は調べてみてください
    },'<')

    ※他にも css プロパティはほとんどそのまま設定できます。
      margin, padding, width, height, 等々。
      ハイフン区切りのものは、ローワーキャメルケースに書き換えてください。

      例）font-size →　fontSize

  */


  /***********************************************************************
  * ページ読み込み時のアニメーション
  ***********************************************************************/
  const tl = gsap.timeline();

   // index ページとその他のページで処理を分けてますが、不要なら統合してください。
  if( pageName == "index" ) {

    /* mask */
    tl.set(mask, {
      autoAlpha: 0,
    },'<')

    /* wrapper */
    tl.set(wrapper, {
      autoAlpha: 1,
    },'<')

  } else {

    // nav 等の class 処理（任意　※不要であれば削除）
    // document.querySelector('.nav').classList.remove('is-active')
    // document.querySelector('.btn_nav').classList.remove('is-active')

    // アニメーションの初期値を設定（任意　※不要であれば削除）

    /* mask */
    tl.set(mask, {
      autoAlpha: 1,
    },'<')

    /* wrapper */
    // tl.set(wrapper, {
    //   autoAlpha: 0,
    // },'<')

    // アニメーションの内容を記述（必須）

    /* mask */
    const delay = enterTime / 3
    tl.to(mask, {
      autoAlpha: 0,
      duration: enterTime - delay,
    },`+=${delay}`)

    /* wrapper */
    // tl.to(wrapper, {
    //   autoAlpha: 1,
    //   duration: enterTime,
    // },'<')

  }

  /***********************************************************************
   * ページ離脱時のアニメーション
   ***********************************************************************/
  function loadingAnimation(url) {
    const tl = gsap.timeline();

    // アニメーションの初期値を設定（任意　※不要であれば削除）

    /* mask */
    tl.set(mask, {
      autoAlpha: 0,
    },'<')

    /* wrapper */
    tl.set(wrapper, {
      autoAlpha: 1,
    },'<')

    // アニメーションの内容を記述（必須）

    /* mask */
    tl.to(mask, {
      autoAlpha: 1,
      duration: leaveTime,
    },'<')

    /* wrapper */
    tl.to(wrapper, {
      autoAlpha: 0,
      duration: leaveTime,
    },'<')

    // ページ遷移処理
    setTimeout(() => {
      window.location = url;
    }, leaveTime * 1000);
  }


  /***********************************************************************
  * リンク click 時の処理
  ***********************************************************************/
  // setTimeoutのdelayはbaseのwrapper::afterのtransitionと合わせる
  linkEls.forEach((linkEl) => {
    linkEl.addEventListener("click", (e) => {
      // command or control+クリックのときは処理しない
      if ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) return;

      e.preventDefault(); //cancel navigate
      e.stopPropagation(); //menuなどに伝搬されて挙動が変わる場合があるので防止
      let url = linkEl.getAttribute("href");
      if( url === null ) return
      if ( url !== "" && url.indexOf(currentHostName) ) {
        loadingAnimation(url);
      }
    }, false);
  });


  // SafariでブラウザバックするとJSなどが解除されていない問題【bfcache】の対策
  // 強制リロード
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      // bfcache発動時の処理
      window.location.reload();
    }
  });
}