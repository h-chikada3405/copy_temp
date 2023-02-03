/***********************************************************************
* 本体
***********************************************************************/
function modalImage(selector) {

  const modalSelector = document.querySelectorAll(selector)

  modalSelector.forEach((element) => {
    // 対象の要素の href 属性を削除
    element.dataset.href = element.getAttribute("href")
    element.removeAttribute("href")
    element.addEventListener("click", (event) => {
      // command or control+クリックのときは処理しない
      if ((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey)) return;
      event.preventDefault(); //cancel navigate
      event.stopPropagation(); //menuなどに伝搬されて挙動が変わる場合があるので防止
      const url = element.dataset.href
      if ( url !== "" ) {
        modalWrapper(element);
      }
    }, false);
  });

}


/***********************************************************************
* modal の wrapper 部分
***********************************************************************/
function modalWrapper(element) {
  const body = document.querySelector("body")
  const flagClass = 'is-modal'

  let createElement = '<div class="modal-wrapper">'
  createElement += '<div class="modal-overlay"></div>'
  createElement += '<button class="modal-close"></button>'
  createElement += '</div>'

  // body に要素を挿入する
  body.insertAdjacentHTML('beforebegin', createElement);

  const modalWrapper = document.querySelector('.modal-wrapper')
  const modalOverlay = document.querySelector('.modal-overlay')
  const modalClose = document.querySelector('.modal-close')
  const time = 0.3

  // 表示アニメーション
  gsap.from(modalWrapper, {
    autoAlpha: 0,
    duration: time, // アニメーションの時間
  })
  body.classList.add(flagClass)

  // 閉じるボタン
  modalClose.addEventListener("click", wrapperClose)
  modalOverlay.addEventListener("click", wrapperClose)

  // modal の画像部分を呼び出す
  modal(element)

  function wrapperClose() {
    const tl = gsap.timeline()
    tl.to(modalWrapper, {
      autoAlpha: 0,
      duration: time, // アニメーションの時間
    },"<")
    body.classList.remove(flagClass)
    setTimeout(() => {
      modalWrapper.remove()
    }, time * 1000);
  }

  //spの時bodyのクラスが外れない現象解消
  $(document).on('touchend', '.modal-img', function() {
    body.classList.remove(flagClass)
  });
}


/***********************************************************************
* modal の画像部分
***********************************************************************/
function modal(element, direction = null) {

  const wrapper = document.querySelector('.modal-wrapper')
  let inner = document.querySelector('.modal-inner')
  const gallery = element.dataset.gallery
  const href = element.dataset.href
  const time = 0.35

  let galleryItems = null
  let element_alt = ""
  let itemId = 0
  let prevButton = ""
  let nextButton = ""
  let galleryArea = ""
  let prev = null
  let next = null

  let createElement = '<div class="modal-inner">'


  if( element.children[0] ) {
    element_alt = element.children[0].alt
  }

  // gallery 時の処理
  if( gallery ) {
    galleryItems = document.querySelectorAll(`[data-gallery="${gallery}"]`)
    galleryItems.forEach((item, index) => {
      if( item == element ) {
        itemId = index
      }
    })

    if( itemId !== 0 ) {
      prevButton = `<button class="modal-prev"></button>`
    }
    if( itemId !== galleryItems.length - 1 ) {
      nextButton = `<button class="modal-next"></button>`
    }
    galleryArea = `<p class="modal-gallery"><span class="modal-btns">${prevButton}<span class="modal-count">${itemId + 1}/${galleryItems.length}</span>${nextButton}</span></p>`
  }
  createElement += '<div class="modal-item">'
  if( href.indexOf('.pdf') !== -1 || href.indexOf('youtube.com') !== -1) {
    createElement += `<iframe class="modal-iframe" width="200" height="200" src="${href}" ></iframe>`
  } else if(  href.indexOf('.mp4') !== -1  ) {
    createElement += `<video class="modal-iframe" src="${href}" poster="" loop="" autoplay="" muted="" playsinline="" ></video>`
  } else {
    createElement += `<img class="modal-img" width="200" height="200" src="${href}" alt="${element_alt}">`
  }
  createElement += '</div>'
  createElement += galleryArea
  createElement += '</div>'

  if( inner !== null ) {
    // 直前の要素を削除
    inner.remove()
  }

  // .modal-wrapper に要素を挿入する
  wrapper.insertAdjacentHTML('beforeend', createElement);
  inner = document.querySelector('.modal-inner')

  const img = document.querySelector('.modal-img')

  if( img ) {
    // 縦長の画像の処理
    if( img.clientHeight > window.innerHeight && img.clientHeight > img.clientWidth ) {
      img.style.cssText = "height: 80vh; width: auto;"
    }
  }

  // 遷移時のアニメーション初期値
  let gsap_option = {
    autoAlpha: 0,
    duration: time,
  }

  if( direction == "prev" ) {
    gsap_option.x = -30
  }

  if( direction == "next" ) {
    gsap_option.x = 30
  }

  gsap.from(inner, gsap_option)

  if( gallery ) {

    prev = document.querySelector('.modal-prev')
    next = document.querySelector('.modal-next')

    // prev ボタンの処理
    if( prev !== null ) {
      prev.addEventListener("click", (event) => {
        if( event !== null ) {
          event.preventDefault();
        }
        modal(galleryItems[itemId - 1], "prev")
      })
    }

    // next ボタンの処理
    if( next !== null ) {
      next.addEventListener("click", (event) => {
        if( event !== null ) {
          event.preventDefault();
        }
        modal(galleryItems[itemId + 1], "next")
      })
    }

  }

  let start = {x: null, y:null};
  let end = {x: null, y:null};

  if( img ) {
    // スワイプ／フリック
    img.addEventListener('touchmove', logSwipe);

    // タッチ開始
    img.addEventListener('touchstart', logSwipeStart);

    // タッチ終了
    img.addEventListener('touchend', logSwipeEnd);
  }

  function logSwipeStart(event) {
    event.preventDefault();
    start.x = event.touches[0].pageX;
    start.y = event.touches[0].pageY;
  }

  function logSwipe(event) {
    event.preventDefault();
    end.x = event.touches[0].pageX;
    end.y = event.touches[0].pageY;
  }

  function logSwipeEnd(event) {
    event.preventDefault();

    // 上下スワイプで modal 削除
    if( 100 < Math.abs( end.y - start.y ) ) {

      gsap.to(wrapper, {
        autoAlpha: 0,
        duration: time
      })
      setTimeout(() => {
        wrapper.remove()
      }, time * 1000);

    } else {

      if( gallery ) {
        // 左右のスワイプで画像切り替え
        if( 50 < (end.x - start.x) ) {
          if( prev !== null ) {
            modal(galleryItems[itemId - 1], "prev")
          }
        } else if( -50 > (end.x - start.x) ) {
          if( next !== null ) {
            modal(galleryItems[itemId + 1], "next")
          }
        }
      }
    }

  }

}