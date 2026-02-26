import React, { useState } from 'react'
import { action,  } from '../../../allAssetsImport/allAssets'
import createAxios from '../../../utils/axios.config'
import { useSelector } from 'react-redux'
const Integrated = [
    {
        name: "Attandance Policy",
        date: "12 jun 2025 11:10 AM",
        location: "Head Office",
        mode: "LAN/IP",
        status: "Approved",
        action: action
    },
    {
        name: "Attandance Policy",
        date: "12 jun 2025 11:10 AM",
        location: "Head Office",
        mode: "LAN/IP",
        status: "Paused",
        action: action
    },
]

const DeviceIntegration = () => {
    const { token } = useSelector(state => state.user)
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false);
    const [changingFields, setchangingFields] = useState(true)
    const [formdata, setFormdata] = useState({
        name: "",
        vendor: "",
        deviceType: "",
        connectionMode: "",
        apiKey: "",
        locationId: "",
        ipAddress: "",
        port: ""
    })
    console.log(data,"response of api======================")
    const axiosInstance = createAxios(token);
    const handlesave = async () => {
        const payload = {
            name: formdata.name,
            vendor: formdata.vendor,
            deviceType: formdata.deviceType,
            connectionMode: formdata.connectionMode,
            apiKey: formdata.apiKey,
            locationId: formdata.locationId,
            ipAddress: formdata.ipAddress,
            port: formdata.port,
        }
        try {
            const res = await axiosInstance.post(`/biometric/device`, payload,
                { meta: { auth: "ADMIN_AUTH" } }
            )
            setData(res?.data)
        } catch (error) {
            console.log("error", error)
        }
    }
    const handlechange = (e) => {
        const { name, value } = e.target
        setFormdata({
            ...formdata,
            [name]: value
        })
    }
    return (
        <div className='p-6 bg-gray-50'>
            <div className='flex justify-between'>
                <div>
                    <p className='font-bold text-[20px]'>Integrated Device</p>
                    <p className='text-[12px] text-gray-300'>manage employee directory,documents,and role base actions</p>
                </div>
                <button className="bg-[#0575E6] rounded-lg w-[154px] h-[40px] flex items-center justify-center text-white"
                    onClick={() => setModal(true)}>
                    Add Device +
                </button>
            </div>
            <div className='mt-[15px]'>
                <ul className='border-b border-[#E6E6E6] flex justify-between text-gray-400 px-[20px]'>
                    <li className='w-[100px] '>Device</li>
                    <li>Location</li>
                    <li>Mode</li>
                    <li>Status</li>
                    <li>Action</li>
                </ul>
            </div>
            {Integrated.map((item, index) => (
                <div key={index} className='flex justify-between border border-[#0000001A] rounded-lg h-[64px] w-full mt-[10px] items-center px-[10px]'>
                    <div >
                        {item.name}
                        <div className='text-[12px] text-gray-300'>
                            {item.date}
                        </div>
                    </div>
                    <div className='w-[100px] text-center'>{item.location}</div>
                    <div className='w-[100px] text-center'>{item.mode}</div>
                    <div className={`w-[100px] rounded-lg text-center ${item.status === "Approved"
                        ? "bg-[#ECFDF3] border border-[#D3F9D8] text-[#2B8A3E]"
                        : "border border-[#FDE2AD] bg-[#FFF3D6] text-[#F59E0B]"
                        }`}>
                        {item.status}
                    </div>
                    <div className='w-[50px] flex justify-center'>
                        <img src={item.action} />
                    </div>
                </div>
            ))}
            {modal && (
                <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
                    <div className="w-[543px] bg-white rounded-2xl shadow-xl p-8 relative overflow-y-auto">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-6 text-gray-500 hover:text-black text-xl"
                            onClick={() => setModal(false)}
                        >
                            ✕
                        </button>
                        {/* Header */}
                        <div className="mb-6">
                            <p className="text-lg font-semibold">Basic Setup</p>
                            <p className="text-xs text-gray-400">
                                Only the required fields to connect your device.
                            </p>
                        </div>
                        {/* Device Name */}
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-1 block">Device Name</label>
                            <input
                                type="text"
                                name='name'
                                value={formdata.name}
                                onChange={handlechange}
                                placeholder="Choose Account"
                                className="w-full border border-gray-300 h-10 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        {/* Device Type */}
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-1 block">Device Type</label>
                            <select className="w-full border border-gray-300 h-10 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name='deviceType'
                                value={formdata.deviceType}
                                onChange={handlechange}>
                                <option value='Biometric Scanner' >Biometric Scanner</option>
                                <option value="Facial Recognition">Facial Recognition</option>
                                <option value="RFID Card Reader">RFID Card Reader</option>
                                <option value="Smart Lock">Smart Lock</option>
                            </select>
                        </div>
                        {/* Connection Mode */}
                        <div className="mb-4">
                            <label className="text-sm font-medium mb-1 block">Connection Mode</label>
                            <select
                                name='connectionMode'
                                value={formdata.connectionMode}
                                className="w-full border border-gray-300 h-10 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                // onChange={(e) =>
                                //     setchangingFields(e.target.value === "LAN/IP")
                                // }
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setchangingFields(value === "LAN/IP");
                                    setFormdata({ ...formdata, connectionMode: value });
                                }}
                            >
                                <option value="LAN/IP">LAN/IP</option>
                                <option value="Cloud API">Cloud API</option>
                            </select>
                        </div>
                        {/* Conditional Fields */}
                        {changingFields ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">
                                            Device IP
                                        </label>
                                        <input
                                            type="text"
                                            name='ipAddress'
                                            value={formdata.ipAddress}
                                            onChange={handlechange}
                                            className="w-full border border-gray-300 h-10 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">
                                            Port / Optional
                                        </label>
                                        <input
                                            type="text"
                                            name='port'
                                            value={formdata.port}
                                            onChange={handlechange}
                                            className="w-full border border-gray-300 h-10 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-end mt-[10px]'>
                                    <button className='border w-[70px] h-[40px] ' onClick={handlesave}>save</button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Vendor</label>
                                    <select className="w-full border border-gray-300 h-10 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        name='vendor'
                                        value={formdata.vendor}
                                        onChange={handlechange}>
                                        <option value='ZKTeco'>ZKTeco</option>
                                        <option value='eSSL'>eSSL</option>
                                        <option value='Suprema'>Suprema</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        API Key Token
                                    </label>
                                    <input
                                        type="text"
                                        name='apiKey'
                                        value={formdata.apiKey}
                                        onChange={handlechange}
                                        placeholder="Enter API Token"
                                        className="w-full border border-gray-300 h-10 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium mb-1 block">
                                Location / Office
                            </label>
                            <select className="w-full border border-gray-300 h-10 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400" name='locationId' value={formdata.locationId} onChange={handlechange}>
                                <option value="69941bd1b603693ecf22d8e5">69941bd1b603693ecf22d8e5</option>
                                <option>2</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default DeviceIntegration
