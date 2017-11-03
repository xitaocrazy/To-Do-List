describe('With an IndexViewModel', function () {
    var vm;
    beforeEach(function () {
        vm = new main.modules.IndexViewModel();
    });
    describe('when build the object', function () {
        it('shloud set "title" as expected', function () {
            expect(vm.title()).toEqual('');
        });
        it('shloud set "description" as expected', function () {
            expect(vm.description()).toEqual('');
        });
        it('shloud set "toDoList" as expected', function () {
            expect(vm.toDoList()).toEqual([]);
        });
        it('shloud set "doneList" as expected', function () {
            expect(vm.doneList()).toEqual([]);
        });
        it('shloud set "hasNoTitle" as expected', function () {
            expect(vm.hasNoTitle()).toBeFalsy();
        });
        it('shloud set "hasNoDescription" as expected', function () {
            expect(vm.hasNoDescription()).toBeFalsy();
        });
        it('shloud set "isDuplicatedKey" as expected', function () {
            expect(vm.isDuplicatedKey()).toBeFalsy();
        });
        it('shloud set "invalidKeyMessage" as expected', function () {
            expect(vm.invalidKeyMessage()).toEqual('');
        });
        it('shloud set "isInvalidKey" as expected', function () {
            expect(vm.isInvalidKey()).toBeFalsy();
        });
    });
    describe('when call "init"', function () {
        var localStorageLengthSpy;
        var localStorageKeySpy;
        var localStorageGetItemSpy;
        beforeEach(function () {
            localStorage.clear();
            localStorage.setItem('to-do', 'value');
            localStorage.setItem('done_Done', 'value_Done');
            localStorageKeySpy = spyOn(localStorage, "key").and.callThrough();
            localStorageGetItemSpy = spyOn(localStorage, "getItem").and.callThrough();
            vm.init();
        });
        it('shloud get a localStorage key to all itens in the localStorage', function () {
            expect(localStorageKeySpy).toHaveBeenCalledWith(0);
            expect(localStorageKeySpy).toHaveBeenCalledWith(1);
        });
        it('shloud get a localStorage value to all expected keys', function () {
            expect(localStorageGetItemSpy).toHaveBeenCalledWith('to-do');
            expect(localStorageGetItemSpy).toHaveBeenCalledWith('done_Done');
        });
        it('shloud set "toDoList" as expected', function () {
            var expectedItem = {
                title: 'to-do',
                description: 'value'
            };
            expect(vm.toDoList().length).toEqual(1);
            var item = vm.toDoList()[0];
            expect(item.title()).toEqual(expectedItem.title);
            expect(item.description()).toEqual(expectedItem.description);
        });
        it('shloud set "doneList" as expected', function () {
            var expectedItem = {
                title: 'done_Done',
                description: 'value_Done'
            };
            expect(vm.doneList().length).toEqual(1);
            var item = vm.doneList()[0];
            expect(item.title()).toEqual(expectedItem.title);
            expect(item.description()).toEqual(expectedItem.description);
        });
    });
    describe('when call "addNewItem"', function () {
        describe('when has no title', function () {
            beforeEach(function () {
                vm.title('');
                vm.description('description');
                vm.addNewItem();
            });
            it('should set "hasNoTitle" as truthy', function () {
                expect(vm.hasNoTitle()).toBeTruthy();
            });
            it('should set "isInvalidKey" as truthy', function () {
                expect(vm.isInvalidKey()).toBeTruthy();
            });
            it('should not clean data', function () {
                expect(vm.description()).toEqual('description');
            });
            it('should not insert a item in to-do list', function () {
                expect(vm.toDoList()).toEqual([]);
            });
            it('should not insert a item in localStorage', function () {
                var value = localStorage.getItem('');
                expect(value).toBeNull();
            });
            it('should set the "invalidKeyMessage" as expected', function () {
                expect(vm.invalidKeyMessage()).toEqual('Insert a title');
            });
        });
        describe('when has no description', function () {
            beforeEach(function () {
                vm.title('title');
                vm.description('');
                vm.addNewItem();
            });
            it('should set "hasNoDescription" as truthy', function () {
                expect(vm.hasNoDescription()).toBeTruthy();
            });
            it('should not clean data', function () {
                expect(vm.title()).toEqual('title');
            });
            it('should not insert a item in to-do list', function () {
                expect(vm.toDoList()).toEqual([]);
            });
            it('should not insert a item in localStorage', function () {
                var value = localStorage.getItem('title');
                expect(value).toBeNull();
            });
        });
        describe('when has a duplicated title', function () {
            beforeEach(function () {
                localStorage.clear();
                localStorage.setItem('title_Done', 'value');
                vm.title('title');
                vm.description('description');
                vm.addNewItem();
            });
            it('should set "isDuplicatedKey" as truthy', function () {
                expect(vm.isDuplicatedKey()).toBeTruthy();
            });
            it('should set "isInvalidKey" as truthy', function () {
                expect(vm.isInvalidKey()).toBeTruthy();
            });
            it('should not clean data', function () {
                expect(vm.title()).toEqual('title');
                expect(vm.description()).toEqual('description');
            });
            it('should not insert a item in to-do list', function () {
                expect(vm.toDoList()).toEqual([]);
            });
            it('should not insert a item in localStorage', function () {
                expect(localStorage.length).toEqual(1);
            });
            it('should set the "invalidKeyMessage" as expected', function () {
                expect(vm.invalidKeyMessage()).toEqual('This title already was used');
            });
        });
        describe('when all data is valid', function () {
            beforeEach(function () {
                localStorage.clear();
                vm.title('title');
                vm.description('description');
                vm.addNewItem();
            });
            it('should set "hasNoTitle" as falsy', function () {
                expect(vm.hasNoTitle()).toBeFalsy();
            });
            it('should set "hasNoDescription" as falsy', function () {
                expect(vm.hasNoDescription()).toBeFalsy();
            });
            it('should set "isDuplicatedKey" as falsy', function () {
                expect(vm.isDuplicatedKey()).toBeFalsy();
            });
            it('should set "isInvalidKey" as falsy', function () {
                expect(vm.isInvalidKey()).toBeFalsy();
            });
            it('should clean data', function () {
                expect(vm.title()).toEqual('');
                expect(vm.description()).toEqual('');
            });
            it('should insert a item in to-do list', function () {
                var expectedItem = {
                    title: 'title',
                    description: 'description'
                };
                expect(vm.toDoList().length).toEqual(1);
                var item = vm.toDoList()[0];
                expect(item.title()).toEqual(expectedItem.title);
                expect(item.description()).toEqual(expectedItem.description);
            });
            it('should insert a item in localStorage', function () {
                var value = localStorage.getItem('title');
                expect(value).toEqual('description');
            });
        });
    });
    describe('when call "markAsDone"', function () {
        beforeEach(function () {
            localStorage.clear();
            localStorage.setItem('key', 'value');
            var item = {
                title: ko.observable('key'),
                description: ko.observable('value')
            };
            vm.toDoList.push(item);
            vm.doneList([]);
            vm.markAsDone(item);
        });
        it('should remove item from to-do list', function () {
            expect(vm.toDoList()).toEqual([]);
        });
        it('should insert item in done list', function () {
            var expectedItem = {
                title: 'key_Done',
                description: 'value'
            };
            expect(vm.doneList().length).toEqual(1);
            var item = vm.doneList()[0];
            expect(item.title()).toEqual(expectedItem.title);
            expect(item.description()).toEqual(expectedItem.description);
        });
        it('should remove item from localStorage as to-do', function () {
            var value = localStorage.getItem('key');
            expect(value).toBeNull();
        });
        it('should insert a item in localStorage as done', function () {
            var value = localStorage.getItem('key_Done');
            expect(value).toEqual('value');
        });
    });
});
//# sourceMappingURL=indexViewModelSpec.js.map