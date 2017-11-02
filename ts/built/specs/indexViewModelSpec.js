describe("With an IndexViewModel", function () {
    var vm;
    beforeEach(function () {
        vm = new main.modules.IndexViewModel();
    });
    describe("when build the object", function () {
        it("shloud set title as expected", function () {
            expect(vm.title()).toEqual('');
        });
        it("shloud set description as expected", function () {
            expect(vm.description()).toEqual('');
        });
        it("shloud set actualView as expected", function () {
            expect(vm.description()).toEqual('');
        });
    });
});
//# sourceMappingURL=indexViewModelSpec.js.map