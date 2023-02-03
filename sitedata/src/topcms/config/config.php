//お知らせ
$config['program'] +=
array(
	'news'  =>                         // ページスラッグ【必須】
	array(
		'title'  => 'お知らせ',              // ページタイトル【必須】
		'layout' => 'block',              // 管理画面レイアウト（block or table）
		'add'    => 'last',              // 投稿追加位置（first or last or select）
		'sort'   => array('date' => SORT_DESC), // ソート処理（SORT_ASC：昇順、SORT_DESC：降順）
		'display' => 'show', // 編集権限時のメニュー欄表示非表示（show：表示、none：非表示）
		'input'  =>
	array(  // 以下から入力フォームの設定 ――――――――――――――
		array(
			'title'       => '投稿日',      // フィールド名【必須】
			'type'        => 'date',       // 入力タイプ【必須】
			'name'        => 'date',       // フィールド名【必須】
			'default'     => 'd',          // デフォルト値（date type で当日指定したい場合は d）
			'format'      => 'yy/mm/dd'    // date typeの場合、フォーマット指定
		),
		array(
			'title'       => 'お知らせタイトル',  // フィールド名【必須】
			'type'        => 'text',      // 入力タイプ【必須】
			'name'        => 'title',    // フィールドスラッグ【必須】
		),
		array(
			'title'       => 'お知らせ内容',  // フィールド名【必須】
			'type'        => 'textarea',      // 入力タイプ【必須】
			'name'        => 'text',    // フィールドスラッグ【必須】
		),
		array(
			'title'       => 'リンク',  // フィールド名【必須】
			'type'        => 'text',      // 入力タイプ【必須】
			'name'        => 'link',    // フィールドスラッグ【必須】
			'placeholder' => 'https://～',       // プレースフォルダ
		),
	)
	)
);

//会社概要
$config['program'] +=
array(
	''  =>                         // ページスラッグ【必須】
	array(
		'title'  => '会社概要',              // ページタイトル【必須】
		'layout' => 'table',              // 管理画面レイアウト（block or table）
		'add'    => 'last',              // 投稿追加位置（first or last or select）
		'display' => 'show', // 編集権限時のメニュー欄表示非表示（show：表示、none：非表示）
		'input'  =>
		array(  // 以下から入力フォームの設定 ――――――――――――――
			array(
				'title'       => '項目名',       // フィールド名【必須】
				'type'        => 'text',        // 入力タイプ【必須】
				'name'        => 'title',       // フィールドスラッグ【必須】
			),
			array(
				'title'       => '内容',       // フィールド名【必須】
				'type'        => 'textarea',        // 入力タイプ【必須】
				'name'        => 'text',       // フィールドスラッグ【必須】
			),
		)
	)
);

//画像、コメント
$config['program'] +=
array(
	''  =>                         // ページスラッグ【必須】
	array(
		'title'  => '',              // ページタイトル【必須】
		'layout' => 'table',              // 管理画面レイアウト（block or table）
		'add'    => 'first',              // 投稿追加位置（first or last or select）
		'display' => 'show', // 編集権限時のメニュー欄表示非表示（show：表示、none：非表示）
		'input'  =>
		array(  // 以下から入力フォームの設定 ――――――――――――――
			array(
				'title'       => '画像',         // フィールド名【必須】
				'type'        => 'file',        // 入力タイプ【必須】
				'name'        => 'img',         // フィールドスラッグ【必須】
				'multiple'    => false,          // 複数投稿
			),
			array(
				'title'       => 'コメント',       // フィールド名【必須】
				'type'        => 'text',        // 入力タイプ【必須】
				'name'        => 'text',       // フィールドスラッグ【必須】
				'placeholder' => '30字以内でご入力ください',       // プレースフォルダ
			),
		)
	)
);

//category付き 募集要項
$config['program'] +=
array(
	'requirements'  =>                         // ページスラッグ【必須】
	array(
		'title'  => '募集要項',              // ページタイトル【必須】
		'layout' => 'table',              // 管理画面レイアウト（block or table）
		'add'    => 'last',              // 投稿追加位置（first or last or select）
		'display' => 'show', // 編集権限時のメニュー欄表示非表示（show：表示、none：非表示）
		'input'  =>
		array(  // 以下から入力フォームの設定 ――――――――――――――
			array(
				'title'       => '雇用形態',  // フィールド名【必須】
				'type'        => 'select',      // 入力タイプ【必須】
				'name'        => 'category',    // フィールドスラッグ【必須】
				'category'    => true,          // プレースフォルダ
			),
			array(
				'title'       => '項目名',       // フィールド名【必須】
				'type'        => 'text',        // 入力タイプ【必須】
				'name'        => 'title',       // フィールドスラッグ【必須】
			),
			array(
				'title'       => '内容',       // フィールド名【必須】
				'type'        => 'textarea',        // 入力タイプ【必須】
				'name'        => 'text',       // フィールドスラッグ【必須】
			),
		)
	)
);