//loading,boxer
$(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      modalImage(".boxer")
      page_loading()
      scroll_effect()
    });
  } else {
    modalImage(".boxer")
    page_loading()
    scroll_effect()
  }
});

//WP用バリデーション
$(function() {
  if ($('.contact').length > 0) {
    top_validation();
  };
});