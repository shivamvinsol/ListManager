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
      $this,
      options;

  this.listItems = [];

  $.each($list.find('li'), function() {
    $this = $(this);
    options = {
      listId: $list.data('id'),
      priority: $this.data('priority') || 100000,
      value: $this.text()
    };

    listItem = new ListItem(options);
    _this.listItems.push(listItem);
  });
};

List.prototype.changeView = function($viewButton) {
  if ($viewButton.data('currentView') === 'all') {
    $viewButton.data('currentView', 'partial');
    $viewButton.text('See All');
    this.filterListItems();
    this.sortListItemsByPriority();
    this.filteredListItems = this.filteredListItems.slice(0, this.initialCount);
    this.displayList();
  } else {
    $viewButton.data('currentView', 'all');
    $viewButton.text('See Less');
    this.filterListItems();
    this.sortListItemsAlphabetically();
    this.displayList();
  }
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
    if (listItem1.priority > listItem2.priority) {
      return true;
    }
  });
};

List.prototype.sortListItemsAlphabetically = function() {
  this.filteredListItems = this.filteredListItems.sort(function(listItem1, listItem2) {
    if (listItem1.value > listItem2.value) {
      return true;
    }
  });
};

List.prototype.displayList = function() {
  var documentFragment = document.createDocumentFragment(),
      $list = $('ul[data-id="' + this.id + '"]'),
      $listItem;
  $.each(this.filteredListItems, function() {
    $listItem = $('<li>').text(this.value);
    documentFragment.append($listItem[0]);
  });

  $list.find('li').remove();
  $list.prepend(documentFragment);
};
