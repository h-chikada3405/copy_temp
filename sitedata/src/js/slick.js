/* -------------------------------------------------------------------------------
  slick
-------------------------------------------------------------------------------- */

//slider テンプレート
$(function() {
  $('スライダーを囲ってる要素').each(function(index, element) {
    const Slid = $(this).find("スライダー"),
          windowSize =  $(window).width();
    if (windowSize > 768) {
      //pcの時
      if (Slid.length >= 4) { //中身が4以上の時slickが効くように
        $(this).slick({
          autoplay: true,
          peed: 10000,
          arrows: true, //ボタンつけるかどうか
          prevArrow: '<button class="slide-arrow slick-prev"></button>', //戻るボタン中身
          nextArrow: '<button class="slide-arrow slick-next"></button>', //次へボタン中身
          slidesToShow: 3, //いくつ表示させるか
          centerPadding: '7.5%', //どのくらい間隔をとるか
          centerMode: true,
        })
      } else {
        $(this).addClass("no-slick");
      }
    } else {
      //spの時
      if (Slid.length >= 2) { //中身が2以上の時slickが効くように
        $(this).slick({
          autoplay: true,
          peed: 10000,
          arrows: false, //ボタン無しの場合
          slidesToShow: 1,
          centerPadding: '8%',
          centerMode: true,
        })
      } else {
        $(this).addClass("no-slick");
      }
    }
  })
});