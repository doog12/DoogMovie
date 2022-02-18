module.exports = class UserDto {
    email: string;
    id: string;
    name: string;
    isActivated: boolean;

    constructor(model: any) {
        this.email = model.email
        this.id = model._id
        this.name = model.name
        this.isActivated = model.isActivated
    }
}