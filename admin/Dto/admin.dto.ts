import { IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, Matches, MaxLength } from "class-validator";

export class AdminDto {
    id: number;

    @IsString({ message: "Invalid Name" })
    @Matches(/^[a-z A-Z]+$/, { message: "Use Valid FastName Format" })
    @IsNotEmpty({ message: "Fast Name Must be Filled!" })
    @MaxLength(200)
    fastname: string;

    @IsString({ message: "Invalid Name" })
    @Matches(/^[a-zA-Z0-9@._$]+$/, { message: "Use Valid lastname Format" })
    @IsNotEmpty({ message: "Last name Must be Filled!" })
    lastname: string;

    @IsEmail({}, { message: "Invalid E-mail!" })
    @IsNotEmpty({ message: "E-mail Must be Filled!" })
    email: string;

    @IsInt({ message: "Invalid Contact!" })
    contact: number;

    @IsString({ message: "Invalid Password!" })
    @IsNotEmpty({ message: "Password Must be Filled!" })
    password: string;

    filename: string;
}

export class AdminLoginDto {
    @IsEmail({}, { message: "Invalid E-mail!" })
    @IsNotEmpty({ message: "Email Must be Filled!" })
    email: string;

    @IsString({ message: "Invalid Password!" })
    @IsNotEmpty({ message: "Password Must be Filled!" })
    password: string;
}

export class DeleteQry {
    managerId: number;
    travelerId: number;
}

export class AdminUpdateDto {
    id: number;

    @IsString({ message: "Invalid Name" })
    @Matches(/^[a-z A-Z]+$/, { message: "Use Valid Name Format" })
    @MaxLength(200)
    name: string;

    @IsEmail({}, { message: "Invalid E-mail!" })
    email: string;

    @IsInt({ message: "Invalid Contact!" })
    contact: number;

    @IsString({ message: "Invalid Password!" })
    password: string;
}

export class AdminInfoDto {
    id: number;

    @IsString({ message: "Invalid Name" })
    @Matches(/^[a-z A-Z]+$/, { message: "Use Valid Name Format" })
    @MaxLength(200)
    name: string;

    @IsEmail({}, { message: "Invalid E-mail!" })
    email: string;

    @IsInt({ message: "Invalid Contact!" })
    contact: number;
}

export class AdminMessageDTO {
    @IsString({ message: "Sent a valid Message" })
    message: string;

    @IsString()
    subject : string;

    @IsEmail()
    receiver : string;
}