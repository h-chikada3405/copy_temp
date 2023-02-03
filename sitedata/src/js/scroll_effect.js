gsap.registerPlugin(ScrollTrigger);

/*
  ※最下部にカスタマイズ用サンプルあります。
  　自由に編集してください。
*/

/***********************************************************************
* SCROLL EFFECT
***********************************************************************/
function scroll_effect() {

  gsap.utils.toArray('[data-scroll_effect]').forEach( (item, index) => {
    const dataItems = item.dataset.scroll_effect.split(' ')

    /* 各オプションの取得条件設定 */
    const findFade = (element) => element.search(/fade-(.*)/g) != -1
    const findSlide = (element) => element.search(/slide-(.*)/g) != -1
    const findScale = (element) => element.search(/scale-(.*)/g) != -1
    const findRotate = (element) => element.search(/rotate-(.*)/g) != -1
    const findSkew = (element) => element.search(/skew-(.*)/g) != -1
    const findTime = (element) => element.search(/time-(.*)/g) != -1
    const findEasing = (element) => element.search(/easing-(.*)/g) != -1
    const findTransformOrigin = (element) => element.search(/origin-(.*)/g) != -1
    const findStart = (element) => element.search(/start-(.*)/g) != -1
    const findClass = (element) => element.search(/class-(.*)/g) != -1

    /* 各オプションのキーを取得 */
    const fadeKey = dataItems.findIndex(findFade)
    const slideKey = dataItems.findIndex(findSlide)
    const scaleKey = dataItems.findIndex(findScale)
    const rotateKey = dataItems.findIndex(findRotate)
    const skewKey = dataItems.findIndex(findSkew)
    const timeKey = dataItems.findIndex(findTime)
    const easingKey = dataItems.findIndex(findEasing)
    const transformOriginKey = dataItems.findIndex(findTransformOrigin)
    const onceKey = dataItems.indexOf('once')
    const markerKey = dataItems.indexOf('marker')
    const startKey = dataItems.findIndex(findStart)
    const classKey = dataItems.findIndex(findClass)

    /* 各オプションを初期化 */
    let fadeOption = null
    let slideOption = null
    let rotateOption = null
    let skewOption = null
    let classOption = null
    let options = {
      x: 0,
      y: 0,
      duration: 0.5, // アニメーションの時間

      scrollTrigger: {
        trigger: item,
        start: 'top 80%', // アニメーションの開始位置
        toggleActions: 'play none none reverse', // アニメーションの発火設定
        once: false, // アニメーションを一度きりにする
        onEnter: ({progress, direction, isActive}) => { // アニメーションの開始時に処理を追加
          if( classOption ) item.classList.add(`is-${classOption}`)
        },
        onLeaveBack: ({progress, direction, isActive}) => { // アニメーションの開始位置に戻った時に処理を追加
          if( classOption ) item.classList.remove(`is-${classOption}`)
        }
      }
    }

    /* fade 設定 */
    if ( fadeKey > -1 ) {
      fadeOption = dataItems[fadeKey].replace('fade-', '').split(':')
      options.autoAlpha = 0

      if( fadeOption.indexOf("stay") == -1 ) {
        fadeOption.forEach((opt) => {
          const fade_opt = opt.split('=')

          /* up 設定 */
          if( fade_opt[0] == "up" ) {
            if( fade_opt[1] ) {
              options.y = fade_opt[1]
            } else {
              options.y = 100
            }
          }

          /* down 設定 */
          if( fade_opt[0] == "down" ) {
            if( fade_opt[1] ) {
              options.y = fade_opt[1] * -1
            } else {
              options.y = -100
            }
          }

          /* right 設定 */
          if( fade_opt[0] == "right" ) {
            if( fade_opt[1] ) {
              options.x = fade_opt[1]
            } else {
              options.x = 100
            }
          }

          /* left 設定 */
          if( fade_opt[0] == "left" ) {
            if( fade_opt[1] ) {
              options.x = fade_opt[1] * -1
            } else {
              options.x = -100
            }
          }

        })
      }
    }

    /* slide 設定 */
    if ( slideKey > -1 ) {
      slideOption = dataItems[slideKey].replace('slide-', '').split(':')
      slideOption.forEach((opt) => {
        const slide_opt = opt.split('=')

        /* up 設定 */
        if( slide_opt[0] == "up" ) {
          if( slide_opt[1] ) {
            options.y = slide_opt[1]
          } else {
            options.y = window.innerHeight
          }
        }

        /* down 設定 */
        if( slide_opt[0] == "down" ) {
          if( slide_opt[1] ) {
            options.y = slide_opt[1] * -1
          } else {
            options.y = -window.innerHeight
          }
        }

        /* right 設定 */
        if( slide_opt[0] == "right" ) {
          if( slide_opt[1] ) {
            options.x = slide_opt[1]
          } else {
            options.x = window.innerWidth
          }
        }

        /* left 設定 */
        if( slide_opt[0] == "left" ) {
          if( slide_opt[1] ) {
            options.x = slide_opt[1] * -1
          } else {
            options.x = -window.innerHeight
          }
        }

      })
    }

    /* rotation 設定 */
    if( rotateKey > -1 ) {
      rotateOption = dataItems[rotateKey].replace('rotate-', '').split(':')
      rotateOption.forEach((opt) => {
        const rotate_opt = opt.split('=')

        /* x 軸回転 */
        if( rotate_opt[0] == "x" ) {
          if( rotate_opt[1] ) {
            options.rotationX = rotate_opt[1]
          } else {
            options.rotationX = 360
          }
        }

        /* y 軸回転 */
        if( rotate_opt[0] == "y" ) {
          if( rotate_opt[1] ) {
            options.rotationY = rotate_opt[1]
          } else {
            options.rotationY = 360
          }
        }

        /* z 軸回転 */
        if( rotate_opt[0] == "z" ) {
          if( rotate_opt[1] ) {
            options.rotation = rotate_opt[1]
          } else {
            options.rotation = 360
          }
        }
      })

    }

    /* skew 設定 */
    if( skewKey > -1 ) {
      skewOption = dataItems[skewKey].replace('skew-', '').split(':')
      skewOption.forEach((opt) => {
        const skew_opt = opt.split('=')

        /* x 軸 */
        if( skew_opt[0] == "x" ) {
          if( skew_opt[1] ) {
            options.skewX = skew_opt[1]
          } else {
            options.skewX = 45
          }
        }

        /* y 軸 */
        if( skew_opt[0] == "y" ) {
          if( skew_opt[1] ) {
            options.skewY = skew_opt[1]
          } else {
            options.skewY = 45
          }
        }

      })

    }

    /* scale 設定 */
    if( scaleKey > -1 ) {
      options.scale = dataItems[scaleKey].replace('scale-', '')
    }

    /* duration 設定 */
    if( timeKey > -1 ) {
      options.duration = dataItems[timeKey].replace('time-', '')
    }

    /* easing 設定 */
    if( easingKey > -1 ) {
      options.ease = dataItems[easingKey].replace('easing-', '')
    }

    /* transformOrigin 設定 */
    if( transformOriginKey > -1 ) {
      options.transformOrigin = dataItems[transformOriginKey].replace('origin-', '').replace('-', ' ')
    }

    /* once 設定 */
    if( onceKey > -1 ) {
      options.scrollTrigger.once = true
    }

    /* markers 設定 */
    if( markerKey > -1 ) {
      options.scrollTrigger.markers = true
    }

    /* start 設定 */
    if( startKey > -1 ) {
      const start = dataItems[startKey].replace('start-', '')
      options.scrollTrigger.start = `top ${start}%`
    }

    /* class 付与設定 */
    if( classKey > -1 ) {
      classOption = dataItems[classKey].replace('class-', '')
    }

    /* animation 起動 */
    gsap.from(item, options)
  })


  /***********************************************************************
  * SAMPLE
  ***********************************************************************/
  const selector = '.sample';
  gsap.utils.toArray(selector).forEach( (item, index) => {
    gsap.from(item, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 0,
      rotation: 0,
      skew: 0,
      transformOrigin: "center center",
      duration: 1, // アニメーションの時間

      scrollTrigger: {
        trigger: item, // 対象の要素を指定
        // scrub: 0.5 // アニメーションをスクロールに同期させる
        start: 'top 80%', // アニメーションの開始位置
        // end: 'top 50%', // アニメーションの終わり位置（ scrub が有効の時のみ有効 ）
        toggleActions: 'play none none reverse', // アニメーションの発火設定
        once: false, // アニメーションを一度きりにする
        markers: true, // デバッグ用マーカー表示
        onEnter: ({progress, direction, isActive}) => { // アニメーションの開始時に処理を追加
          item.classList.add('is-active')
        },
        onLeaveBack: ({progress, direction, isActive}) => { // アニメーションの開始位置に戻った時に処理を追加
          item.classList.remove('is-active')
        }
      }
    })
  })

}