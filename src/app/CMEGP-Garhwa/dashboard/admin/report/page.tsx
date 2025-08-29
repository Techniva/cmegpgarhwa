"use client";

import useAdminAuth from "@/hooks/useAdminAuth";
import { FileText, BarChart } from "lucide-react";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

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
}

export default function ReportPage() {
  const { session, status } = useAdminAuth();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch applicants for reports
  useEffect(() => {
    fetch("/api/applicants") // your existing API route
      .then(res => res.json())
      .then((data: Applicant[]) => setApplicants(data))
      .finally(() => setLoading(false));
  }, []);


  if (!session || session.user?.role !== "admin") return null;

  const total = applicants.length;
  const approved = applicants.filter(a => a.status === "Approved").length;
  const pending = applicants.filter(a => a.status === "Pending").length;
  const rejected = applicants.filter(a => a.status === "Rejected").length;

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Application Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Name", "DOB", "Aadhar", "Mobile", "Sanction Year", "Status"]],
      body: applicants.map(a => [
        a.id,
        a.applicantName,
        a.dob,
        a.aadhar,
        a.mobile,
        a.sanctionYear,
        a.status
      ])
    });

    doc.save("application_report.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      applicants.map(a => ({
        ID: a.id,
        Name: a.applicantName,
        DOB: a.dob,
        Aadhar: a.aadhar,
        Mobile: a.mobile,
        "Sanction Year": a.sanctionYear,
        Status: a.status
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applications");
    XLSX.writeFile(wb, "application_report.xlsx");
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Admin Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Reports */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-blue-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FileText className="h-5 w-5 text-blue-600" /> Application Reports
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Total Applications:</span> {total}</p>
            <p><span className="font-medium">Approved:</span> {approved}</p>
            <p><span className="font-medium">Pending:</span> {pending}</p>
            <p><span className="font-medium">Rejected:</span> {rejected}</p>
          </div>
        </div>

        {/* Performance Reports */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border-l-4 border-green-600 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <BarChart className="h-5 w-5 text-green-600" /> Performance Reports
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Monthly Reports:</span> N/A</p>
            <p><span className="font-medium">Quarterly Reports:</span> N/A</p>
            <p><span className="font-medium">Yearly Reports:</span> N/A</p>
          </div>
        </div>
      </div>
      <div className="space-x-4">
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
        >
          Export as PDF
        </button>
        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          Export as Excel
        </button>
      </div>
    </div>
  );
}
