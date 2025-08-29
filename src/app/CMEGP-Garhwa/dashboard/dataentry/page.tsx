"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

// --- Initial form values ---
export const initialValues = {
  // Step 1: Applicant Details
  applicantName: "", dob: "", education: "", panCard: "", gender: "", mobile: "", address: "",
  block: "", fatherOrHusband: "", mother: "", panchayat: "", familyIncome: "", bankAccount: "", ifsc: "",
  sanctionYear: "", disbursementYear: "", village: "", aadhar: "", residentialCert: "", casteCert: "", incomeCert: "",
  // Step 2: Loan Details
  category: "", loanType: "", businessName: "", shopName: "",
  // Step 3: Guarantor Details
  guarantorName: "", guarantorFather: "", guarantorAddress: "", guarantorOffice: "", guarantorOccupation: "",
  guarantorEmployerType: "", guarantorDesignation: "", guarantorMobile: "", guarantorAadhar: "", guarantorAffidavit: "",
  // Step 4: Corporation / Payment
  marginAmountDraft: "", corporation: "", sanctionLetterNo: "", serialNoCorporation: "", sanctionAmount: "",
  disbursementAmount: "", firstChequeNo: "", firstChequeDate: "", secondChequeNo: "", secondChequeDate: "",
  dwoPaymentOrderNo: "", firstInstallmentChequeNo: "", secondInstallmentChequeNo: "", subsidyStatus: "",
  emiAmount: "", emiDate: "",
};

type LoanFormValues = typeof initialValues;

// --- Validation schemas ---
const validationSchemas = [
  // Step 1: Applicant
  Yup.object({
    applicantName: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
    education: Yup.string(),
    panCard: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    mobile: Yup.string().matches(/^\d{10}$/, "Must be 10 digits").required("Required"),
    address: Yup.string().required("Required"),
    block: Yup.string().required("Required"),
    fatherOrHusband: Yup.string(),
    mother: Yup.string(),
    panchayat: Yup.string().required("Required"),
    familyIncome: Yup.string().required("Required"),
    bankAccount: Yup.string().required("Required"),
    ifsc: Yup.string().required("Required"),
    sanctionYear: Yup.string().required("Required"),
    disbursementYear: Yup.string().required("Required"),
    village: Yup.string(),
    aadhar: Yup.string().matches(/^\d{12}$/, "Must be 12 digits").required("Required"),
    residentialCert: Yup.string().required("Required"),
    casteCert: Yup.string(),
    incomeCert: Yup.string(),
  }),
  // Step 2: Loan
  Yup.object({
    category: Yup.string().required("Required"),
    loanType: Yup.string().required("Required"),
    businessName: Yup.string().when("loanType", {
      is: "Business Loan",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    shopName: Yup.string().when("loanType", {
      is: "Business Loan",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  // Step 3: Guarantor
  Yup.object({
    guarantorName: Yup.string().required("Required"),
    guarantorFather: Yup.string(),
    guarantorAddress: Yup.string(),
    guarantorOffice: Yup.string(),
    guarantorOccupation: Yup.string().required("Required"),
    guarantorEmployerType: Yup.string(),
    guarantorDesignation: Yup.string(),
    guarantorMobile: Yup.string().matches(/^\d{10}$/, "Must be 10 digits").required("Required"),
    guarantorAadhar: Yup.string().matches(/^\d{12}$/, "Must be 12 digits").required("Required"),
    guarantorAffidavit: Yup.string().required("Required"),
  }),
  // Step 4: Corporation / Payment
  Yup.object({
    marginAmountDraft: Yup.string(),
    corporation: Yup.string(),
    sanctionLetterNo: Yup.string(),
    serialNoCorporation: Yup.string(),
    sanctionAmount: Yup.string(),
    disbursementAmount: Yup.string(),
    firstChequeNo: Yup.string(),
    firstChequeDate: Yup.string(),
    secondChequeNo: Yup.string(),
    secondChequeDate: Yup.string(),
    dwoPaymentOrderNo: Yup.string(),
    firstInstallmentChequeNo: Yup.string(),
    secondInstallmentChequeNo: Yup.string(),
    subsidyStatus: Yup.string(),
    emiAmount: Yup.string(),
    emiDate: Yup.string(),
  }),
];

export default function LoanApplicationWizard() {
  const [step, setStep] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const inputClass = "border border-gray-300 p-2 rounded w-full";
  const sectionClass = "bg-white shadow-md rounded-xl p-4 space-y-3 border-l-4 hover:shadow-lg transition";

  const handleNext = async (validateForm: any, setTouched: any) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) setStep(s => s + 1);
    else setTouched(errors);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Loan Application Form</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[step]}
        onSubmit={async (values: LoanFormValues, actions: FormikHelpers<LoanFormValues>) => {
          try {
            const res = await fetch("/api/loan/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            const result = await res.json();
            if (res.ok){
              alert("Form submitted successfully! Loan ID: " + result.id);
              actions.resetForm(); // <-- Reset the form to initial values
              setStep(0);          // <-- Reset to Step 1
              router.push("/CMEGP-Garhwa/dashboard/dataentry"); // <--- Redirect after submission
            } 
            else alert(result.error || "Failed to submit form");
          } catch (err) {
            //console.error(err);
            alert("Something went wrong!");
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ values, validateForm, setTouched, submitForm }) => (
          <Form className="space-y-6">
            {/* ---------- Step 1: Applicant ---------- */}
            {step === 0 && (
              <div className={`${sectionClass} border-blue-600`}>
                <h2 className="text-lg font-semibold">Applicant Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: "applicantName", label: "Name of Applicant" },
                    { name: "dob", label: "Date of Birth", type: "date" },
                    { name: "education", label: "Educational Qualification" },
                    { name: "panCard", label: "Pan Card Number" },
                    { name: "gender", label: "Gender", as: "select", options: ["Male","Female","Other"] },
                    { name: "mobile", label: "Mobile Number" },
                    { name: "address", label: "Address" },
                    { name: "block", label: "Block" },
                    { name: "fatherOrHusband", label: "Father/Husband" },
                    { name: "mother", label: "Mother" },
                    { name: "panchayat", label: "Panchayat" },
                    { name: "familyIncome", label: "Family Income" },
                    { name: "bankAccount", label: "Bank Account Number" },
                    { name: "ifsc", label: "IFSC Code" },
                    { name: "sanctionYear", label: "Sanction Year" },
                    { name: "disbursementYear", label: "Disbursement Year" },
                    { name: "village", label: "Village" },
                    { name: "aadhar", label: "Aadhar Number" },
                    { name: "residentialCert", label: "Residential Certificate Serial No" },
                    { name: "casteCert", label: "Caste Certificate Serial No" },
                    { name: "incomeCert", label: "Income Certificate Serial No" },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-sm">{field.label}</label>
                      {field.as === "select" ? (
                        <Field as="select" name={field.name} className={inputClass}>
                          <option value="">Select</option>
                          {field.options!.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </Field>
                      ) : (
                        <Field name={field.name} type={field.type || "text"} className={inputClass} />
                      )}
                      <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------- Step 2: Loan ---------- */}
            {step === 1 && (
              <div className={`${sectionClass} border-green-600`}>
                <h2 className="text-lg font-semibold">Loan Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label>Category of Applicant</label>
                    <Field as="select" name="category" className={inputClass}>
                      <option value="">Select Category</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="Minority">Minority</option>
                      <option value="PH">PH</option>
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <label>Type of Loan</label>
                    <Field as="select" name="loanType" className={inputClass}>
                      <option value="">Select Loan Type</option>
                      <option value="Minor Loan">Minor Loan</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Vehicle Loan">Vehicle Loan</option>
                    </Field>
                    <ErrorMessage name="loanType" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <label>Name of Business</label>
                    <Field name="businessName" className={inputClass} />
                    <ErrorMessage name="businessName" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label>Name of Shop</label>
                    <Field name="shopName" className={inputClass} />
                    <ErrorMessage name="shopName" component="div" className="text-red-500 text-xs" />
                  </div>
                </div>
              </div>
            )}

            {/* ---------- Step 3: Guarantor ---------- */}
            {step === 2 && (
              <div className={`${sectionClass} border-purple-600`}>
                <h2 className="text-lg font-semibold">Guarantor Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: "guarantorName", label: "Guarantor Name" },
                    { name: "guarantorFather", label: "Guarantor Father&apos;s Name" },
                    { name: "guarantorAddress", label: "Guarantor Address" },
                    { name: "guarantorOffice", label: "Guarantor Office Address" },
                    { name: "guarantorOccupation", label: "Occupation" },
                    { name: "guarantorEmployerType", label: "Nature of Employer", as: "select", options: ["Government","Semi-government","Private","Self-employed","Other"] },
                    { name: "guarantorDesignation", label: "Designation" },
                    { name: "guarantorMobile", label: "Mobile Number" },
                    { name: "guarantorAadhar", label: "Aadhar Number" },
                    { name: "guarantorAffidavit", label: "Affidavit Number" },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-sm">{field.label}</label>
                      {field.as === "select" ? (
                        <Field as="select" name={field.name} className={inputClass}>
                          <option value="">Select</option>
                          {field.options!.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </Field>
                      ) : (
                        <Field name={field.name} className={inputClass} />
                      )}
                      <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------- Step 4: Corporation & Payment ---------- */}
            {step === 3 && (
              <div className={`${sectionClass} border-orange-600`}>
                <h2 className="text-lg font-semibold">Corporation & Payment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: "marginAmountDraft", label: "Margin Amount - Bank Draft No" },
                    { name: "corporation", label: "Corporation", as: "select", options: ["SC/BC","ST","Minority"] },
                    { name: "sanctionLetterNo", label: "Corporation Sanction Letter No" },
                    { name: "serialNoCorporation", label: "Serial No in Corporation Letter" },
                    { name: "sanctionAmount", label: "Sanction Amount" },
                    { name: "disbursementAmount", label: "Disbursement Amount" },
                    { name: "firstChequeNo", label: "First Installment Disbursement Cheque Number" },
                    { name: "firstChequeDate", label: "First Installment Disbursement Cheque Date", type: "date" },
                    { name: "secondChequeNo", label: "Second Installment Disbursement Cheque Number" },
                    { name: "secondChequeDate", label: "Second Installment Disbursement Cheque Date", type: "date" },
                    { name: "dwoPaymentOrderNo", label: "DWO Payment Order No" },
                    { name: "firstInstallmentChequeNo", label: "First Installment Cheque No" },
                    { name: "secondInstallmentChequeNo", label: "Second Installment Cheque No" },
                    { name: "subsidyStatus", label: "Subsidy Avail/Reject" },
                    { name: "emiAmount", label: "Loan Repayment EMI - Amount" },
                    { name: "emiDate", label: "Loan Repayment EMI - Date", type: "date" },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-sm">{field.label}</label>
                      {field.as === "select" ? (
                        <Field as="select" name={field.name} className={inputClass}>
                          <option value="">Select</option>
                          {field.options!.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </Field>
                      ) : (
                        <Field name={field.name} type={field.type || "text"} className={inputClass} />
                      )}
                      <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------- Step 5: Review ---------- */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Review & Submit</h2>
                {[
                  { title: "Applicant Details", keys: Object.keys(initialValues).slice(0, 22) },
                  { title: "Loan Details", keys: Object.keys(initialValues).slice(22, 26) },
                  { title: "Guarantor Details", keys: Object.keys(initialValues).slice(26, 36) },
                  { title: "Corporation & Payment", keys: Object.keys(initialValues).slice(36) },
                ].map(section => (
                  <div key={section.title} className="bg-white shadow rounded-xl p-4 border-l-4 border-gray-600">
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                      {section.keys.map(key => (
                        <p key={key}>
                          <span className="font-medium">{key.replace(/([A-Z])/g, ' $1')}:</span>{" "}
                          {values[key as keyof LoanFormValues]}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---------- Navigation Buttons ---------- */}
            <div className="flex justify-between">
              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)} className="bg-gray-500 text-white px-4 py-2 rounded-full">
                  Back
                </button>
              )}
              {step < 4 && (
                <button type="button" onClick={() => handleNext(validateForm, setTouched)} className="bg-blue-600 text-white px-4 py-2 rounded-full">
                  Save & Next
                </button>
              )}
              {step === 4 && (
                <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-full" onClick={() => setShowConfirm(true)}>
                  Submit
                </button>
              )}

              {/* --- Confirmation Modal --- */}
              {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="relative bg-white rounded-xl shadow-lg p-6 w-96">
                    <h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
                    <p className="mb-6">Do you want to save and submit the form?</p>
                    <div className="flex justify-end gap-4">
                      <button className="px-4 py-2 rounded bg-gray-300" onClick={() => setShowConfirm(false)}>Cancel</button>
                      <button className="px-4 py-2 rounded bg-green-600 text-white" onClick={() => { setShowConfirm(false); submitForm(); }}>
                        Yes, Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
