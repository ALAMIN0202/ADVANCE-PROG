/*import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class ModeratorDto {
   

        id: number;
    
        @IsString({ message: "Invalid Name" })
        @Matches(/^[a-z A-Z]+$/, { message: "Use Valid Fast Name Format" })
        @IsNotEmpty({ message: "Fast Name Must be Filled!" })
        @MaxLength(200)
        fastname: string;
    
        @IsString({ message: "Invalid Name" })
        @Matches(/^[a-zA-Z0-9@._$]+$/, { message: "Use Valid Last name Format" })
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
    
        adminID: number;


    }*/
    import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

    export class ModeratorDto {
        id: number;
    
        @IsString({ message: "Invalid Name" })
        @Matches(/^[a-zA-Z ]+$/, { message: "Use Valid Fast Name Format" })
        @IsNotEmpty({ message: "Fast Name Must be Filled!" })
        @MaxLength(200, { message: "Fast Name must be at most 200 characters" })
        fastname: string;
    
        @IsString({ message: "Invalid Name" })
        @Matches(/^[a-zA-Z0-9@._$]+$/, { message: "Use Valid Last Name Format" })
        @IsNotEmpty({ message: "Last Name Must be Filled!" })
        @MaxLength(200, { message: "Last Name must be at most 200 characters" })
        lastname: string;
    
        @IsEmail({}, { message: "Invalid E-mail!" })
        @IsNotEmpty({ message: "E-mail Must be Filled!" })
        email: string;
    
        @IsInt({ message: "Invalid Contact!" })
        contact: number;
    
        @IsString({ message: "Invalid Password!" })
        @IsNotEmpty({ message: "Password Must be Filled!" })
        password: string;
    
        adminID: number;
    
        constructor(dto: Partial<ModeratorDto>) {
            Object.assign(this, dto);
        }
    }
    