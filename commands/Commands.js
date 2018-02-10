module.exports = class Commands {

    constructor(name, description, prefix, usage){
        this.name = name;
        this.description = description;
        this.prefix = prefix;
        this.usage = usage;
    }

    action(message, args){

    }

    error(){

    }

    help(){}

}
