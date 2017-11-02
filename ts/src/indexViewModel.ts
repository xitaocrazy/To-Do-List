module main.modules {
    export interface ITodoItem{
        title: KnockoutObservable<string>;
        description: KnockoutObservable<string>;
    }
    
    export class IndexViewModel {
        title: KnockoutObservable<string>;
        description: KnockoutObservable<string>;
        actualView: KnockoutObservable<number>;
        toDoList: KnockoutObservableArray<ITodoItem>;
        doneList: KnockoutObservableArray<ITodoItem>;
        hasNoTitle: KnockoutObservable<boolean>;
        hasNoDescription: KnockoutObservable<boolean>;
    
        constructor() {
            this.title = ko.observable<string>(''); 
            this.description = ko.observable<string>('');
            this.actualView = ko.observable(0);
            this.toDoList = ko.observableArray<ITodoItem>([]);
            this.doneList = ko.observableArray<ITodoItem>([]);
            this.hasNoTitle = ko.observable<boolean>(false);
            this.hasNoDescription = ko.observable<boolean>(false);
            this.getTodoList();
        };           
    
        public addNewItem(){
            if (this.validateData()){
                this.insertNewItem();
            }            
        };

        public markAsDone = (item: ITodoItem) =>{
            this.toDoList.remove(item);
            this.doneList.push(item);
        };

        private getTodoList(){
            var a = {title:  ko.observable('Teste1'), description:  ko.observable('Teste1') };
            var b = {title:  ko.observable('Teste1'), description:  ko.observable('Teste1') };
            this.toDoList.push(a);
            this.toDoList.push(b);
        };

        private validateData(){
            this.hasNoTitle(this.title() === '');
            this.hasNoDescription(this.description() === '');
            return !this.hasNoTitle() && !this.hasNoDescription();
        }

        private insertNewItem(){
            var item = {
                title:  ko.observable(this.title()), 
                description:  ko.observable(this.description()) 
            };
            this.toDoList.push(item);
            this.title('');
            this.description('');
            this.hasNoTitle(false);
            this.hasNoDescription(false);
        }
    }
}