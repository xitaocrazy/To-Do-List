describe("With an IndexViewModel", () =>{
    var vm: main.modules.IndexViewModel;
    beforeEach(() => {
        vm = new main.modules.IndexViewModel();
    });
    describe("when build the object", () =>{
        it("shloud set title as expected", () =>{
            expect(vm.title()).toEqual('');
        })
        it("shloud set description as expected", () =>{
            expect(vm.description()).toEqual('');
        })
        it("shloud set actualView as expected", () =>{
            expect(vm.description()).toEqual('');
        })
    });    
})