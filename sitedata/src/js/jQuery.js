/* -------------------------------------------------------------------------------
  jQuery
-------------------------------------------------------------------------------- */

//ハンバーガーメニュー
$(function() {
  $(".hd-hb_wrap").on("click", function() {
    $(this).toggleClass("is-active");
    $(".hd-nav").toggleClass("is-active");
  });
});

//スムーススクロール
$(function() {
  $('a[href^="#"]').click(function(){
    const speed = 700;
          href= $(this).attr("href"),
          target = $(href == "#" || href == "" ? 'html' : href),
          headerHeight = $(".header").outerHeight(),
          position = target.offset().top - headerHeight,
          urlHash = location.hash,
          windowSize =  $(window).width();
  if (windowSize > 768) {
    $("html, body").animate({scrollTop:position + headerHeight}, speed, "swing");
  } else {
    $("html, body").animate({scrollTop:position}, speed, "swing");
  }
    return false;
  });
});

//ページ外からのアンカーリンク
$(function () {
  const headerHeight = $(".header").outerHeight(),
        urlHash = location.hash,
        windowSize =  $(window).width();
  if (windowSize > 768) {
    if (urlHash) {
      $("body,html").stop().scrollTop(0);
      setTimeout(function () {
          const target = $(urlHash),
                position = target.offset().top - headerHeight - 0;
          $("body,html").stop().animate({ scrollTop: position }, 700);
      }, 200);
    }
  } else {
    if (urlHash) {
      $("body,html").stop().scrollTop(0);
      setTimeout(function () {
          const target = $(urlHash),
                position = target.offset().top - headerHeight - 0;
          $("body,html").stop().animate({ scrollTop: position }, 700);
      }, 200);
    }
  }
});

//スマートフォンで全画面表示
$(function() {
  $(document).ready(function () {
    const hSize = $(window).height();
    $("高さを附与したい要素").height(hSize); // アドレスバーを除いたサイズを付与
  });
  $(window).resize(function () { // ページをリサイズした時の処理
    const hSize = $(window).height();
    $("高さを附与したい要素").height(hSize); // アドレスバーを除いたサイズを付与
  });
});

//ページトップボタン
$(function () {
  $('.page-top').click(function () {
      $('body, html').animate({ scrollTop: 0 }, 500); 
      return false;
  });
});