module.exports = class Commands {

    constructor(name, description, syntax, prefix){
        this.name = name;
        this.description = description;
        this.syntax = syntax;
        this.prefix = prefix;
    }

    action(message){

    }

    error(){

    }

    help(){}

}
