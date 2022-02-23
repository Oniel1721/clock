export default interface Alarm{
    id?:number;
    hour?: number;
    minute?: number;
    meridian?: "am"|"AM"|"pm"|"PM";
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
    isActive?: boolean;
}