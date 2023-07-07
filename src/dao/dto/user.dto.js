export class CreateUserDto {
    constructor(user){
        this.first_name = user.nombre,
        this.last_name = user.apellido,
        this.email = user.email
    }
}

export class GetUserDto{
    constructor(user){
        this.fullName = user.first_name + " " + user.last_name,
        this.email = user.email,
        this.rol = user.rol
    }
}