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
        isDuplicatedKey: KnockoutObservable<boolean>;
        invalidKeyMessage: KnockoutObservable<string>;
        isInvalidKey: KnockoutComputed<boolean>;
    
        constructor() {
            this.title = ko.observable<string>(''); 
            this.description = ko.observable<string>('');
            this.actualView = ko.observable(0);
            this.toDoList = ko.observableArray<ITodoItem>([]);
            this.doneList = ko.observableArray<ITodoItem>([]);
            this.hasNoTitle = ko.observable<boolean>(false);
            this.hasNoDescription = ko.observable<boolean>(false);            
            this.isDuplicatedKey = ko.observable<boolean>(false);
            this.invalidKeyMessage = ko.observable<string>('');
            this.isInvalidKey = ko.computed(() =>{
                return this.hasNoTitle() || this.isDuplicatedKey();
            });                        
        }; 
        
        public init(){
            this.getTodoList();
        }
    
        public addNewItem(){
            if (this.hasValidData() && this.isUniqueKey()){
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

        private hasValidData(){
            this.hasNoTitle(this.title() === '');
            this.hasNoDescription(this.description() === '');
            if (this.hasNoTitle()){
                this.invalidKeyMessage('Insert a title');
            }
            return !this.hasNoTitle() && !this.hasNoDescription();
        }

        private isUniqueKey(){
            this.isDuplicatedKey(false);
            var value = localStorage.getItem(this.title());
            if (value){
                this.isDuplicatedKey(true);
                this.invalidKeyMessage('This title already was used');
            }else{
                value = localStorage.getItem(this.title() + '_Done');
                if (value){
                    this.isDuplicatedKey(true);
                    this.invalidKeyMessage('This title already was used');
                }
            }
            return !this.isDuplicatedKey();
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
            this.cleanData();
        }

        private cleanData() {
            this.title('');
            this.description('');
            this.hasNoTitle(false);
            this.hasNoDescription(false);
            this.isDuplicatedKey(false);
        }
    }
}