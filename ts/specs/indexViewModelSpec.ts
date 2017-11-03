describe('With an IndexViewModel', () =>{
    var vm: main.modules.IndexViewModel;
    beforeEach(() => {
        vm = new main.modules.IndexViewModel();
    });
    describe('when build the object', () =>{
        it('shloud set "title" as expected', () =>{
            expect(vm.title()).toEqual('');
        });
        it('shloud set "description" as expected', () =>{
            expect(vm.description()).toEqual('');
        });
        it('shloud set "toDoList" as expected', () =>{
            expect(vm.toDoList()).toEqual([]);
        });
        it('shloud set "doneList" as expected', () =>{
            expect(vm.doneList()).toEqual([]);
        });
        it('shloud set "hasNoTitle" as expected', () =>{
            expect(vm.hasNoTitle()).toBeFalsy();
        });
        it('shloud set "hasNoDescription" as expected', () =>{
            expect(vm.hasNoDescription()).toBeFalsy();
        });
        it('shloud set "isDuplicatedKey" as expected', () =>{
            expect(vm.isDuplicatedKey()).toBeFalsy();
        });
        it('shloud set "invalidKeyMessage" as expected', () =>{
            expect(vm.invalidKeyMessage()).toEqual('');
        });
        it('shloud set "isInvalidKey" as expected', () =>{
            expect(vm.isInvalidKey()).toBeFalsy();
        });
    });  
    describe('when call "init"', () =>{
        var localStorageLengthSpy: jasmine.Spy;
        var localStorageKeySpy: jasmine.Spy;
        var localStorageGetItemSpy: jasmine.Spy;
        beforeEach(() => {
            localStorage.clear();
            localStorage.setItem('to-do', 'value');
            localStorage.setItem('done_Done', 'value_Done');
            localStorageKeySpy = spyOn(localStorage, "key").and.callThrough();
            localStorageGetItemSpy = spyOn(localStorage, "getItem").and.callThrough();
            vm.init();
        });
        it('shloud get a localStorage key to all itens in the localStorage', () =>{
            expect(localStorageKeySpy).toHaveBeenCalledWith(0);
            expect(localStorageKeySpy).toHaveBeenCalledWith(1);
        });
        it('shloud get a localStorage value to all expected keys', () =>{
            expect(localStorageGetItemSpy).toHaveBeenCalledWith('to-do');
            expect(localStorageGetItemSpy).toHaveBeenCalledWith('done_Done');
        });
        it('shloud set "toDoList" as expected', () =>{
            var expectedItem = {
                title: 'to-do', 
                description: 'value'
            };
            expect(vm.toDoList().length).toEqual(1);
            var item = vm.toDoList()[0];
            expect(item.title()).toEqual(expectedItem.title);
            expect(item.description()).toEqual(expectedItem.description);
        });
        it('shloud set "doneList" as expected', () =>{
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
    describe('when call "addNewItem"', ()=>{
        describe('when has no title', ()=>{
            beforeEach(() =>{
                vm.title('');
                vm.description('description');
                vm.addNewItem()
            });
            it('should set "hasNoTitle" as truthy', () =>{
                expect(vm.hasNoTitle()).toBeTruthy();
            });
            it('should set "isInvalidKey" as truthy', () =>{
                expect(vm.isInvalidKey()).toBeTruthy();
            });
            it('should not clean data', () =>{
                expect(vm.description()).toEqual('description');
            });
            it('should not insert a item in to-do list', () =>{
                expect(vm.toDoList()).toEqual([]);
            });
            it('should not insert a item in localStorage', () =>{
                var value = localStorage.getItem('');
                expect(value).toBeNull();
            });
            it('should set the "invalidKeyMessage" as expected', () =>{
                expect(vm.invalidKeyMessage()).toEqual('Insert a title');
            });
        });
        describe('when has no description', ()=>{
            beforeEach(() =>{
                vm.title('title');
                vm.description('');
                vm.addNewItem()
            });
            it('should set "hasNoDescription" as truthy', () =>{
                expect(vm.hasNoDescription()).toBeTruthy();
            });
            it('should not clean data', () =>{
                expect(vm.title()).toEqual('title');
            });
            it('should not insert a item in to-do list', () =>{
                expect(vm.toDoList()).toEqual([]);
            });
            it('should not insert a item in localStorage', () =>{
                var value = localStorage.getItem('title');
                expect(value).toBeNull();
            });
        });
        describe('when has a duplicated title', ()=>{
            beforeEach(() =>{
                localStorage.clear();
                localStorage.setItem('title_Done', 'value');
                vm.title('title');
                vm.description('description');
                vm.addNewItem()
            });
            it('should set "isDuplicatedKey" as truthy', () =>{
                expect(vm.isDuplicatedKey()).toBeTruthy();
            });
            it('should set "isInvalidKey" as truthy', () =>{
                expect(vm.isInvalidKey()).toBeTruthy();
            });
            it('should not clean data', () =>{
                expect(vm.title()).toEqual('title');
                expect(vm.description()).toEqual('description');
            });
            it('should not insert a item in to-do list', () =>{
                expect(vm.toDoList()).toEqual([]);
            });
            it('should not insert a item in localStorage', () =>{
                expect(localStorage.length).toEqual(1);
            });
            it('should set the "invalidKeyMessage" as expected', () =>{
                expect(vm.invalidKeyMessage()).toEqual('This title already was used');
            });
        });
        describe('when all data is valid', ()=>{
            beforeEach(() =>{
                localStorage.clear();
                vm.title('title');
                vm.description('description');
                vm.addNewItem()
            });
            it('should set "hasNoTitle" as falsy', () =>{
                expect(vm.hasNoTitle()).toBeFalsy();
            });
            it('should set "hasNoDescription" as falsy', () =>{
                expect(vm.hasNoDescription()).toBeFalsy();
            });
            it('should set "isDuplicatedKey" as falsy', () =>{
                expect(vm.isDuplicatedKey()).toBeFalsy();
            });
            it('should set "isInvalidKey" as falsy', () =>{
                expect(vm.isInvalidKey()).toBeFalsy();
            });
            it('should clean data', () =>{
                expect(vm.title()).toEqual('');
                expect(vm.description()).toEqual('');
            });
            it('should insert a item in to-do list', () =>{
                var expectedItem = {
                    title: 'title', 
                    description: 'description'
                };
                expect(vm.toDoList().length).toEqual(1);
                var item = vm.toDoList()[0];
                expect(item.title()).toEqual(expectedItem.title);
                expect(item.description()).toEqual(expectedItem.description);
            });
            it('should insert a item in localStorage', () =>{
                var value = localStorage.getItem('title');
                expect(value).toEqual('description');
            });
        });
    });
    describe('when call "markAsDone"', ()=>{
        beforeEach(() =>{
            localStorage.clear();
            localStorage.setItem('key', 'value');
            var item = {
                title:  ko.observable<string>('key'), 
                description:  ko.observable<string>('value') 
            };            
            vm.toDoList.push(item);
            vm.doneList([]);
            vm.markAsDone(item);
        });
        it('should remove item from to-do list', () =>{
            expect(vm.toDoList()).toEqual([]);
        });
        it('should insert item in done list', () =>{
            var expectedItem = {
                title: 'key_Done', 
                description: 'value'
            };
            expect(vm.doneList().length).toEqual(1);
            var item = vm.doneList()[0];
            expect(item.title()).toEqual(expectedItem.title);
            expect(item.description()).toEqual(expectedItem.description);
        });
        it('should remove item from localStorage as to-do', () =>{
            var value = localStorage.getItem('key');
            expect(value).toBeNull();
        });
        it('should insert a item in localStorage as done', () =>{
            var value = localStorage.getItem('key_Done');
            expect(value).toEqual('value');
        });
    });
})