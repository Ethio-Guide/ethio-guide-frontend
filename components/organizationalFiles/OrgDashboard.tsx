"use client"
import { useState } from "react";
import { useCreateProcedureMutation, useCreateNoticeMutation } from "@/app/services/orgsApi";
// Placeholder hooks for future endpoints
// import { useGetOrgMetricsQuery, useGetOrgRecentActivityQuery, useGetOrgTopProceduresQuery } from "@/app/services/orgsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { IoMegaphoneOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { Building, Plus, Megaphone, FileText, MessageSquare } from "lucide-react";

export default function OrgDashboard() {
  // Modal state
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  // Form state
  const [procedureForm, setProcedureForm] = useState({ title: "", description: "" });
  const [noticeForm, setNoticeForm] = useState({ title: "", content: "" });


  // Replace with actual orgId from session or props
  const orgId = "demo-org-id";

  // Placeholder for future RTK Query hooks
  // const { data: metrics, isLoading: metricsLoading } = useGetOrgMetricsQuery(orgId);
  // const { data: recentActivity, isLoading: activityLoading } = useGetOrgRecentActivityQuery(orgId);
  // const { data: topProcedures, isLoading: topProceduresLoading } = useGetOrgTopProceduresQuery(orgId);

  // RTK Query mutations
  const [createProcedure, { isLoading: isCreatingProcedure }] = useCreateProcedureMutation();
  const [createNotice, { isLoading: isCreatingNotice }] = useCreateNoticeMutation();

  // Handlers
  const handleProcedureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProcedure({ orgId, ...procedureForm }).unwrap();
      setShowProcedureModal(false);
      setProcedureForm({ title: "", description: "" });
      alert("Procedure created!");
    } catch (err) {
      alert("Failed to create procedure");
    }
  };
  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNotice({ orgId, ...noticeForm }).unwrap();
      setShowNoticeModal(false);
      setNoticeForm({ title: "", content: "" });
      alert("Notice created!");
    } catch (err) {
      alert("Failed to create notice");
    }
  };

  // Example: Replace with metrics?.proceduresCount, etc. when endpoint is ready
  const stats = [
    {
      data: "-", // metrics?.proceduresCount ?? "-",
      description: "Procedures Managed",
      icon: (
        <div className="bg-gray-100 p-3 rounded-2xl ">
          <FileText className="w-6 h-6  text-[#3A6A8D] mb-2" />
        </div>
      ),
    },
    {
      data: "-", // metrics?.activeNoticesCount ?? "-",
      description: "Active Notices",
      icon: (
        <div className="bg-gray-100 p-3 rounded-2xl ">
          <IoMegaphoneOutline className="w-6 h-6 text-[#5E9C8D] mb-2" />
        </div>
      ),
    },
    {
      data: "-", // metrics?.pendingFeedbackCount ?? "-",
      description: "Pending Feedback",
      icon: (
        <div className="bg-gray-100 p-3 rounded-2xl ">
          <MdOutlineFeedback className="w-6 h-6 text-[#1C3B2E] mb-2" />
        </div>
      ),
    },
    {
      data: "-", // metrics?.userInteractionsCount ?? "-",
      description: "User Interactions",
      icon: (
        <div className="bg-gray-100 p-3 rounded-2xl ">
          <FaUsers className="w-6 h-6 text-[#1C3B2E] mb-2" />
        </div>
      ),
    },
  ];
  return (
    <div className="p-6 space-y-6 w-full">
      {/* Welcome Section */}
      <div className="relative bg-gradient-to-r bg-[#3A6A8D] text-white p-6 rounded-2xl shadow py-10">
        <h1 className="text-2xl font-semibold">Welcome back, this Organizaion</h1>
        <Building className="absolute top-5 right-5 size-20 text-primary-light" />
      </div>

      {/* Actions */}
      <div className="flex space-x-4 text-white">
        <Button
          className="flex items-center space-x-2 bg-[#3A6A8D] hover:bg-[#5C87A3]"
          onClick={() => setShowProcedureModal(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Procedure</span>
        </Button>
        <Button
          className="flex items-center space-x-2 bg-[#5E9C8D] hover:bg-[#7FB4A6]"
          onClick={() => setShowNoticeModal(true)}
        >
          <Megaphone className="w-4 h-4" />
          <span>Create Notice</span>
        </Button>
      </div>

      {/* Add New Procedure Modal */}
      {showProcedureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Procedure</h2>
            <form onSubmit={handleProcedureSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={procedureForm.title}
                  onChange={e => setProcedureForm(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={procedureForm.description}
                  onChange={e => setProcedureForm(f => ({ ...f, description: e.target.value }))}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowProcedureModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Notice Modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Create Notice</h2>
            <form onSubmit={handleNoticeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={noticeForm.title}
                  onChange={e => setNoticeForm(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={noticeForm.content}
                  onChange={e => setNoticeForm(f => ({ ...f, content: e.target.value }))}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowNoticeModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map(({ data, description, icon }) => (
          <Card key={data} className="shadow-sm border-gray-50">
            <CardContent className="flex items-center justify-between p-4 ">
              {icon}

              <p className="text-2xl font-bold">{data}</p>
            </CardContent>
            <CardContent>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <Card className="md:col-span-2 shadow-sm border-gray-50">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Replace with recentActivity?.items.map(...) when endpoint is ready */}
            <ul className="space-y-4">
              <li className="text-muted-foreground">No activity data yet.</li>
            </ul>
            <Button variant="link" className="mt-4" disabled>
              View all activities
            </Button>
          </CardContent>
        </Card>

        {/* Quick Overview */}
        <Card className="shadow-sm border-gray-50">
          <CardHeader>
            <CardTitle>Quick Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Replace with topProcedures?.map(...) when endpoint is ready */}
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-blue-600">●</span> Active Procedures: -
              </p>
              <p className="text-sm">
                <span className="text-[#5E9C8D]">●</span> Draft Procedures: -
              </p>
              <p className="text-sm">
                <span className="text-gray-600">●</span> Archived: -
              </p>
            </div>
            <div className="mt-4">
              <hr />
              <h4 className="text-sm font-medium mb-2 mt-5">Top Procedures</h4>
              <ul className="space-y-1 text-sm">
                <li>No data yet.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
