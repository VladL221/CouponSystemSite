export class Coupon {
    constructor(public title:string, public description:string, public startDate:Date, public endDate:Date,
        public amount:number, public price:number, public image:string,public category:string,public couponID?:number){}
}
