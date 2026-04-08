import React, { useEffect, useRef, useState } from 'react'
import discardicon from "/assets/Images/discardicon.png"
import { FiPlus } from 'react-icons/fi'
import createAxios from '../../../utils/axios.config'
import InviteEmployeeModal from './InviteEmployeeModal'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddEmployee = () => {
    const token = localStorage.getItem("authToken")
    console.log("admin token", token)
    const navigate = useNavigate()

    const location = useLocation()
    const openInvitePopup = location.state?.invite || false
    const axiosInstance = createAxios(token)

    const [inviteOpen, setInviteOpen] = useState(openInvitePopup);

    const initialFormData = {
        fullName: "",
        workEmail: "",
        phone: "",
        employeeId: "",
        officeAddress: "",
        locationBranch: "",
        joiningDate: "",
        employmentType: "",
        probation: "",
        department: "",
        designation: "",
        reportingManager: "",
        team: "",
        grade: "",
        businessUnit: "",
        shift: "",
        clockInMethod: "",
        weeklyOff: "",
        attendancePolicy: {
            policyId: "",
            policyName: ""
        },
        leavePolicy: {
            policyId: "",
            policyName: ""
        },
        holidayPolicy: {
            policyId: "",
            policyName: ""
        },
        extraTimePolicy: {
            policyId: "",
            policyName: ""
        },
        approvalWorkflow: {
            workflowId: "",
            workflowName: ""
        },
        systemRole: "",

        createLogin: false,
        sendInvite: false,

        method: "",
        inviteMessage: ""

    }

    const [formData, setFormData] = useState(initialFormData)

    const [getoffices, setGetoffices] = useState([])
    const [getDepartment, setGetDepartment] = useState([])
    const [getTeam, setGetTeam] = useState([])
    const [getGrade, setGetGrade] = useState([])
    const [getBussinessUnit, setGetBussinessUnit] = useState([])
    const [getShift, setGetShift] = useState([])
    const [getClockIn, setGetClockIn] = useState([])
    const [getWeekoff, setGetWeekoff] = useState([])
    const [getAttendancePolicy, setGetAttendancePolicy] = useState([])
    const [getLeavePolicy, setGetLeavePolicy] = useState([])
    const [getHolidayPolicy, setGetHolidayPolicy] = useState([])
    const [getExtraTimePloicy, setGetExtraTimePloicy] = useState([])
    const [getemployeeId, setGetemployeeId] = useState(null)
    const [isEmployeeIdAutoAssigned, setIsEmployeeIdAutoAssigned] = useState(false)

    useEffect(() => {
        // offices=========================
        const fetchOffices = async () => {
            try {
                const res = await axiosInstance.get(
                    "/config/company-offices-getAll",
                    { meta: { auth: "ADMIN_AUTH" } }
                );
                // console.log("API response:", res.data);
                setGetoffices(res.data.offices);
            } catch (error) {
                console.log("Error fetching offices:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        // Team=========================
        const fetchteam = async () => {
            if (!token) return;
            try {
                const res = await axiosInstance.get("/config/getAll-team", {
                    meta: { auth: "ADMIN_AUTH" }
                }
                )
                // console.log(res.data?.data)
                setGetTeam(res?.data?.data)
            } catch (error) {
                // console.log("error", error)
                toast.error(error?.response?.data?.message)
            }
        }

        // Grade=================================
        const fetchgrade = async () => {
            try {
                const res = await axiosInstance.get("/config/getAll-grade", {
                    meta: { auth: "ADMIN_AUTH" }
                })
                console.log(res.data, "get all grade=================")
                setGetGrade(res?.data?.data)

            } catch (error) {
                console.log("error", error)
                toast.error(error?.response?.data?.message)

            }

        }
        // bussiness unit=========
        const fetchallbussinessunit = async () => {
            try {
                const response = await axiosInstance.get("/config/all-buinessUnit", {
                    meta: { auth: "ADMIN_AUTH" }
                });
                setGetBussinessUnit(response?.data?.data || []);
            } catch (error) {
                console.error("Error fetching business units:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        // shift================
        const fetchshift = async () => {
            try {
                const response = await axiosInstance.get("/config/getAll-create", {
                    meta: { auth: "ADMIN_AUTH" }
                });
                setGetShift(response?.data?.data || []);
            } catch (error) {
                console.error("Error fetching business units:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        // Clock-in-method================
        const fetchClockinMethod = async () => {
            try {
                const response = await axiosInstance.get("/config/getAll/clock-In-Mehtod", {
                    meta: { auth: "ADMIN_AUTH" }
                });
                setGetClockIn(response?.data?.data || []);
            } catch (error) {
                console.error("Error fetching business units:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        // weekoff==========
        const fetchweekoff = async () => {
            try {
                const response = await axiosInstance.get("/config/getAll/weekoff", {
                    meta: { auth: "ADMIN_AUTH" }
                });
                setGetWeekoff(response?.data?.data || []);
            } catch (error) {
                console.error("Error fetching business units:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        // attendancePolicy==========
        const fetchattendancePolicy = async () => {
            try {
                const response = await axiosInstance.get("/config/attendance-policy-getAll", {
                    meta: { auth: "ADMIN_AUTH" }
                });
                setGetAttendancePolicy(response?.data?.data || []);
            } catch (error) {
                console.error("Error fetching business units:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        // leavePolicy==========
        const fetchleavePolicy = async () => {
            try {
                const response = await axiosInstance.get("/config/getAll/leavePolicy", {
                    meta: { auth: "ADMIN_AUTH" }
                });
                setGetLeavePolicy(response?.data?.data || []);
            } catch (error) {
                console.error("Error fetching business units:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        // HolidayPlan==========
        const fetchhodidaypolicy = async () => {
            try {
                const response = await axiosInstance.get("/config/getAll/holidayPlan", {
                    meta: { auth: "ADMIN_AUTH" }
                });
                setGetHolidayPolicy(response?.data?.data || []);
            } catch (error) {
                console.error("Error fetching business units:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        const fetchalldepartment = async () => {
            try {
                const response = await axiosInstance.get("/config/all-department", {
                    meta: { auth: "ADMIN_AUTH" }
                });
                setGetDepartment(response?.data?.data || []);
            } catch (error) {
                console.error("Error fetching business units:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        const fetchallemployeeId = async () => {
            try {
                const response = await axiosInstance.get("/config/getEmployeeidforCreate", {
                    meta: { auth: "ADMIN_AUTH" }
                });
                const employeeIdConfig = response?.data || {}
                const nextAssignType = employeeIdConfig?.assignType || ""
                const nextEmployeeId = nextAssignType === "automatic"
                    ? employeeIdConfig?.employeeId || ""
                    : ""

                setGetemployeeId(employeeIdConfig);
                setIsEmployeeIdAutoAssigned(nextAssignType === "automatic")
                setFormData((prev) => ({
                    ...prev,
                    employeeId: nextEmployeeId
                }))
            } catch (error) {
                console.error("Error fetching business units:", error);
                toast.error(error?.response?.data?.message)
            }
        };
        fetchOffices();
        fetchteam();
        fetchgrade();
        fetchallbussinessunit();
        fetchshift();
        fetchClockinMethod();
        fetchweekoff();
        fetchattendancePolicy();
        fetchleavePolicy();
        fetchhodidaypolicy();
        fetchalldepartment();
        fetchallemployeeId();
    }, [])

    const [importOpen, setImportOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [sendInvitelink, setSendInvitelink] = useState(false)
    const fileRef = useRef(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleNestedSelectChange = (parentKey, idKey, nameKey) => (e) => {
        const { value, options, selectedIndex } = e.target
        const selectedText = selectedIndex >= 0 ? options[selectedIndex].text : ""

        setFormData((prev) => ({
            ...prev,
            [parentKey]: {
                ...prev[parentKey],
                [idKey]: value,
                [nameKey]: value ? selectedText : ""
            }
        }))
    }
    const handleImport = () => {
        if (!file) {
            alert("Please upload a CSV/XLSX file")
            return
        }

        console.log("Uploaded file:", file)
        console.log("Send invite:", sendInvitelink)

        setImportOpen(false)
        setFile(null)
        setSendInvitelink(false)
    }



    const buildEmployeePayload = (data) => ({
        fullName: data.fullName,
        workEmail: data.workEmail,
        phone: data.phone,
        employeeId: data.employeeId,
        officeAddress: data.officeAddress,
        locationBranch: data.locationBranch,
        joiningDate: data.joiningDate,
        employmentType: data.employmentType,
        probation: data.probation,
        department: data.department,
        designation: data.designation,
        reportingManager: data.reportingManager,
        team: data.team,
        grade: data.grade,
        businessUnit: data.businessUnit,
        shift: data.shift,
        clockInMethod: data.clockInMethod,
        weeklyOff: data.weeklyOff,
        attendancePolicy: {
            policyId: data.attendancePolicy?.policyId || "",
            policyName: data.attendancePolicy?.policyName || ""
        },
        leavePolicy: {
            policyId: data.leavePolicy?.policyId || "",
            policyName: data.leavePolicy?.policyName || ""
        },
        holidayPolicy: {
            policyId: data.holidayPolicy?.policyId || "",
            policyName: data.holidayPolicy?.policyName || ""
        },
        extraTimePolicy: {
            policyId: data.extraTimePolicy?.policyId || "",
            policyName: data.extraTimePolicy?.policyName || ""
        },
        approvalWorkflow: {
            workflowId: data.approvalWorkflow?.workflowId || "",
            workflowName: data.approvalWorkflow?.workflowName || ""
        },
        systemRole: data.systemRole,
        createLogin: Boolean(data.createLogin),
        sendInvite: Boolean(data.sendInvite),
        method: data.method,
        inviteMessage: data.inviteMessage
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const payload = buildEmployeePayload(formData)

            const res = await axiosInstance.post(
                `/employees`,
                payload,
                {
                    meta: { auth: "TENANT_AUTH" }
                }
            )
            console.log(res.data)
            setFormData(initialFormData)
            toast.success("Employee added successfully")
            navigate('/dashboard/employee')


        } catch (error) {
            console.log('API Error:', error)
            toast.error(error?.response?.data?.message || "Failed to add employee")
        }
    }
    const toggle = (key) => {
        setFormData(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }



    return (
        <>
            {/* {inviteToken && showOtpModal && !isOtpVerified && (
                <OTPModal onVerify={handleOtpVerified} />
            )} */}
            {inviteOpen && (
                <InviteEmployeeModal onClose={() => setInviteOpen(false)} />
            )}

            <form onSubmit={handleSubmit}>
                <div className=' p-[20px]'>
                    <div className='md:flex  justify-between sticky top-0 bg-[#F8F9FA] h-fit'>
                        <div className=''>
                            <h1 className='font-bold text-[20px] text-[#212529]'>Add Employee</h1>
                            <p className='text-[#000000]/35 text-[12px]'>Create an employee profile, assign job details, and send login invite.</p>
                        </div>
                        <div className='w-[300px] flex gap-[30px]'>
                            <button type="button" className='border border-[#E7EBEd] bg-[#E4E9EE4D] text-[#344054] w-[167px] h-[40px] font-medium rounded-md flex items-center justify-center gap-2' onClick={() => setImportOpen(true)} ><FiPlus /> Import Employees</button>
                            <div className='border border-[#E7EBEd] items-center justify-evenly flex bg-[#E4E9EE4D] font-medium text-[#344054] w-[100px] h-[40px] rounded-md' >
                                <button type='button' onClick={() => nav}>Cancel</button>
                                <img className='w-[20px] h-[20px]' src={discardicon} />

                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <h1 className='border-b-2 text-[14px]  border-[#E7EBEd] font-semibold text-[#344054] my-[15px]'>Basic Info:</h1>

                        {/* Basic Info:=========================================== */}
                        <div>

                            <div className='flex gap-3'>
                                <div className='w-[100%]  box-border '>
                                    <h1 className='mt-[9px] text-[15px]'>Full Name</h1>
                                    <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' value={formData.fullName} name='fullName' onChange={handleChange}></input>
                                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]'>Work Email</h1>
                                    <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='email' placeholder='Enter work email' name='workEmail' value={formData.workEmail} onChange={handleChange}></input>
                                </div>
                            </div>



                            <div className='flex gap-3'>
                                <div className='w-[100%] '>
                                    <h1 className='mt-[9px] text-[15px]' >phone</h1>
                                    <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='phone' value={formData.phone} onChange={handleChange}></input>
                                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]' >Employee ID</h1>
                                    <input
                                        className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] disabled:bg-[#F8F9FA] disabled:text-[#667085] disabled:cursor-not-allowed'
                                        type='text'
                                        placeholder='Enter Employee ID'
                                        name='employeeId'
                                        value={formData.employeeId}
                                        onChange={handleChange}
                                        readOnly={isEmployeeIdAutoAssigned}
                                        disabled={isEmployeeIdAutoAssigned}
                                    ></input>
                                </div>
                            </div>

                        </div>

                        {/* Work Location:======================= */}
                        <h1 className='border-b-2 text-[14px] my-2  border-[#E7EBEd] font-semibold text-[#344054] my-[15px]'>Work Location:</h1>

                        <div>

                            <div className='flex gap-3'>
                                <div className='w-[100%] '>
                                    <h1 className='mt-[9px] text-[15px]' >Office Address</h1>
                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='officeAddress' value={formData.officeAddress} onChange={handleChange}  >
                                        <option value="" className='text-8xl[gray-200]'>choose address</option>
                                        <option value="Head Office">Head Office</option>
                                        {/* {getoffices?.map((offices, idx) => (
                                            <option key={idx} value={offices.id}>{offices.name}</option>
                                        ))} */}

                                    </select>
                                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]' >Location/Branch</h1>
                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='locationBranch' value={formData.locationBranch} onChange={handleChange}  >
                                        <option value="" className='text-8xl[gray-200]'>choose account</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Mumbai">Mumbai</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        {/* Employment Details:================= */}
                        <h1 className='border-b-2 text-[14px] my-2  border-[#E7EBEd] font-semibold text-[#344054] my-[15px]'>Employment Details:</h1>
                        <div>
                            <div className='flex gap-3'>
                                <div className='w-[100%] '>

                                    <h1 className='mt-[9px] text-[15px]' >Joining Date</h1>
                                    <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='date' placeholder='choose Account' name='joiningDate' value={formData.joiningDate} onChange={handleChange}></input>
                                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]' >Employee Type</h1>
                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='employmentType' value={formData.employmentType} onChange={handleChange}  >
                                        <option value="" className='text-8xl[gray-200]'>choose account</option>
                                        <option value="Full Time">Full Time</option>
                                        {/* <option>12</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className='w-[50%]'>
                                <h1 className='mt-[9px] text-[15px]' >Probation</h1>

                                {/* <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='probation' value={formData.probation} onChange={handleChange}></input> */}
                                <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='probation' value={formData.probation} onChange={handleChange}  >
                                    <option value="" className='text-8xl[gray-200]'>choose month</option>
                                    <option value="1 Month">1 month</option>
                                    <option value="2 Months">2 month</option>
                                    <option value="3 Months">3 month</option>
                                </select>
                            </div>
                        </div>


                        {/* Organization Assignment:====================================== */}
                        <div>
                            <h1 className='border-b-2 text-[14px] my-2 border-[#E7EBEd] font-semibold text-[#344054] my-[15px]' >Organization Assignment:</h1>
                            <div className='flex gap-3'>
                                <div className='w-[100%] '>


                                    <h1 className='mt-[9px] text-[15px]' >Department</h1>
                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='department' value={formData.department} onChange={handleChange}  >
                                        <option value="" className='text-8xl[gray-200]'>choose Department</option>
                                        <option value="Engineering">Engineering</option>
                                        {/* <option>12</option> */}
                                    </select>                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]' >Designation/Role</h1>

                                    <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='designation' value={formData.designation} onChange={handleChange} ></input>

                                </div>
                            </div>

                            <div className='flex gap-3'>
                                <div className='w-[100%] '>
                                    <h1 className='mt-[9px] text-[15px]' >Reporting Manager</h1>
                                    <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='reportingManager' value={formData.reportingManager} onChange={handleChange}></input>
                                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]' >Team</h1>
                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='team' value={formData.team} onChange={handleChange}  >
                                        <option value="" className='text-8xl[gray-200]'>Choose Team</option>
                                        <option value="Backend Team">Backend Team</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <div className='w-[100%] '>

                                    <h1 className='mt-[9px] text-[15px]' >Grade</h1>
                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='grade' value={formData.grade} onChange={handleChange}  >
                                        <option value="" className='text-8xl[gray-200]'>Choose Unit</option>
                                        <option value="L3">L3</option>
                                    </select>
                                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]' >Bussiness Unit</h1>
                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='businessUnit' value={formData.businessUnit} onChange={handleChange}  >
                                        <option value="" className='text-8xl[gray-200]'>Choose Unit</option>
                                        <option value="Product">Product</option>
                                    </select>
                                </div>
                            </div>


                        </div>

                        {/* Attendance & Shift Setup:=============================== */}
                        <div>


                            <h1 className='border-b-2 text-[14px] my-2 border-[#E7EBEd] font-semibold text-[#344054] my-[15px]' >Attendance & Shift Setup:</h1>

                            <div className='flex gap-3 '>
                                <div className='w-[100%] '>
                                    <h1 className='mt-[9px] text-[15px]' >shift</h1>
                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='shift' value={formData.shift} onChange={handleChange}  >
                                        <option value="">choose shift</option>
                                        <option value="General Shift">General Shift</option>
                                        <option value="Morning">Morning</option>
                                    </select>
                                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]' >Clock-In Method</h1>

                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='clockInMethod' value={formData.clockInMethod} onChange={handleChange}  >
                                        <option value="" className='text-8xl[gray-200]'>choose method</option>
                                        <option value="Biometric">Biometric</option>
                                        <option value="Mobile App">Mobile App</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-[50%]'>
                                <h1 className='mt-[9px] text-[15px]' >Weekly Off</h1>

                                <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='weeklyOff' value={formData.weeklyOff} onChange={handleChange}  >
                                    <option value="" className='text-8xl[gray-200]'>choose week off</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>
                            </div>
                        </div>

                        {/* Policy Assignment:================== */}
                        <div>
                            <h1 className='border-b-2 text-[14px] my-2 border-[#E7EBEd] font-semibold text-[#344054] my-[15px]' >Policy Assignment:</h1>
                            <div className='flex gap-3 '>
                                <div className='w-[100%] '>
                                    <h1 className='mt-[9px] text-[15px]' >Attendance Policy</h1>
                                    <select
                                        className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] '
                                        name='attendancePolicy.policyId'
                                        value={formData.attendancePolicy.policyId}
                                        onChange={handleNestedSelectChange("attendancePolicy", "policyId", "policyName")}
                                    >
                                        <option value="">choose attendance policy</option>
                                        <option value="664abc123456789012345678">Default Attendance</option>
                                    </select>
                                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]' >Leave Policy</h1>

                                    <select
                                        className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] '
                                        name='leavePolicy.policyId'
                                        value={formData.leavePolicy.policyId}
                                        onChange={handleNestedSelectChange("leavePolicy", "policyId", "policyName")}
                                    >
                                        <option value="" className='text-8xl[gray-200]'>choose method</option>
                                        <option value="664def123456789012345678">Standard Leave</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex gap-3 '>
                                <div className='w-[100%] '>
                                    <h1 className='mt-[9px] text-[15px]' >Holiday Policy</h1>
                                    <select
                                        className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] '
                                        name='holidayPolicy.policyId'
                                        value={formData.holidayPolicy.policyId}
                                        onChange={handleNestedSelectChange("holidayPolicy", "policyId", "policyName")}
                                    >
                                        <option value="">choose holiday policy</option>
                                        <option value="664ghi123456789012345678">India Holidays 2026</option>
                                    </select>
                                </div>
                                <div className='w-[100%]'>
                                    <h1 className='mt-[9px] text-[15px]' >Extra Time Policy</h1>

                                    <select
                                        className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] '
                                        name='extraTimePolicy.policyId'
                                        value={formData.extraTimePolicy.policyId}
                                        onChange={handleNestedSelectChange("extraTimePolicy", "policyId", "policyName")}
                                    >
                                        <option value="" className='text-8xl[gray-200]'>choose method</option>
                                        <option value="664jkl123456789012345678">Overtime Policy</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        {/* Accept & Invite========================== */}
                        <div>
                            <h1 className='border-b-2 text-[14px]  border-[#E7EBEd] font-semibold text-[#344054] my-[15px]' >Accept & Invite</h1>
                            <div className='flex gap-3 '>
                                <div className='w-[100%] '>
                                    <h1 className='mt-[9px] text-[15px]'>System Role</h1>
                                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='systemRole' value={formData.systemRole} onChange={handleChange}  >
                                        <option value="">choose Role</option>
                                        <option value="EMPLOYEE">EMPLOYEE</option>
                                        <option value="HR">HR</option>
                                        <option value="TL">TL</option>
                                    </select>
                                </div>
                                <div className='w-[100%] '>
                                    <h1 className='mt-[9px] text-[15px]'>Assign Approval Workflow</h1>
                                    <select
                                        className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] '
                                        name='approvalWorkflow.workflowId'
                                        value={formData.approvalWorkflow.workflowId}
                                        onChange={handleNestedSelectChange("approvalWorkflow", "workflowId", "workflowName")}
                                    >
                                        <option value="">choose Role</option>
                                        <option value="664mno123456789012345678">Manager Approval</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="flex gap-4 mt-2">
                            {/* Toggle Card 1 */}
                            <div className="flex items-center justify-between w-full  px-4 py-3 border border-gray-200 rounded-lg">
                                <span className="text-sm text-gray-800">
                                    Create login for this employee
                                </span>

                                <button
                                    type='button'
                                    onClick={() => toggle("createLogin")}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${formData.createLogin ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${formData.createLogin ? "translate-x-5" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Toggle Card 2 */}
                            <div className="flex items-center justify-between w-full  px-4 py-3 border border-gray-200 rounded-lg">
                                <span className="text-sm text-gray-800">
                                    Send invite now
                                </span>

                                <button
                                    type="button"
                                    onClick={() => toggle("sendInvite")}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${formData.sendInvite ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${formData.sendInvite ? "translate-x-5" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Invite Method=========================== */}
                        <div className='flex gap-3'>
                            <div className='w-[100%] '>
                                <h1 className='mt-[9px] text-[15px]' >Invite Method</h1>
                                <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='method' value={formData.method} onChange={handleChange}  >
                                    <option value="" className='text-8xl[gray-200]'>choose method</option>
                                    <option value="email">via Email</option>
                                    <option value="sms">via SMS</option>
                                </select>                </div>
                            <div className='w-[100%]'>
                                <h1 className='mt-[9px] text-[15px]' >Invite message</h1>

                                <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='inviteMessage' value={formData.inviteMessage} onChange={handleChange} ></input>

                            </div>
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
                                    <button type='button' className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054] bg-white">
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

                                    <button type='button' className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054] bg-white">
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
                                    type='button'
                                    onClick={() => setSendInvitelink(!sendInvitelink)}
                                    className={`w-10 h-6 rounded-full transition ${sendInvitelink ? 'bg-[#2563EB]' : 'bg-[#D0D5DD]'
                                        }`}
                                >
                                    <div
                                        className={`w-5 h-5 bg-white rounded-full transition ${sendInvitelink ? 'translate-x-4' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* FOOTER */}
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type='button'
                                    onClick={() => setImportOpen(false)}
                                    className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054]"
                                >
                                    Cancel
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        type='button'
                                        onClick={() => setFile(null)}
                                        className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054]"
                                    >
                                        Clear
                                    </button>

                                    <button
                                        type='button'
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
        </>

    )
}

export default AddEmployee
