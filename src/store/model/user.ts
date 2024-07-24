import { makeAutoObservable } from "mobx";

class UserStore {
    constructor(){
        makeAutoObservable(this)
    }
    name: string = 'zhao';
    age: number = 18;
    changeUser = () => {
        this.name = 'wu'
        this.age = 20
    }
}

const user = new UserStore()

export default user
