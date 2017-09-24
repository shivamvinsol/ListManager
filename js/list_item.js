//created objects of List Items
function ListItem(options) {
  this.listId = options.listId,
  this.value = options.value,
  this.priority = options.priority,
  this.deleted = false // initially all li are visible
}
