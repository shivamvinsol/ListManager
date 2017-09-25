//created objects of List Items
function ListItem(options) {
  this.id = options.id,
  this.listId = options.listId,
  this.value = options.value,
  this.priority = options.priority,
  this.deletable = options.deletable,
  this.deleted = false // initially all li are visible
}
