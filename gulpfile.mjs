// gulpファイルの読み込み
import gulp             from 'gulp';
import path from "path";

// 必要なプラグインの読み込み
import ignore           from 'gulp-ignore';                 // 空フォルダのコピー抑止
import sass             from 'gulp-dart-sass';
import dependents       from 'gulp-dependents';
import changed          from 'gulp-changed';                // 差分ファイルのみ抽出
import uglify           from 'gulp-uglify';                 // JS圧縮
import plumber          from 'gulp-plumber';                // エラー時に停止させない
import notify           from 'gulp-notify';                 // エラー時にアラート出力
import {deleteAsync}    from 'del';                         // ファイル・フォルダ削除
import browserSync      from 'browser-sync';                // オートリロード
import postcss          from 'gulp-postcss';                // postcss
import cssdeclsort      from 'css-declaration-sorter';      // css並べ替え
import cssnano          from 'cssnano';                     // cssnano
import autoprefixer     from 'autoprefixer';                // ベンダープレフィックス自動付与
import prettier         from 'gulp-prettier';               // pretter
import cached           from 'gulp-cached';                 // cached
import babel            from 'gulp-babel';                  // babel
import gulpPug          from 'gulp-pug';                    // pug
import rename           from 'gulp-rename';                 // 出力ファイル拡張子変更
import imagemin         from 'gulp-imagemin';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminMozjpeg  from 'imagemin-mozjpeg';
import imageminOptipng  from 'imagemin-optipng';
import imageminSvgo     from 'imagemin-svgo';


// リリースフォルダと開発フォルダ
const paths = {
  srcDir : 'sitedata/src',
  relDir : 'sitedata/release'
}

const dependentsConfig = {
  ".scss": {
    parserSteps: [
    /(?:^|;|{|}|\*\/)\s*@(import|use|forward|include)\s+((?:"[^"]+"|'[^']+'|url\((?:"[^"]+"|'[^']+'|[^)]+)\)|meta\.load\-css\((?:"[^"]+"|'[^']+'|[^)]+)\))(?:\s*,\s*(?:"[^"]+"|'[^']+'|url\((?:"[^"]+"|'[^']+'|[^)]+)\)|meta\.load\-css\((?:"[^"]+"|'[^']+'|[^)]+)\)))*)(?=[^;]*;)/gm,
    /"([^"]+)"|'([^']+)'|url\((?:"([^"]+)"|'([^']+)'|([^)]+))\)|meta\.load\-css\((?:"([^"]+)"|'([^']+)'|([^)]+))\)/gm
    ],
    prefixes: ["_"],
    postfixes: [".scss", ".sass"],
    basePaths: []
  }
};

// リリースフォルダ削除
const clean = () => {
  return deleteAsync(paths.relDir + '/**/*');    // リリースフォルダ全削除
}

const cleanAds = () => {
  return deleteAsync(paths.srcDir + '/**/*Zone.Identifier');    // Zone.Identifier全削除
}

// srcフォルダhtmlファイル削除
const clean_src = () => {
  return deleteAsync([
    paths.srcDir + '/*\.html',
    '!' + paths.srcDir + '/_*\.html'
  ]);    // srcフォルダ直下の「_」から始まる htmlファイル 全削除
}

const copy = () => {
  var relGlob = paths.relDir;
  var srcGlob = paths.srcDir + '/**/*';

  // releaseフォルダにアップファイルリリース
  return gulp.src([
    srcGlob,
    paths.srcDir + '/.htaccess',
    paths.srcDir + '/**/.htaccess',
    '!' + paths.srcDir + '/Templates/**/*',
    '!' + paths.srcDir + '/pug/**/*',
    '!' + paths.srcDir + '/sass/**/*',
    '!' + paths.srcDir + '/js/**/*',
    '!' + paths.srcDir + '/**/*.+(jpg|jpeg|png|gif|svg)',
    '!' + paths.srcDir + '/_**/*',
    '!' + paths.srcDir + '/**/_*',
    '!' + paths.srcDir + '/topcms/master/*.txt'
  ], {allowEmpty: true})
    .pipe(changed(relGlob))
    .pipe(ignore.include({isFile: true}))    // ファイルのみを選択
    .pipe(gulp.dest(relGlob));
}

// 「_」から始まる html をリネームしてリリースフォルダへコピー
const html_rename = () => {
  return gulp
    .src([
      paths.srcDir + '/_*\.html'
    ])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe( rename(function (path){
      path.basename = path.basename.slice(1)
    }) )
    .pipe( gulp.dest( paths.relDir ) );
}

// リリースフォルダへコピー（Wordpress Ver）
const copy_wp = () => {
  var relGlob = paths.relDir;
  var srcGlob = paths.srcDir + '/**/*';

  // releaseフォルダにアップファイルリリース
  return gulp.src([
    srcGlob,
    paths.srcDir + '/.htaccess',
    paths.srcDir + '/**/.htaccess',
    '!' + paths.srcDir + '/pug/**/*',
    '!' + paths.srcDir + '/sass/**/*',
    '!' + paths.srcDir + '/js/**/*',
    '!' + paths.srcDir + '/**/*.+(jpg|jpeg|png|gif|svg|html|htm)',
    '!' + paths.srcDir + '/_**/*',
    '!' + paths.srcDir + '/**/_*',
    '!' + paths.srcDir + '/topcms/master/*.txt'
  ], {allowEmpty: true})
    .pipe(changed(relGlob))
    .pipe(ignore.include({isFile: true}))    // ファイルのみを選択
    .pipe(gulp.dest(relGlob));
}

// 画像圧縮
const imageMin = () => {
  const srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif|svg)';
  const relGlob = paths.relDir;

  return gulp
  .src(srcGlob) //タスクを実行するディレクトリを指定
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(
      imagemin([
        imageminGifsicle({interlaced: true}),
        imageminMozjpeg({quality: 75, progressive: true}),
        imageminOptipng({optimizationLevel: 5}),
        imageminSvgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ])
    )
    .pipe(gulp.dest(relGlob)) // 出力先ディレクトリを指定
};

// SASSのコンパイル
const buildCSS = () => {
  const cssplugin = [
    autoprefixer(),
    cssdeclsort({
      order: 'smacss'
    }),
    cssnano({ autoprefixer: false })
  ];

  return gulp.src(paths.srcDir + '/sass/**/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(dependents(dependentsConfig))
    .pipe(
      sass({
        includePaths: ['node_modules', 'sitedata/src/sass'],
        outputStyle: 'expanded'
      })
    )
    .pipe(postcss(cssplugin))
    .pipe(gulp.dest(paths.srcDir + '/css'))
    .pipe(browserSync.reload({stream:true}));
}

const sass_prettier = () => {
  return gulp.src(paths.srcDir + '/sass/**/*.scss')
    .pipe(prettier({
        printWidth: 2000,
        tabWidth: 2,
        useTabs: false
      },
      { filter: true })
    )
    .pipe(gulp.dest(file => file.base));
}

const html_prettier = () => {
  return gulp.src(paths.srcDir + '/*.html')
    .pipe(cached('html'))
    .pipe(prettier({
        printWidth: 4000,
        tabWidth: 2,
        useTabs: false
      },
      { filter: true })
    )
    .pipe(gulp.dest(file => file.base));
}

// js圧縮
const js = () => {
  return gulp.src(paths.srcDir + '/js/**/*.js')
    .pipe(changed(paths.relDir + '/js'))
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.relDir + '/js'))
    .pipe(browserSync.reload({stream:true}));
}

//  pugのコンパイル
const pug = (done) => {
  const options = {
    filters: {
      'php': text => {
        text = '<?php ' + text + ' ?>';
        return text;
      }
    },
    pretty: true
  };
  gulp
  .src([
    paths.srcDir + '/pug/*.pug',
    '!' + paths.srcDir + '/pug/**/_*.pug',
    '!' + paths.srcDir + '/pug/master/**/*.pug',
    '!' + paths.srcDir + '/pug/inc/**/*.pug',
    '!' + paths.srcDir + '/pug/template/**/*.pug'
  ])
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
  .pipe(gulpPug(options))
  .pipe( rename( (path) => {
    if( path.basename.indexOf('-php') !== -1 ) {
      path.basename = path.basename.split('-php').join(''),
      path.extname = '.php'
    }
  }) )
  .pipe( gulp.dest( paths.srcDir ) )
  .pipe(browserSync.reload({stream:true}));
  deleteAsync([
    paths.srcDir + '/*-php\.html'
  ])
  done()
}

const serverSync = (done) => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const siteName = __dirname.split('docker-lamp/code/')[1];
  let browserInfo = {
      server: {
        baseDir: paths.srcDir
      },
      files: ["**/*"],
      port: 4000,
      reloadOnRestart: true
    }
  if( typeof siteName !== 'undefined' ) {
    browserInfo = {
      proxy: {
        target: siteName+'.lvh.me',
        ws: true
      },
      files: ["**/*"],
      port: 4000,
      https: true,
      host: siteName+'.lvh.me',
      open: 'external',
    }
  }

  browserSync.init(browserInfo);
  done();
}

export const release = gulp.series(
  clean,
    gulp.parallel(pug, buildCSS, js, imageMin), // ここは並列
  sass_prettier,
  html_rename,
  copy
);

// Wordpressリリース
export const release_wp = gulp.series(
  clean,
    gulp.parallel(buildCSS, js, imageMin), // ここは並列
  sass_prettier,
  copy_wp
);

// Watch
const watch = () => {
  gulp.watch(paths.srcDir + '/sass/**/*.scss', buildCSS);
  gulp.watch(paths.srcDir + '/pug/**/*.pug', gulp.series(clean_src, pug));
  gulp.watch(paths.srcDir + '/**/*Zone.Identifier', cleanAds);
  gulp.watch(paths.srcDir + '/js/*.js', js);
  gulp.watch(paths.srcDir + '/topcms/**/(*.php|*.html|*.txt)', browserSync.reload({stream:true}));
}

// defaultで画像圧縮タスクをwatch状態に
export default gulp.parallel(serverSync, watch);