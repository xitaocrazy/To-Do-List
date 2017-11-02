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
            if (typeof(Storage) !== "undefined") {
                localStorage.removeItem(item.title());
                item.title(item.title() + '_Done');
                localStorage.setItem(item.title(), item.description());
            }  else{
                item.title(item.title() + '_Done');
            }                                             
        };

        private getTodoList(){ 
            if (typeof(Storage) !== "undefined") {
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    var value = localStorage.getItem(key);
                    var item = {
                        title:  ko.observable(key), 
                        description:  ko.observable(value) 
                    };
                    
                    var isDone = /_Done$/i.test(key);
    
                    if (isDone){
                        this.doneList.push(item);
                    }else{
                        this.toDoList.push(item);
                    }
                }
            }                    
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
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem(item.title(), item.description());
            }             
            this.toDoList.push(item);
            this.title('');
            this.description('');
            this.hasNoTitle(false);
            this.hasNoDescription(false);
        }
    }
}