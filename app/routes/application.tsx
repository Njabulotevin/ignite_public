import { ActionFunction } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import React from 'react'
import { ApplicationFormComponent } from '~/components/application-form'
import { sendApplication } from '~/services/application'


interface IApplication {
    _id: string
    full_name: string
    gender: string
    grade: number
    id_number: string
    next_of_kin_phone_number: string
    next_of_name: string
    parent_name: string
    parent_occupation: string
    parent_phone_number: string
    payment_plan: string
    phone_number: string
    school: string
    subscription_plan: string
    surname: string
    type_of_service: string
  }
  
  export const action: ActionFunction = async ({ request }) => {
    const formData = await request.json();
    const response = await sendApplication({...formData, grade: Number(formData["grade"])});

    console.log(response)
    
  
    return { success: true, message: "Application submitted successfully" };
  };


export default function Application() {
    const actionData = useActionData<typeof action>();
  return (
    <ApplicationFormComponent actionData={actionData}/>
  )
}
