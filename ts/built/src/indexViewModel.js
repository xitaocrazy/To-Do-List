var main;
(function (main) {
    var modules;
    (function (modules) {
        var IndexViewModel = /** @class */ (function () {
            function IndexViewModel() {
                var _this = this;
                this.markAsDone = function (item) {
                    _this.toDoList.remove(item);
                    _this.doneList.push(item);
                    if (typeof (Storage) !== "undefined") {
                        localStorage.removeItem(item.title());
                        item.title(item.title() + '_Done');
                        localStorage.setItem(item.title(), item.description());
                    }
                    else {
                        item.title(item.title() + '_Done');
                    }
                };
                this.title = ko.observable('');
                this.description = ko.observable('');
                this.actualView = ko.observable(0);
                this.toDoList = ko.observableArray([]);
                this.doneList = ko.observableArray([]);
                this.hasNoTitle = ko.observable(false);
                this.hasNoDescription = ko.observable(false);
                this.isDuplicatedKey = ko.observable(false);
                this.invalidKeyMessage = ko.observable('');
                this.isInvalidKey = ko.computed(function () {
                    return _this.hasNoTitle() || _this.isDuplicatedKey();
                });
            }
            ;
            IndexViewModel.prototype.init = function () {
                this.getTodoList();
            };
            IndexViewModel.prototype.addNewItem = function () {
                if (this.hasValidData() && this.isUniqueKey()) {
                    this.insertNewItem();
                }
            };
            ;
            IndexViewModel.prototype.getTodoList = function () {
                if (typeof (Storage) !== "undefined") {
                    for (var i = 0; i < localStorage.length; i++) {
                        var key = localStorage.key(i);
                        var value = localStorage.getItem(key);
                        var item = {
                            title: ko.observable(key),
                            description: ko.observable(value)
                        };
                        var isDone = /_Done$/i.test(key);
                        if (isDone) {
                            this.doneList.push(item);
                        }
                        else {
                            this.toDoList.push(item);
                        }
                    }
                }
            };
            ;
            IndexViewModel.prototype.hasValidData = function () {
                this.hasNoTitle(this.title() === '');
                this.hasNoDescription(this.description() === '');
                if (this.hasNoTitle()) {
                    this.invalidKeyMessage('Insert a title');
                }
                return !this.hasNoTitle() && !this.hasNoDescription();
            };
            IndexViewModel.prototype.isUniqueKey = function () {
                this.isDuplicatedKey(false);
                var value = localStorage.getItem(this.title());
                if (value) {
                    this.isDuplicatedKey(true);
                    this.invalidKeyMessage('This title already was used');
                }
                else {
                    value = localStorage.getItem(this.title() + '_Done');
                    if (value) {
                        this.isDuplicatedKey(true);
                        this.invalidKeyMessage('This title already was used');
                    }
                }
                return !this.isDuplicatedKey();
            };
            IndexViewModel.prototype.insertNewItem = function () {
                var item = {
                    title: ko.observable(this.title()),
                    description: ko.observable(this.description())
                };
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem(item.title(), item.description());
                }
                this.toDoList.push(item);
                this.cleanData();
            };
            IndexViewModel.prototype.cleanData = function () {
                this.title('');
                this.description('');
                this.hasNoTitle(false);
                this.hasNoDescription(false);
                this.isDuplicatedKey(false);
            };
            return IndexViewModel;
        }());
        modules.IndexViewModel = IndexViewModel;
    })(modules = main.modules || (main.modules = {}));
})(main || (main = {}));
//# sourceMappingURL=indexViewModel.js.map