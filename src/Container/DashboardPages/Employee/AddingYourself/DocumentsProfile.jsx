import React, { useState } from "react";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const DocumentsProfile = ({ onSuccess, onPrevious }) => {
    const { completeData } = useSelector(
        (state) => state.employeeInvite
    )

    const [formData, setFormData] = useState({
        documentType: "Pan Card",

        // PAN
        panNumber: "",
        panName: "",
        panDob: "",
        panMiddleName: "",

        // Voter
        voterIdNumber: "",
        voterName: "",
        voterDob: "",
        fatherName: "",

        // Driving
        licenseNumber: "",
        issueDate: "",
        licenseExpiryDate: "",

        // ESIC
        esicNumber: "",

        // PF
        pfNumber: "",
        uanNumber: "",
        nomineeName: "",

        // Passport ✅
        passportNumber: "",
        nameAsPerPassport: "",
        placeOfBirth: "",
        passportDob: "",
        placeOfIssue: "",
        passportExpiryDate: "",



        fileUrl: null,
    });

    const [popup, setPopup] = useState(false)

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const getBasePayload = () => ({
        type: "",
        documentNumber: "",
        nameOnDocument: "",
        fatherName: null,
        dateOfBirth: null,
        issueDate: null,
        expiryDate: null,
        uanNumber: null,
        nomineeName: null,
        file: null,
    });



    const buildDocumentPayload = (formData) => {
        const payload = getBasePayload();

        payload.file = formData.fileUrl;

        switch (formData.documentType) {
            case "Pan Card":
                payload.type = "PAN";
                payload.documentNumber = formData.panNumber;
                payload.nameOnDocument = formData.panName;
                payload.fatherName = null;
                payload.dateOfBirth = formData.panDob;
                break;

            case "Voter Id Card":
                payload.type = "VOTER";
                payload.documentNumber = formData.voterIdNumber;
                payload.nameOnDocument = formData.voterName;
                payload.fatherName = formData.fatherName;
                payload.dateOfBirth = formData.voterDob;
                break;

            case "Driving License":
                payload.type = "DRIVING_LICENSE";
                payload.documentNumber = formData.licenseNumber;
                payload.issueDate = formData.issueDate || null;
                payload.expiryDate = formData.licenseExpiryDate;
                break;

            case "Provident Fund":
                payload.type = "PF";
                payload.documentNumber = formData.pfNumber;
                payload.uanNumber = formData.uanNumber;
                payload.nomineeName = formData.nomineeName;
                break;

            case "Passport":
                payload.type = "PASSPORT";
                payload.documentNumber = formData.passportNumber;
                payload.nameOnDocument = formData.nameAsPerPassport;
                payload.dateOfBirth = formData.passportDob;
                payload.expiryDate = formData.passportExpiryDate;
                break;

            case "ESIC":
                payload.type = "ESIC";
                payload.documentNumber = formData.esicNumber;
                break;

            default:
                return null;
        }

        return payload;
    };

    const axiosInstance = createAxios()

    const handleSubmit = async () => {
        const payload = buildDocumentPayload(formData);
        if (!payload) return;

        const formDataToSend = new FormData();

        Object.keys(payload).forEach((key) => {
            if (payload[key] !== undefined && payload[key] !== null) {
                formDataToSend.append(key, payload[key]);
            }
        });

        const res = await axiosInstance.put(
            `/employees/${completeData.employeeId}/document`,
            {formDataToSend}

        );
        if (res.status === 200) {
            setPopup(true)
        }


    };


    const handleSkip = () => {
        setPopup(true)
    }
    return (
        <div className="w-full bg-white  rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Documents</h2>
            <hr className="mb-4" />

            {/* Select Document Type */}
            <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1">
                    Select Document Type
                </label>
                <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                >
                    <option>Pan Card</option>
                    <option>Voter Id Card</option>
                    <option>Driving License</option>
                    <option>ESIC</option>
                    <option>Provident Fund</option>
                    <option>Passport</option>
                </select>
            </div>

            {/* ================= PAN CARD ================= */}
            {formData.documentType === "Pan Card" && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <InputField label="PAN Card Number" name="panNumber" />
                        <InputField label="Name as per PAN Card" name="panName" />
                        <DateField label="Date of Birth as per PAN Card" name="panDob" />
                    </div>

                    <InputField
                        label="Middle Name as per PAN Card"
                        name="panMiddleName"
                    />
                </>
            )}

            {/* ================= VOTER ID ================= */}
            {formData.documentType === "Voter Id Card" && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <InputField label="Voter ID Number" name="voterIdNumber" />
                        <InputField label="Name as per Voter Card" name="voterName" />
                        <DateField label="Date of Birth as per Voter Card" name="voterDob" />
                    </div>

                    <InputField
                        label="Father's Name as per Voter ID Card"
                        name="fatherName"
                    />
                </>
            )}

            {/* ================= DRIVING LICENSE ================= */}
            {formData.documentType === "Driving License" && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <InputField label="Driving License Number" name="licenseNumber" />
                        <DateField label="Date of Issue (Optional)" name="issueDate" />
                        <DateField label="Expiry Date" name="licenseExpiryDate" />
                    </div>
                </>
            )}

            {/* ================= ESIC ================= */}
            {formData.documentType === "ESIC" && (
                <>
                    <InputField label="ESIC Insurance Number" name="esicNumber" />
                </>
            )}

            {/* ================= PF ================= */}
            {formData.documentType === "Provident Fund" && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <InputField label="PF Number" name="pfNumber" />
                        <InputField label="UAN Number" name="uanNumber" />
                        <InputField label="Nominee's Name" name="nomineeName" />
                    </div>
                </>
            )}
            {/* ================= PASSPORT ================= */}
            {formData.documentType === "Passport" && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <InputField
                            label="Passport Number"
                            name="passportNumber"
                        />
                        <InputField
                            label="Name as per Passport"
                            name="nameAsPerPassport"
                        />
                        <InputField
                            label="Place of Birth"
                            name="placeOfBirth"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <DateField
                            label="Date of Birth"
                            name="passportDob"
                        />
                        <InputField
                            label="Place of Issue"
                            name="placeOfIssue"
                        />
                        <DateField
                            label="Expiry Date"
                            name="passportExpiryDate"
                        />
                    </div>
                </>
            )}

            {/* Upload Document (COMMON) */}
            <div className="mt-2">
                <label className="block text-xs text-gray-600 mb-1">
                    Upload your Document
                </label>
                <div className="flex items-center justify-between border rounded-md px-3 py-2">
                    <span className="text-sm text-gray-400">
                        {formData.fileUrl
                            ? formData.fileUrl.name
                            : "No file chosen"}
                    </span>

                    <label className="cursor-pointer text-sm border px-3 py-1 rounded-md">
                        Browse
                        <input
                            type="file"
                            name="fileUrl"
                            onChange={handleChange}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {/* Buttons */}
            <div className='flex justify-between sticky bottom-0 mt-5'>

                <div>
                    <button type='button' className='border px-4 py-2 border-[#D1D3D8] bg-[#E2E4E7] rounded-md' onClick={onPrevious}>previous</button>
                </div>

                <div className='flex gap-2'>
                    <button type='button' onClick={handleSkip} className='border px-4 py-2 border-[#D1D3D8] bg-[#E2E4E7] rounded-md'>Skip</button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
                        Save & Continue
                    </button>
                </div>


            </div>

            {/* popup */}
            {popup &&
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                    <div className="bg-white w-[560px] rounded-t-xl px-6 py-5">
                        <h1>Application Received
                        </h1>
                        <p> Your details are being reviewed by HR.
                            You'll receive access credentials after approval.</p>
                    </div>
                </div>
            }


        </div>
    );

    /* ===== REUSABLE FIELDS (UI SAME) ===== */
    function InputField({ label, name }) {
        return (
            <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1">{label}</label>
                <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder="Choose Account"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                />
            </div>
        );
    }

    function DateField({ label, name }) {
        return (
            <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1">{label}</label>
                <input
                    type="date"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                />
            </div>
        );
    }
};

export default DocumentsProfile;
