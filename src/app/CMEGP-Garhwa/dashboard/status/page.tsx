"use client";
import { useEffect, useState } from "react";

interface Applicant {
  id: number;
  applicantName: string;
  dob: string;
  aadhar: string;
  mobile: string;
  sanctionYear: string;
  education: string;
  panCard: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;

  // Extended fields
  gender?: string;
  address?: string;
  block?: string;
  fatherOrHusband?: string;
  mother?: string;
  panchayat?: string;
  familyIncome?: string;
  bankAccount?: string;
  ifsc?: string;
  disbursementYear?: string;
  village?: string;
  residentialCert?: string;
  casteCert?: string;
  incomeCert?: string;
  category?: string;
  loanType?: string;
  businessName?: string;
  shopName?: string;
  guarantorName?: string;
  guarantorFather?: string;
  guarantorAddress?: string;
  guarantorOffice?: string;
  guarantorOccupation?: string;
  guarantorEmployerType?: string;
  guarantorDesignation?: string;
  guarantorMobile?: string;
  guarantorAadhar?: string;
  guarantorAffidavit?: string;
  marginAmountDraft?: string;
  corporation?: string;
  sanctionLetterNo?: string;
  serialNoCorporation?: string;
  sanctionAmount?: string;
  disbursementAmount?: string;
  firstChequeNo?: string;
  firstChequeDate?: string;
  secondChequeNo?: string;
  secondChequeDate?: string;
  dwoPaymentOrderNo?: string;
  firstInstallmentChequeNo?: string;
  secondInstallmentChequeNo?: string;
  subsidyStatus?: string;
  emiAmount?: string;
  emiDate?: string;
  duplicate?: boolean;
  remarks?: string;
  createdByUserId?: number;
}

export default function EmployeeStatusPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await fetch("/api/applicants");
        const text = await res.text(); // read raw response
        try {
          const data = JSON.parse(text) as Applicant[];
          setApplicants(data);
        } catch {
          setError("Failed to parse server response.");
          console.error("Raw response:", text);
        }
      } catch (err) {
        setError("Failed to fetch applicants.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>

      <div className="overflow-x-auto bg-white text-sm ">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 py-2">ID</th>
              <th className="border border-gray-300 px-2 py-2">Applicant Name</th>
              <th className="border border-gray-300 px-2 py-2">DOB</th>
              <th className="border border-gray-300 px-2 py-2">Aadhar</th>
              <th className="border border-gray-300 px-2 py-2">Mobile</th>
              <th className="border border-gray-300 px-2 py-2">Sanction Year</th>
              <th className="border border-gray-300 px-2 py-2">PAN</th>
              <th className="border border-gray-300 px-2 py-2">Details</th>
              <th className="border border-gray-300 px-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  No applications found
                </td>
              </tr>
            ) : (
              applicants.map(app => (
                <tr key={app.id} className={app.duplicate ? "bg-red-100 text-red-700 font-semibold" : ""}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.id}</td>
                  <td className="border border-gray-300 px-2 py-2">{app.applicantName}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.dob}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.aadhar}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.mobile}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.sanctionYear}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.panCard}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <button
                      onClick={() => setSelectedApplicant(app)}
                      className="px-2 py-1 bg-blue-600 text-white rounded-full"
                    >
                      View
                    </button>
                  </td>
                  <td className={`border border-gray-300 px-2 py-2 text-center font-semibold ${
                    app.status === "Approved" ? "text-green-600" :
                    app.status === "Rejected" ? "text-red-600" : "text-yellow-600"
                  }`}>{app.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Applicant Details Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSelectedApplicant(null)}
          />
          <div className="relative bg-white rounded-xl shadow-lg p-6 w-[1000px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Applicant Details</h2>

            {/* Applicant Info Section */}
            <div className="mb-4 border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Applicant Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <p><b>Name:</b> {selectedApplicant.applicantName}</p>
                <p><b>DOB:</b> {selectedApplicant.dob}</p>
                <p><b>Gender:</b> {selectedApplicant.gender}</p>
                <p><b>Aadhar:</b> {selectedApplicant.aadhar}</p>
                <p><b>Mobile:</b> {selectedApplicant.mobile}</p>
                <p><b>PAN:</b> {selectedApplicant.panCard}</p>
                <p><b>Education:</b> {selectedApplicant.education}</p>
                <p><b>Address:</b> {selectedApplicant.address}</p>
                <p><b>Block:</b> {selectedApplicant.block}</p>
                <p><b>Village:</b> {selectedApplicant.village}</p>
                <p><b>Panchayat:</b> {selectedApplicant.panchayat}</p>
                <p><b>Family Income:</b> {selectedApplicant.familyIncome}</p>
                <p><b>Father/Husband:</b> {selectedApplicant.fatherOrHusband}</p>
                <p><b>Mother:</b> {selectedApplicant.mother}</p>
                <p><b>Sanction Year:</b> {selectedApplicant.sanctionYear}</p>
              </div>
            </div>

            {/* You can copy Loan, Guarantor, Corporation & Payment, System Info sections here as read-only */}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
