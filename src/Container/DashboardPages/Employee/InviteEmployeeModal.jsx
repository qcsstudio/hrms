import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import createAxios from "../../../utils/axios.config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const InviteEmployeeModal = ({ onClose }) => {

    const { token } = useSelector((state) => state.user)
  const [activeTab, setActiveTab] = useState("email");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate()

  const axiosInstance = createAxios(token);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      fullName,
      inviteType: activeTab,
      ...(activeTab === "email"
        ? { email }
        : { phone }),
    };

    try {
      const res = await axiosInstance.post(
        "/employee-invites",
        payload,
        {
          meta: { auth: "TENANT_AUTH" },
        }
      );

      console.log("Invite sent:", res.data);
      navigate('/Addingyourself')
      // onClose();
    } catch (error) {
      console.log("API Error:", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[560px] rounded-xl shadow-lg">

        {/* HEADER */}
        <div className="px-6 py-4 border-b flex justify-between items-start">
          <div>
            <h2 className="text-[18px] font-semibold text-[#101828]">
              Invite Employee
            </h2>
            <p className="text-[13px] text-[#667085] mt-1">
              Send a secure setup link so the employee can onboard themselves.
            </p>
          </div>

          <button onClick={onClose}>
            <IoClose className="text-xl text-gray-500" />
          </button>
        </div>

        {/* TABS */}
        <div className="px-6 pt-4">
          <div className="flex bg-[#F9FAFB] rounded-lg p-1">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === "email"
                  ? "bg-white shadow text-[#344054]"
                  : "text-[#667085]"
              }`}
            >
              Add By Mail
            </button>

            <button
              onClick={() => setActiveTab("phone")}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === "phone"
                  ? "bg-white shadow text-[#344054]"
                  : "text-[#667085]"
              }`}
            >
              Add by phone
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="text-sm text-[#344054] font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Choose Account"
              className="mt-1 w-full border border-[#D0D5DD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {activeTab === "email" && (
            <div>
              <label className="text-sm text-[#344054] font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Choose Account"
                className="mt-1 w-full border border-[#D0D5DD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <p className="text-[12px] text-[#667085] mt-1">
                Setup link will be sent to this email
              </p>

              <button className="text-[13px] text-[#2563EB] mt-1 font-medium">
                Send manually instead
              </button>
            </div>
          )}

          {activeTab === "phone" && (
            <div>
              <label className="text-sm text-[#344054] font-medium">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 XXXXX XXXXX"
                className="mt-1 w-full border border-[#D0D5DD] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-[#D0D5DD] rounded-lg text-[#344054]"
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium"
            onClick={handleSubmit}
          >
            Send Setup Link
          </button>
        </div>

      </div>
    </div>
  );
};

export default InviteEmployeeModal;
