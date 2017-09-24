function ListManager(options) {
  this.$magicalLists = options.$magicalLists;
  this.$deleteableMagicalLists = options.$deleteableMagicalLists;
  this.viewButtonSelector = options.viewButtonSelector;
  this.deleteButtonSelector = options.deleteButtonSelector;
  this.revokeButtonSelector = options.revokeButtonSelector;
}

ListManager.prototype.initialize = function() {
  this.lists = []; // collection of all magical lists
  this.addDeleteButton();
  this.addViewButton();
  this.addRevokeButton();
  this.createListObjects();
  this.bindEvents();
};

ListManager.prototype.createListObjects = function() {
  var _this = this,
      $this,
      options,
      list;

  $.each(this.$magicalLists, function() {
    $this = $(this);
    options = {
      id: $this.data('id'),
      initialCount: $this.data('initialCount')
    };

    list = new List(options);
    list.initialize($this);
    _this.lists.push(list);
  });
};

ListManager.prototype.addViewButton = function() {
  var $this = '',
      listElementCount = 0,
      intialCount = 0,
      $viewButton = '';

  $.each(this.$magicalLists, function() {
    $this = $(this);
    listElementCount = $this.find('li').length;
    initialCount = $this.data('initialCount');

    //  show button only if intial count is less than total elements
    if (initialCount < listElementCount) {
      $viewButton = $('<button>', {'data-name': 'view', 'data-current-view': 'all'}).text("See Less");
      $this.append($viewButton);
    }
  });
};
//
ListManager.prototype.addDeleteButton = function() {
  var $deleteButton = $('<button>', { 'data-name': 'delete'}).addClass('delete').text('X');
  this.$deleteableMagicalLists.find('li').append($deleteButton);
};

ListManager.prototype.addRevokeButton = function() {
  var $deleteButton = $('<button>', { 'data-name': 'revoke'}).text('Revoke');
  this.$deleteableMagicalLists.append($deleteButton);
};

ListManager.prototype.bindEvents = function() {
  $(this.viewButtonSelector).on('click', this.handleViewEvent());
};

ListManager.prototype.handleViewEvent = function() {
  var _this = this;
  return function() {
    var $this = $(this),
        listId = $this.closest('ul').data('id');
    _this.currentList = _this.getCurrentList(listId);  // corresponding list object
    _this.currentList.changeView($this);
  };
};

ListManager.prototype.getCurrentList = function(listId) {
  var currentList;

  $.each(this.lists, function() {
    if(this.id === listId) {
      currentList = this;
      return;
    }
  });
  return currentList;
}
