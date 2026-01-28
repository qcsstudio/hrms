import React, { useRef, useState } from 'react'
import discardicon from "/assets/Images/discardicon.png"
import { FiPlus, FiUpload } from 'react-icons/fi'

const EmployeeHr = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        workEmail: "",
        Phone: "",
        employeeId: "",
        department: "",
        Designaition: "",
        // reportingManagrr:"",
        location: "",
        joiningDate: "",
        EmployeeTyepe: "",
        Shift: "",
        ProbationEndDate: "",
        systemRole: "",
        reportingManagrr: "",
        locationBranch: "",
        whitelabel: false

    })
    const [importOpen, setImportOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [sendInvite, setSendInvite] = useState(false)
    const fileRef = useRef(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleImport = () => {
        if (!file) {
            alert("Please upload a CSV/XLSX file")
            return
        }

        console.log("Uploaded file:", file)
        console.log("Send invite:", sendInvite)

        setImportOpen(false)
        setFile(null)
        setSendInvite(false)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
        console.log(formData)
        setFormData({
            fullName: "",
            workEmail: "",
            Phone: "",
            employeeId: "",
            department: "",
            Designaition: "",

            location: "",
            joiningDate: "",
            EmployeeTyepe: "",
            Shift: "",
            ProbationEndDate: "",
            systemRole: "",
            reportingManagrr: "",
            locationBranch: ""
        })
    }



    return (
        <form onSubmit={handleSubmit}>
            <div className=' p-[20px]'>
                <div className='flex  justify-between sticky top-0 bg-[#F8F9FA] h-[60px]'>
                    <div className=''>
                        <h1 className='font-bold text-[20px] text-[#212529]'>Add Employee</h1>
                        <p className='text-[#000000]/35 text-[12px]'>Create an employee profile, assign job details, and send login invite.</p>
                    </div>
                    <div className='w-[300px] flex gap-[30px]'>
                        <button className='border border-[#E7EBEd] bg-[#E4E9EE4D] text-[#344054] w-[167px] h-[40px] font-medium rounded-md flex items-center justify-center gap-2' onClick={() => setImportOpen(true)} ><FiPlus /> Import Employees</button>
                        <div className='border border-[#E7EBEd] items-center justify-evenly flex bg-[#E4E9EE4D] font-medium text-[#344054] w-[100px] h-[40px] rounded-md' >
                            <button >Cancel</button>
                            <img className='w-[20px] h-[20px]' src={discardicon} />

                        </div>
                    </div>
                </div>

                <div className='mt-[30px] '>
                    <h1 className='border-b-2 text-[14px]  border-[#E7EBEd] font-semibold text-[#344054]'>Basic Info:</h1>

                    <div>
                        <div className='flex gap-3'>
                            <div className='w-[100%]  box-border '>


                                <h1 className='mt-[9px] text-[15px]'>Full Name</h1>
                                <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' value={formData.fullName} name='fullName' onChange={handleChange}></input>
                            </div>
                            <div className='w-[100%]'>
                                <h1 className='mt-[9px] text-[15px]'>Work Email</h1>
                                <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='workEmail' value={formData.workEmail} onChange={handleChange}  >
                                    <option value="" className='text-8xl[gray-200]'>choose account</option>
                                    <option>1</option>
                                    <option>12</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className='flex gap-3'>
                            <div className='w-[100%] '>


                                <h1 className='mt-[9px] text-[15px]' >Phone</h1>
                                <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='Phone' value={formData.Phone} onChange={handleChange}></input>
                            </div>
                            <div className='w-[100%]'>
                                <h1 className='mt-[9px] text-[15px]' >Employee ID</h1>
                                <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='employeeId' value={formData.employeeId} onChange={handleChange}  >
                                    <option value="" className='text-8xl[gray-200]'>choose account</option>
                                    <option>1</option>
                                    <option>12</option>
                                </select>
                            </div>
                        </div>

                    </div>


                    <div>
                        <h1 className='border-b-2 text-[14px] my-2 border-[#E7EBEd] font-semibold text-[#344054]' >Job Details</h1>
                        <div className='flex gap-3'>
                            <div className='w-[100%] '>


                                <h1 className='mt-[9px] text-[15px]' >Department</h1>
                                <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='department' value={formData.department} onChange={handleChange}  >
                                    <option value="" className='text-8xl[gray-200]'>choose account</option>
                                    <option>1</option>
                                    <option>12</option>
                                </select>                </div>
                            <div className='w-[100%]'>
                                <h1 className='mt-[9px] text-[15px]' >Designation/Role</h1>

                                <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='Designaition' value={formData.Designaition} onChange={handleChange} ></input>

                            </div>
                        </div>

                        <div className='flex gap-3'>
                            <div className='w-[100%] '>







                                <h1 className='mt-[9px] text-[15px]' >Reporting Manager</h1>
                                <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='reportingManagrr' value={formData.reportingManagrr} onChange={handleChange}></input>
                            </div>
                            <div className='w-[100%]'>
                                <h1 className='mt-[9px] text-[15px]' >Location/Branch</h1>
                                <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='location' value={formData.location} onChange={handleChange}  >
                                    <option value="" className='text-8xl[gray-200]'>choose account</option>
                                    <option>1</option>
                                    <option>12</option>
                                </select>
                            </div>
                        </div> <div className='flex gap-3'>
                            <div className='w-[100%] '>








                                <h1 className='mt-[9px] text-[15px]' >Joining Date</h1>
                                <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='joiningDate' value={formData.joiningDate} onChange={handleChange}></input>
                            </div>
                            <div className='w-[100%]'>
                                <h1 className='mt-[9px] text-[15px]' >Employee Type</h1>
                                <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='EmployeeTyepe' value={formData.EmployeeTyepe} onChange={handleChange}  >
                                    <option value="" className='text-8xl[gray-200]'>choose account</option>
                                    <option>1</option>
                                    <option>12</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex gap-3'>
                            <div className='w-[100%] '>







                                <h1 className='mt-[9px] text-[15px]' >Shift</h1>
                                <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='Shift' value={formData.Shift} onChange={handleChange}  >
                                    <option value="" className='text-8xl[gray-200]'>choose account</option>
                                    <option>1</option>
                                    <option>12</option>
                                </select>
                            </div>
                            <div className='w-[100%]'>
                                <h1 className='mt-[9px] text-[15px]' >Probation End Date</h1>

                                <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='ProbationEndDate' value={formData.ProbationEndDate} onChange={handleChange}></input>

                            </div>
                        </div>

                    </div>

                    <div>
                        <h1 className='border-b-2 text-[14px]  border-[#E7EBEd] font-semibold text-[#344054]' >Accept & Invite</h1>
                        <div className='w-full'>
                            <h1 className='mt-[9px] text-[15px]'>System Role</h1>
                            <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='systemRole' value={formData.systemRole} onChange={handleChange}  >
                                <option value="">choose account</option>
                                <option>1</option>
                                <option>12</option>
                            </select>
                        </div>
                    </div>


                </div>

                <div className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]  text-[15px] mt-[10px] flex justify-between'>
                    <span> white Label</span>
                    <button
                        type="button"
                        onClick={() =>
                            setFormData(prev => ({
                                ...prev,
                                whitelabel: !prev.whitelabel
                            }))
                        }
                        className={`w-10 h-6 rounded-full transition ${formData.whitelabel ? 'bg-[#2563EB]' : 'bg-[#D0D5DD]'
                            }`}
                    >
                        <div
                            className={`w-5 h-5 bg-white rounded-full transition ${formData.whitelabel ? 'translate-x-4' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
                <div className='flex gap-3 mt-[10px]'>
                    <div className='w-[100%] '>







                        <h1 className='mt-[9px] text-[15px]'>Reporting manager</h1>
                        <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='reportingManagrr' value={formData.reportingManagrr} onChange={handleChange}></input>


                    </div>
                    <div className='w-[100%] '>
                        <h1 className='mt-[9px] text-[15px]' >Location/Branch</h1>

                        <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='locationBranch' value={formData.locationBranch} onChange={handleChange}  >
                            <option value="" className=''>choose account</option>
                            <option>1</option>
                            <option>12</option>
                        </select>
                    </div>
                </div>



                <div className=' text-end sticky bottom-0 bg-transparent backdrop-blur-sm'>

                    <button type='submit' className=' px-5 py-1 rounded-md my-4 bg-[#0575E6] text-white'>submit</button>
                </div>
            </div>

            {importOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                    <div className="bg-white w-[560px] rounded-t-xl px-6 py-5">

                        {/* HEADER */}
                        <h2 className="text-[20px] font-semibold text-[#101828]">
                            Import Employee
                        </h2>
                        <p className="text-[13px] text-[#667085] mt-1">
                            Download the template, fill employee details, then upload file.
                        </p>

                        {/* DOWNLOAD TEMPLATE */}
                        <div className="bg-[#F9FAFB] rounded-xl p-4 mt-5">
                            <h3 className="text-[14px] font-medium text-[#344054]">
                                Download Template
                            </h3>
                            <p className="text-[12px] text-[#667085] mt-1">
                                Use our format to avoid import errors.
                            </p>

                            <div className="flex items-center gap-4 mt-3">
                                <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054] bg-white">
                                    Download CSV Template
                                </button>

                                <span className="text-[13px] text-[#2563EB] font-medium">
                                    Required columns: Full Name, Work Email
                                </span>
                            </div>
                        </div>

                        {/* UPLOAD */}
                        <div className="bg-[#F9FAFB] rounded-xl p-4 mt-4">
                            <h3 className="text-[14px] font-medium text-[#344054] mb-2">
                                Upload CSV/XLSX
                            </h3>

                            <div
                                className="flex items-center justify-between border border-[#D0D5DD] rounded-lg px-4 py-3 bg-white cursor-pointer"
                                onClick={() => fileRef.current.click()}
                            >
                                <div>
                                    <p className="text-[14px] text-[#344054]">
                                        {file ? file.name : "Drag & drop your files here"}
                                    </p>
                                    <p className="text-[12px] text-[#667085]">
                                        Supported: .csv, .xlsx (max 5 MB)
                                    </p>
                                </div>

                                <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054] bg-white">
                                    Browse
                                </button>
                            </div>

                            <input
                                ref={fileRef}
                                type="file"
                                accept=".csv,.xlsx"
                                hidden
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* TOGGLE */}
                        <div className="border border-[#EAECF0] rounded-xl p-4 mt-4 flex items-center justify-between">
                            <div>
                                <p className="text-[14px] font-medium text-[#344054]">
                                    Send invite emails after import
                                </p>
                                <p className="text-[12px] text-[#667085]">
                                    Employees receive login invite on their work email.
                                </p>
                            </div>

                            <button
                                onClick={() => setSendInvite(!sendInvite)}
                                className={`w-10 h-6 rounded-full transition ${sendInvite ? 'bg-[#2563EB]' : 'bg-[#D0D5DD]'
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 bg-white rounded-full transition ${sendInvite ? 'translate-x-4' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* FOOTER */}
                        <div className="flex items-center justify-between mt-6">
                            <button
                                onClick={() => setImportOpen(false)}
                                className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054]"
                            >
                                Cancel
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setFile(null)}
                                    className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054]"
                                >
                                    Clear
                                </button>

                                <button
                                    onClick={handleImport}
                                    className="px-5 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium flex items-center gap-2"
                                >
                                    <span className="text-lg">+</span> Import
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </form>


    )
}

export default EmployeeHr
