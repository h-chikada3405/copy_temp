/* -------------------------------------------------------------------------------
  GSAP
-------------------------------------------------------------------------------- */

// 複数に一回だけクラスを与える
$(function() {
  document.querySelectorAll("クラスを与えたいコンテンツ").forEach((el, index) => {
    ScrollTrigger.create({
      trigger: el,
      id: index+1,
      start: 'top 80%', //クラスを与えるタイミング
      end: 'bottom top',
      toggleClass: {targets: el, className: "is-active"}, //与えるクラス
      once: true, //falseの場合何回も動作する
      // markers: true,
    });
  });
});

//複数の要素をパララックスさせる時の関数
$(function() {
  const y_from = ["","","",""]
  const y_to = ["","","",""]
  //第二引数関数
  function scroll_y_from(start) {
    return {y: y_from[start]}
  }
  //第三引数関数
  function scroll_y_to(end) {
    return {
      y: y_to[end],
      scrollTrigger: {
        trigger: '', //ターゲットにする要素
        start: 'top bottom',
        end: 'bottom top', 
        scrub: 0.8, //スクロールに合わせる
        // markers: true,
      }
    }
  }
  gsap.fromTo( '動かしたい要素', scroll_y_from(0),scroll_y_to(0));
  gsap.fromTo( '動かしたい要素', scroll_y_from(1),scroll_y_to(1));
  gsap.fromTo( '動かしたい要素', scroll_y_from(2),scroll_y_to(2));
  gsap.fromTo( '動かしたい要素', scroll_y_from(3),scroll_y_to(3));
});

//複数の要素を順番に表示
$(function() {
  gsap.set("順番に表示させたい要素", { y: 10, autoAlpha: 0, });
  ScrollTrigger.batch("順番に表示させたい要素", {
    batchMax: 4,
    onEnter: batch => gsap.to( batch, { y: 0, autoAlpha: 1, stagger: 0.15, }),
    onLeaveBack: batch => gsap.to( batch, { y: 10, autoAlpha: 0, stagger: 0.15, }),
    start: 'top 80%',
    end: 'bottom 25%',
  });
});

//左からフェード
$(function() {
  document.querySelectorAll("動かしたい要素").forEach((item) => {
    gsap.from(
      item,{
        x: -100,
        duration: 1,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: "play none none reverse",
        },
      },
    );
  });
});

//右からフェード
$(function() {
  document.querySelectorAll("動かしたい要素").forEach((item) => {
    gsap.from(
      item,{
        x: 100,
        duration: 1,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: "play none none reverse",
        },
      },
    );
  });
});

//一文字ずつ下から表示
$(function() {
  const text_ups = document.querySelectorAll('動かしたい要素');
  text_ups.forEach((text_up, i) => {
    gsap.fromTo(text_up, 
      {
        autoAlpha:0,
        y: '110%',
      },
      {
        autoAlpha:1,
        y: 0,
        duration: 1,
        delay: i * 0.03,
        scrollTrigger: {
          trigger: '',
          start: 'top center+=300',
          end: 'top center+=300',
          once: true,
          // markers: true,
        }
      },
    )
  }); 
});

//左から一つずつ表示
$(function() {
  const fade_lefts = document.querySelectorAll('動かしたい要素');
  fade_lefts.forEach((fade_left, i) => {
    gsap.fromTo(fade_left, 
      {
        autoAlpha:0,
        x: '-20%',
      },
      {
        autoAlpha:1,
        x: 0,
        duration: 0.7,
        delay: i * 0.3,
        scrollTrigger: {
          trigger: '',
          start: 'top center+=300',
          end: 'top center+=300',
          once: true,
          // markers: true,
        }
      },
    )
  }); 
});

//横スクロール
$(function() {
  const Wrapper = document.querySelector('囲ってる要素');
  const content = document.querySelector('動かしたい要素');
  gsap.to(content, {
    x: () => -(content.clientWidth - Wrapper.clientWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: '', //ターゲットにしたい要素
      start: 'top top', 
      end: () => `+=${content.clientWidth - Wrapper.clientWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
});

//オープニングアニメーション
$(function() {
  const miImg = document.querySelectorAll(""), //メインイメージ画像
        miLogo =  document.querySelectorAll(""), //メインイメージロゴ
        miTtl = document.querySelectorAll(""), //メインイメージタイトル
        miTxt = $("クラス名 span").each(function (index, element) {}), //メインイメージテキスト(spanなどで囲って繰り返し格納したい場合)
        header = document.querySelectorAll(".header"), //header
        tl = gsap.timeline(); //タイムライン
  //gsap set
  tl.set( 
    [miLogo, miImg, miTtl, miTxt, header, miBanner], { //配列の場合
      autoAlpha: 0,
    },
  );
  tl.set(
    miImg, { //変数の場合
      autoAlpha: 0,
    },
  );
  //動きスタート
  tl.to(
    miLogo, {
      autoAlpha: 1,
      duration: 2,
      ease: "power4.inOut"
    },
  ).to(
    miImg, {
      autoAlpha: 1,
      duration: 2,
      scale: 1,
      ease: "power4.inOut"
    }, ""
  ).to(
    miTtl, {
      autoAlpha: 1,
      duration: 2,
      ease: "power4.inOut",
    }, ""
  ).to(
    miTxt, {
    autoAlpha: 1,
      stagger: { //一つづつ処理する
        amount: 1,
        from: "start",
        ease: "sine.in"
      }
    }, ""
  ).to(
    miLogo, {
      onComplete: function() {
        $(miLogo).addClass(''); //クラスを与える場合
      }
    }, ""
  ).to(
    header, {
      autoAlpha: 1,
      ease: "sine.in",
    }, ""
  )
});

//一回しか動作させない
$(function() {
  var splash_text = $.cookie('accessdate'); //キーが入っていれば年月日を取得
  var myD = new Date();//日付データを取得
  var myYear = String(myD.getFullYear());//年
  var myMonth = String(myD.getMonth() + 1);//月
  var myDate = String(myD.getDate());//日

  if (splash_text != myYear + myMonth + myDate) { //cookieデータとアクセスした日付を比較↓
    $.cookie('accessdate', myYear + myMonth + myDate); //accessdateキーで年月日を記録
  } else { //二回目以降ローディングアニメーション
  }  
});

//スクロールトリガーとタイムラインの組み合わせ
$(function() {
  const content = document.querySelectorAll("動作させたい要素"),
        tl = gsap.timeline();

  //PCの時
  tl.set( 
    [content, ],{ //配列の場合
      scaleY: 0,
    },
  );
  //タイムライン変数  
  const tlAnime = tl.to(
                    content, {
                      scaleY: 1,
                    },
                  );

  ScrollTrigger.create({
    animation: tlAnime, //タイムラインの変数名
    trigger: "", //トリガーにする要素
    start: "top 80%",
    end: "bottom top",
    // markers: true,
  });
});
