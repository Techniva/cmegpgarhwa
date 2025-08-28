"use client";

import useAdminAuth from "@/hooks/useAdminAuth";
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
  //sanctionYear?: string;
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

export default function SanctionPage() {
  const { session, status } = useAdminAuth();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [duplicatesMap, setDuplicatesMap] = useState<Record<string, boolean>>({});
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/applicants")
        .then(res => res.json())
        .then((data: Applicant[]) => {
          setApplicants(data);

          // Identify duplicates
          const map: Record<string, number> = {};
          data.forEach(app => {
            const key = `${app.applicantName}-${app.dob}-${app.aadhar}`;
            map[key] = (map[key] || 0) + 1;
          });
          const dupMap: Record<string, boolean> = {};
          Object.keys(map).forEach(key => {
            if (map[key] > 1) dupMap[key] = true;
          });
          setDuplicatesMap(dupMap);
        })
        .finally(() => setLoading(false));
    }
  }, [status]);

  const handleAction = async (id: number, action: "Approved" | "Rejected") => {
    try {
      const res = await fetch(`/api/applicants/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });
      if (res.ok) {
        setApplicants(prev =>
          prev.map(app => (app.id === id ? { ...app, status: action } : app))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

 
  return (
    <div className="px-2">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Sanction</h1>
      <p className="text-gray-700">
        Welcome {session?.user?.name}, this is the <b>Admin-only Sanction Page</b>.
      </p>

      <div className="mt-6 overflow-x-auto bg-white text-sm">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 py-2">ID</th>
              <th className="border border-gray-300 px-2 py-2">Applicant Name</th>
              <th className="border border-gray-300 px-2 py-2">DOB</th>
              <th className="border border-gray-300 px-2 py-2">Aadhar</th>
              <th className="border border-gray-300 px-2 py-2">Mobile</th>
              <th className="border border-gray-300 px-2 py-2">Sanction Year</th>
              <th className="border border-gray-300 px-2 py-2">Pan Card</th>
              <th className="border border-gray-300 px-2 py-2">Details</th>
              {session?.user?.role === "employee" && <th className="border border-gray-300 px-2 py-2">Status</th>}
              {/* Admin Action */}
              {session?.user?.role === "admin" && <th className="border border-gray-300 px-2 py-2">Action</th>}
             
            </tr>
          </thead>
          <tbody>
            {applicants.map(app => {
              const key = `${app.applicantName}-${app.dob}-${app.aadhar}`;
              const isDuplicate = duplicatesMap[key];
              return (
                <tr
                  key={app.id}
                  className={isDuplicate ? "bg-red-100 text-red-700 font-semibold" : ""}
                >
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.id}</td>
                  <td className="border border-gray-300 px-2 py-2">{app.applicantName}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.dob}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.aadhar}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.mobile}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.sanctionYear}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">{app.panCard}</td>

                  {/* Details Button */}
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <button
                      onClick={() => setSelectedApplicant(app)}
                      className="px-2 py-1 bg-blue-600 text-white rounded-full"
                    >
                      View
                    </button>
                  </td>

                  {/* Employee Status */}
                  {session?.user?.role === "employee" && (
                    <td className="border border-gray-300 px-2 py-2 text-center">{app.status}</td>
                  )}

                  {/* Admin Action */}
                  {session?.user?.role === "admin" && (
                    <td className="border border-gray-300 px-2 py-2 space-x-2 text-center">
                      <button
                        onClick={() => handleAction(app.id, "Approved")}
                        className="px-2 py-1 bg-green-600 text-white rounded-full"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(app.id, "Rejected")}
                        className="px-2 py-1 bg-red-600 text-white rounded-full"
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
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

            {/* Grouped sections (Applicant, Loan, Guarantor, etc.) */}
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

            {/* Loan Info */}
            <div className="mb-4 border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Loan Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <p><b>Category:</b> {selectedApplicant.category}</p>
                <p><b>Loan Type:</b> {selectedApplicant.loanType}</p>
                <p><b>Business Name:</b> {selectedApplicant.businessName}</p>
                <p><b>Shop Name:</b> {selectedApplicant.shopName}</p>
              </div>
            </div>

            {/* Guarantor Info */}
            <div className="mb-4 border-l-4 border-purple-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Guarantor Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <p><b>Name:</b> {selectedApplicant.guarantorName}</p>
                <p><b>Father's Name:</b> {selectedApplicant.guarantorFather}</p>
                <p><b>Address:</b> {selectedApplicant.guarantorAddress}</p>
                <p><b>Office:</b> {selectedApplicant.guarantorOffice}</p>
                <p><b>Occupation:</b> {selectedApplicant.guarantorOccupation}</p>
                <p><b>Employer Type:</b> {selectedApplicant.guarantorEmployerType}</p>
                <p><b>Designation:</b> {selectedApplicant.guarantorDesignation}</p>
                <p><b>Mobile:</b> {selectedApplicant.guarantorMobile}</p>
                <p><b>Aadhar:</b> {selectedApplicant.guarantorAadhar}</p>
                <p><b>Affidavit No:</b> {selectedApplicant.guarantorAffidavit}</p>
              </div>
            </div>

            {/* Corporation & Payment */}
            <div className="mb-4 border-l-4 border-orange-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Corporation & Payment</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <p><b>Corporation:</b> {selectedApplicant.corporation}</p>
                <p><b>Sanction Letter No:</b> {selectedApplicant.sanctionLetterNo}</p>
                <p><b>Sanction Amount:</b> {selectedApplicant.sanctionAmount}</p>
                <p><b>Disbursement Amount:</b> {selectedApplicant.disbursementAmount}</p>
                <p><b>First Cheque No:</b> {selectedApplicant.firstChequeNo}</p>
                <p><b>First Cheque Date:</b> {selectedApplicant.firstChequeDate}</p>
                <p><b>Second Cheque No:</b> {selectedApplicant.secondChequeNo}</p>
                <p><b>Second Cheque Date:</b> {selectedApplicant.secondChequeDate}</p>
                <p><b>EMI Amount:</b> {selectedApplicant.emiAmount}</p>
                <p><b>EMI Date:</b> {selectedApplicant.emiDate}</p>
                <p><b>Subsidy Status:</b> {selectedApplicant.subsidyStatus}</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="mb-4 border-l-4 border-gray-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">System Info</h3>
              <p><b>Status:</b> {selectedApplicant.status}</p>
              <p><b>Duplicate:</b> {selectedApplicant.duplicate ? "Yes" : "No"}</p>
              <p><b>Remarks:</b> {selectedApplicant.remarks || "-"}</p>
              <p><b>Created By:</b>{selectedApplicant.createdByUserId}</p>
              <p><b>Created At:</b> {new Date(selectedApplicant.createdAt).toLocaleString()}</p>
            </div>

            <div className="flex justify-end">
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
