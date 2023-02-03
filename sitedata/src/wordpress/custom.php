<!-- テーマ用スタイルシート読み込み ------------------------------------------------------------------------------------------------------------->

<!-- フォント -->
wp_enqueue_style( '略称', 'URL', array() );
<!-- slick -->
wp_enqueue_style( 'slick', get_theme_file_uri( '/css/slick.css' ), array() );
<!-- MaterialIcons -->
wp_enqueue_style( 'MaterialIcons', 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone', array() );



<!-- テーマ用Javascript読み込み ------------------------------------------------------------------------------------------------------------->

<!-- slick -->
wp_enqueue_script( 'slick', get_theme_file_uri( '/js/slick.min.js' ), array( 'jquery' ) );



<!-- 管理画面装飾 ------------------------------------------------------------------------------------------------------------->

<!-- MW WP Form<p><br>タグ自動入力なくす -->
// MW WP Form<p><br>タグ自動入力なくす
function mvwpform_autop_filter() {
  if (class_exists('MW_WP_Form_Admin')) {
    $mw_wp_form_admin = new MW_WP_Form_Admin();
    $forms = $mw_wp_form_admin->get_forms();
    foreach ($forms as $form) {
      add_filter('mwform_content_wpautop_mw-wp-form-' . $form->ID, '__return_false');
    }
  }
}
mvwpform_autop_filter();


<!-- 【よく使うもの】のタブを非表示 -->
// 【よく使うもの】のタブを非表示
function my_admin_style() {
  echo '<style>
  ul#properties_tax-tabs li.hide-if-no-js{
    display:none;
  }
  </style>'.PHP_EOL;
}
add_action('admin_print_styles', 'my_admin_style');


<!-- チェックボックスをradioに変更 -->
// チェックボックスをradioに変更
add_action( 'admin_print_footer_scripts', 'select_to_radio_taxonomy' );
function select_to_radio_taxonomy() {
  ?>
  <script type="text/javascript">
  jQuery( function( $ ) {
    // 投稿画面
    $( '#taxonomy-properties_tax input[type=checkbox]' ).each( function() {
      $( this ).replaceWith( $( this ).clone().attr( 'type', 'radio' ) );
    });
  });
  </script>
  <?php
}


// カテゴリー必須
function post_edit_required() {
	?>
		<script type="text/javascript">
		jQuery(function($) {
			if( 'properties' == $('#post_type').val() ) {
				$('#post').submit(function(e) {
					if ( $('#properties_tax-all input:checked').length < 1 ) {
						alert('物件の種類を選択してください');
						$('.spinner').css('visibility', 'hidden');
						$('#publish').removeClass('button-primary-disabled');
						$('#properties_tax-all a[href="#category-all"]').focus();
						return false;
					}
				});
			}
		});
		</script>
	<?php
	}
	add_action( 'admin_head-post-new.php', 'post_edit_required' );
	add_action( 'admin_head-post.php', 'post_edit_required' );

// WP管理画面アイコン色を変更
function my_dashboard_print_styles() {
	?>
		<style>
			#adminmenu#adminmenu .wp-menu-image:before {
				color: #FFCC2C;
			}
		</style>
	<?php
}
add_action('admin_print_styles', 'my_dashboard_print_styles');


//タイトルプレイスホルダー変更
function change_default_title( $title ) {
	$screen = get_current_screen();
	if ( $screen->post_type == 'properties' ) {
		$title = '物件名';
	}
	return $title;
}
add_filter( 'enter_title_here', 'change_default_title' );


//ディスクリプション設定
function archive_meta_description() {
  $description = "ディスクリプション";
  echo '<meta name="description" content="' . $description . '">';
}
add_action( 'wp_head', 'archive_meta_description' );
function taxonomy_meta_description() {
  $description = "ディスクリプション";
  echo '<meta name="description" content="' . $description . '">';
}
add_action( 'wp_head', 'taxonomy_meta_description' );
function single_meta_description() {
  $description = "ディスクリプション";
  echo '<meta name="description" content="' . $description . '">';
}
add_action( 'wp_head', 'single_meta_description' );


// WPログイン画面カスタマイズ
function my_login_logo() { ?>
  <style type="text/css">
    #login h1 a,
    .login h1 a {
      background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/images/logo.jpg);
      background-size: 320px;
      width: 180px;
      height: 180px;
      background-size: contain;
    }

    .login {
      background: #344659;
      background-size: cover;
    }

    #nav {
      color: #fff !important;
    }

    .login #backtoblog a, .login #nav a {
      color: #fff !important;
    }

    .language-switcher label .dashicons {
      color: #fff !important;
    }
  </style>
<?php }
add_action('login_enqueue_scripts', 'my_login_logo');


//管理者
if ( current_user_can( 'administrator' ) ) { 
	// ダッシュボード、非表示
  function my_admin_head() {
    echo '<style type="text/css">#contextual-help-link-wrap,#screen-options-link-wrap{display:none;}</style>';
  }
  add_action('admin_head', 'my_admin_head');
  // seo非表示
  function my_admin_seo() {
    echo '<style>
    #seo_sectionid {
      display:none;
    }
    </style>'.PHP_EOL;
  }
  add_action('admin_print_styles', 'my_admin_seo');

  //上部バナー装飾
  function remove_admin_bar() {
    echo '<style>
    #wpadminbar ul #wp-admin-bar-view .ab-item, #wpadminbar ul #wp-admin-bar-updates .ab-item, #wpadminbar ul #wp-admin-bar-wp-logo .ab-item {
      display:none;
    }
    #wpadminbar {
      background: #344659;
    }  
    </style>'.PHP_EOL;
  }
  add_action('admin_bar_menu', 'remove_admin_bar');

  //管理画面ナビ装飾
  function add_custom_menu() {
    echo '<style>
    #adminmenuback, #adminmenuwrap, #adminmenuwrap #adminmenu {
      background-color:#344659 !important;
    }  
    #adminmenu div.wp-menu-name {
      padding: 12px 8px 12px 40px !important;
      letter-spacing: .08em !important;
      transition: all .3s ease-in-out !important;
    }  
    #adminmenu div.wp-menu-image {
      padding-top: 4px;
    }
    #adminmenu li a {
      transition: all .3s ease-in-out;
    }

    </style>'.PHP_EOL;
  }
  add_action( 'admin_menu', 'add_custom_menu');
} 


//編集者
if ( current_user_can( 'editor' ) ) { 
  function my_admin_head() {
    echo '<style type="text/css">#contextual-help-link-wrap,#screen-options-link-wrap{display:none;}</style>';
  }
  add_action('admin_head', 'my_admin_head');
  // seo非表示
  function my_admin_seo() {
    echo '<style>
    #seo_sectionid {
      display:none;
    }
    </style>'.PHP_EOL;
  }
  add_action('admin_print_styles', 'my_admin_seo');

  //上部バナー装飾
  function remove_admin_bar() {
    echo '<style>
    #wpadminbar #wp-admin-bar-site-name a.ab-item, #wpadminbar ul #wp-admin-bar-view .ab-item, #wpadminbar ul #wp-admin-bar-updates .ab-item, #wpadminbar ul #wp-admin-bar-wp-logo .ab-item {
      display:none;
    }
    #wpadminbar {
      background: #344659;
    }  
    </style>'.PHP_EOL;
  }
  add_action('admin_bar_menu', 'remove_admin_bar');

  //管理画面ナビ装飾
  function add_custom_menu() {
    echo '<style>
    #adminmenuback, #adminmenuwrap, #adminmenuwrap #adminmenu {
      background-color:#344659 !important;
    }  
    #adminmenu div.wp-menu-name {
      padding: 12px 8px 12px 40px !important;
      letter-spacing: .08em !important;
      transition: all .3s ease-in-out !important;
    }  
    #adminmenu div.wp-menu-image {
      padding-top: 4px;
    }
    #adminmenu li a {
      transition: all .3s ease-in-out;
    }
    </style>'.PHP_EOL;
  }
  add_action( 'admin_menu', 'add_custom_menu');
}