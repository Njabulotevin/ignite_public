import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FormEvent, useState } from "react";

interface IApplication {
  _id: string;
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

export function ApplicationFormComponent({ actionData }: { actionData: any }) {
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [form, setform] = useState({
    full_name: "",
    surname: "",
    gender: "",
    grade: "",
    school: "",
    phone_number: "",
    // is_WhatsApp_number: whatsappEnabled,
    next_of_name: "",
    next_of_kin_phone_number: "",
    id_number: "",
    parent_name: "",
    parent_phone_number: "",
    parent_occupation: "",
    type_of_service: "",
    subscription_plan: "",
    payment_plan: "",
  });

  const [formRes, setFormRes] = useState({ success: false, message: "" });

  const handleChangeGender = (value: string) => {
    setform({ ...form, gender: value });
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    setform({ ...form, [target.name]: target.value.toUpperCase() });
  };

  const handleChangeGrade = (value: string) => {
    setform({ ...form, grade: value });
  };

  const handleChangeService = (value : string) =>{
    setform({...form, type_of_service: value})
  }

  const handleChangeSubcription = (value : string) =>{
    setform({...form, subscription_plan: value})
  }

  const handleChangePaymentPlan = (value : string) =>{
    setform({...form, payment_plan: value})
  }

  const currentStep = parseInt(searchParams.get("step") || "1", 10);
  const isSubmitting = navigation.state === "submitting";

  const nextStep = () => {
    setSearchParams((params) => {
      params.set("step", (currentStep + 1).toString());
      return params;
    });
  };

  const prevStep = () => {
    setSearchParams((params) => {
      params.set("step", (currentStep - 1).toString());
      return params;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      console.log("Form submitted successfully!");
      setFormRes({ success: true, message: "Form submitted successfully!" });
    }
  };

  return (
    <Form className="max-w-[60vw] mx-auto p-4" onSubmit={handleSubmit}>
      <Card>
        <CardHeader className=" ">
          <div className="flex items-center gap-4">
            <div className=" w-[60px] p-4 bg-[#274964] text-white flex items-center justify-center font-bold ">
              <h2 className="text-xl font-semibold">{currentStep}</h2>
            </div>
            <div className="bg-[#DD2025] text-white p-4 flex-1">
              <h2 className="text-xl font-semibold">
                {currentStep === 1 && "Personal Details"}
                {currentStep === 2 && "Contact Information"}
                {currentStep === 3 && "Parent/Guardian Details"}
                {currentStep === 4 && "Service Selection"}
              </h2>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 p-6">
          {currentStep === 1 && (
            <>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.full_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    name="surname"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.surname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Gender</Label>
                <RadioGroup
                  name="gender"
                  className="flex gap-4"
                  value={form.gender}
                  onValueChange={handleChangeGender}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    name="school"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.school}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select
                    name="grade"
                    value={form.grade}
                    onValueChange={handleChangeGrade}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {[7, 8, 9, 10, 11, 12].map((grade) => (
                        <SelectItem
                          key={grade}
                          value={grade.toString()}
                          // onChange={handleChange}
                        >
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="id_number">ID Number</Label>
                  <Input
                    id="id_number"
                    name="id_number"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.id_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.phone_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="whatsapp"
                    name="whatsapp"
                    checked={whatsappEnabled}
                    onChange={(e) => setWhatsappEnabled(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="whatsapp">
                    Is this Number available on WhatsApp?
                  </Label>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="next_of_name">Next of Kin Name</Label>
                  <Input
                    id="next_of_name"
                    name="next_of_name"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.next_of_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="next_of_kin_phone_number">
                    Next of Kin Phone Number
                  </Label>
                  <Input
                    id="next_of_kin_phone_number"
                    name="next_of_kin_phone_number"
                    type="tel"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.next_of_kin_phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="grid gap-4">
                <div className="">Person Responsible for payments</div>
                <div className="grid gap-2">
                  <Label htmlFor="parent_name">Parent/Guardian Name</Label>
                  <Input
                    id="parent_name"
                    name="parent_name"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.parent_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="parent_occupation">
                    Parent/Guardian Occupation
                  </Label>
                  <Input
                    id="parent_occupation"
                    name="parent_occupation"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.parent_occupation}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="parent_phone_number">
                    Parent/Guardian Phone Number
                  </Label>
                  <Input
                    id="parent_phone_number"
                    name="parent_phone_number"
                    type="tel"
                    className="border-b border-dotted border-t-0 border-x-0 rounded-none"
                    value={form.parent_phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="type_of_service">Type of Service</Label>
                <Select name="type_of_service" value={form.type_of_service} onValueChange={handleChangeService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="One-on-One">One-on-One</SelectItem>
                    <SelectItem value="Extra Classes">Extra Classes</SelectItem>
                    <SelectItem value="Online Classes">Online Classes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="subscription_plan">Subscription Plan</Label>
                  <Select name="subscription_plan" value={form.subscription_plan} onValueChange={handleChangeSubcription}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subscription" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6 Months">6 Months</SelectItem>
                      <SelectItem value="12 Months">12 Months</SelectItem>
                      <SelectItem value="Current Month - December">
                        Current Month - December
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payment_plan">Payment Plan</Label>
                  <Select name="payment_plan" value={form.payment_plan} onValueChange={handleChangePaymentPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Payment</SelectItem>
                      <SelectItem value="installment">Installment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 1 && (
            <Button type="button" onClick={prevStep} variant="outline">
              Previous
            </Button>
          )}
          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-[#DD2025] hover:bg-[#DD2025]/90"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-[#DD2025] hover:bg-[#DD2025]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </CardFooter>
      </Card>
      {formRes?.success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {formRes.message}
        </div>
      )}
    </Form>
  );
}
