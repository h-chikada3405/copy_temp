<!-- 条件分岐 ----------------------------------------------------------------------------------------------------------->

<!-- index -->
<?php if(is_front_page()): ?>
<!-- index以外 -->
<?php if(!(is_front_page())): ?>
<!-- 固定ページ -->
<?php elseif (is_page('')): ?>

<!-- アーカイブページ -->
<?php elseif (is_archive('properties')): ?>
<!-- タクソノミーページ -->
<?php elseif (is_tax('properties_tax')): ?>
<!-- 詳細ページ -->
<?php elseif (is_single()): ?>

<!-- その他 -->
<?php else: ?>
	<!-- タイトル条件分岐 -->
	<?php if (is_archive('ポストタイプ')): ?>
	<?php elseif (is_tax('タクソノミー名前')): ?>
	<?php elseif (is_single()): ?>
	<?php elseif (is_page('contact')): ?>
	<?php elseif (is_404()): ?>
		<h1 class="notfound_ttl"><span>大変申し訳ございませんが、<br class="sp_only">該当のページがございません。</span><a class="notfound_btn" href="<?php echo esc_url( home_url('') ); ?>">トップページへ</a></h1>
	<?php endif; ?>
<?php endif; ?>



<!-- 変換用正規表現 ----------------------------------------------------------------------------------------------------------->
<!-- リンクのパスを変更 -->
href="(.+?).html(.*?)"
href="<?php echo esc_url( home_url( '/$1/$2' ) ); ?>"
<!-- 画像のパスを変更 -->
<img src="images/(.+?)"
<img src="<?php echo get_theme_file_uri('images/$1')?>"