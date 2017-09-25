$(function() {
  var options = {
    $magicalLists: $('ul[data-magic="true"]'),
    $deleteableMagicalLists: $('ul[data-magic="true"][data-deletable="true"]'),
    viewButtonSelector: 'input[data-name="view"]',
    deleteButtonSelector: 'input[data-name="delete"]',
    revokeButtonSelector: 'input[data-name="revoke"]',
  },
      list_manager = new ListManager(options);
  list_manager.initialize();
});
