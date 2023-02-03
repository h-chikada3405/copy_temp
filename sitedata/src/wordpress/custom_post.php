function custom_post_type(){
  // 物件情報
  $args = array(
    'label'           => '物件情報',
    'labels'          => array(
                            'name'                => '物件情報',
                            'singular_name'       => '物件情報一覧',
                            'add_new_item'        => '物件情報を追加',
                            'add_new'             => '新規追加',
                            'new_item'            => '新しい物件情報',
                            'view_item'           => '物件情報を表示',
                            'not_found'           => '物件情報は見つかりませんでした',
                            'not_found_in_trash'  => 'ゴミ箱に物件情報はありません。',
                            'search_items'        => '物件情報を検索',
                          ),
    'description'     => 'enishi株式会社では、大阪府城東区を拠点に不動産の売買、賃貸、仲介を行っています。一戸建てはもちろん、マンションから土地まで、関西の物件を幅広く取り扱っています。',
    'public'          => true,
    'show_ui'         => true,
    'query_var'       => true,
    'capability_type' => 'post',
    'hierarchical'    => false,
    'menu_position'   => 5,
    'supports'        => array( 'title', 'editor', 'thumbnail' ),
    'has_archive'     => true
    );
  register_post_type( 'properties', $args );

  //物件の種類
  register_taxonomy(
  'properties_tax',
  array('properties'),
    array(
      'hierarchical'      => true,
      'label'             => '物件の種類',
      'show_ui'           => true,
      'show_admin_column' => true,
    )
  );
  //タグをタクソノミーで作る場合
  register_taxonomy(
  'properties_tag',
  array('properties'),
    array(
      'hierarchical'      => true,
      'label'             => '物件の特徴',
      'show_ui'           => true,
      'show_admin_column' => true,
    )
  );
}
add_action( 'init', 'custom_post_type' );