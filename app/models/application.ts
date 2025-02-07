export interface Iapplication {
    full_name: string;
    gender: string;
    grade: number;
    id_number: string;
    next_of_kin_phone_number: string;
    next_of_name: string;
    parent_name: string;
    parent_occupation: string;
    parent_phone_number: string;
    payment_plan: string;
    phone_number: string;
    school: string;
    subscription_plan: string;
    surname: string;
    type_of_service: string;
  }
  

  export interface serverApplication extends Iapplication{
    _id: string
  }