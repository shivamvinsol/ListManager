// class to create list objects
function List(options) {
  this.id = options.id;
  this.initialCount = options.initialCount;
}

List.prototype.initialize = function($list) {
  this.filteredListItems = [];
  this.createListItemObjects($list);
};

List.prototype.createListItemObjects = function($list) {
  var _this = this,
      _deletable,
      $this,
      options;

  this.listItems = [];

  $.each($list.find('li'), function() {
    _deletable = $list.data('deletable') || false;
    $this = $(this);
    options = {
      id: $this.data('id'),
      listId: $list.data('id'),
      priority: $this.data('priority') || 100000,
      value: $this.text(),
      deletable: _deletable,
    };

    listItem = new ListItem(options);
    _this.listItems.push(listItem);
  });
};

List.prototype.changeView = function($viewButton) {
  if ($viewButton.data('currentView') === 'all') {
    $viewButton.data('currentView', 'partial');
    $viewButton.val('See All');
    this.seePriorityList();
  } else {
    $viewButton.data('currentView', 'all');
    $viewButton.val('See Less');
    this.seeCompleteList();
  }
};

List.prototype.seePriorityList = function() {
  this.filterListItems();
  this.sortListItemsByPriority();
  this.filteredListItems = this.filteredListItems.slice(0, this.initialCount);
  this.displayList();
};

List.prototype.seeCompleteList = function() {
  this.filterListItems();
  this.sortListItemsAlphabetically();
  this.displayList();
};

List.prototype.filterListItems = function() {
  var _this = this;
  this.filteredListItems = [];

  $.each(this.listItems, function() {
    if (!this.deleted) {
      _this.filteredListItems.push(this);
    }
  });
};

List.prototype.sortListItemsByPriority = function() {
  this.filteredListItems = this.filteredListItems.sort(function(listItem1, listItem2) {
    if (parseInt(listItem1.priority) > parseInt(listItem2.priority)) {
      return 1;
    } else {
      return -1;
    }
  });
};

List.prototype.sortListItemsAlphabetically = function() {
  this.filteredListItems = this.filteredListItems.sort(function(listItem1, listItem2) {
    if (listItem1.value > listItem2.value) {
      return 1;
    } else {
      return -1;
    }
  });
};

List.prototype.displayList = function() {
  var documentFragment = document.createDocumentFragment(),
      $list = $('ul[data-id="' + this.id + '"]'),
      $listItem,
      $deleteButton;

  $.each(this.filteredListItems, function() {
    $deleteButton = $('<input>', { type: 'button', value: 'X', 'data-name': 'delete'}).addClass('delete'),
    $listItem = $('<li>', { id: this.id, priority: this.priority }).text(this.value);
    if (this.deletable) {
      $listItem.append($deleteButton);
    }
    documentFragment.append($listItem[0]);
  });

  $list.find('li').remove();
  $list.prepend(documentFragment);
};

List.prototype.removeListItem = function(listItem) {
  this.currentListItem = this.getCurrentListItem(listItem.data('id'));  // corresponding list object
  this.currentListItem.deleted = true; // soft delete
};

List.prototype.getCurrentListItem = function(listItemId) {
  var currentListItem;

  $.each(this.listItems, function() {
    if(this.id === listItemId) {
      currentListItem = this;
      return;
    }
  });
  return currentListItem;
}
