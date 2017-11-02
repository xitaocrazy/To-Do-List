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
                };
                this.title = ko.observable('');
                this.description = ko.observable('');
                this.actualView = ko.observable(0);
                this.toDoList = ko.observableArray([]);
                this.doneList = ko.observableArray([]);
                this.hasNoTitle = ko.observable(false);
                this.hasNoDescription = ko.observable(false);
                this.getTodoList();
            }
            ;
            IndexViewModel.prototype.addNewItem = function () {
                if (this.validateData()) {
                    this.insertNewItem();
                }
            };
            ;
            IndexViewModel.prototype.getTodoList = function () {
                var a = { title: ko.observable('Teste1'), description: ko.observable('Teste1') };
                var b = { title: ko.observable('Teste1'), description: ko.observable('Teste1') };
                this.toDoList.push(a);
                this.toDoList.push(b);
            };
            ;
            IndexViewModel.prototype.validateData = function () {
                this.hasNoTitle(this.title() === '');
                this.hasNoDescription(this.description() === '');
                return !this.hasNoTitle() && !this.hasNoDescription();
            };
            IndexViewModel.prototype.insertNewItem = function () {
                var item = {
                    title: ko.observable(this.title()),
                    description: ko.observable(this.description())
                };
                this.toDoList.push(item);
                this.title('');
                this.description('');
                this.hasNoTitle(false);
                this.hasNoDescription(false);
            };
            return IndexViewModel;
        }());
        modules.IndexViewModel = IndexViewModel;
    })(modules = main.modules || (main.modules = {}));
})(main || (main = {}));
//# sourceMappingURL=indexViewModel.js.map