export interface User {
    id: string;
    username: string;
    img: string;
    email: string;
    fullName: string;
    birthDay: number[];
    phone:string;
    gender:'Male'|'Female';
    accessToken: string;
    refreshToken: string;
    role: string;
}

export interface  ITestItem {
    name:string;
    start?:Date | undefined;
    duration?:number;
    numberQuestion?:number;
    turns?:number;
}

export interface IQuestion {
    id:string;
    index:number;
    question:string;
    answers:{
        id:string;
        value:string;
    }[];
    point:number;
    flag:boolean;
    isChoose:boolean;
}