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


