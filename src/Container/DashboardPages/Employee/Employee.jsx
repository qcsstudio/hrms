import React, { useState } from 'react'
import { statslogo1, statslogo2, statslogo3, statslogo4 } from '../../../allAssetsImport/allAssets'

const employee = [
    {
        title: "Attendance",
        value: "92%",
        status: "Stable",
        icon: statslogo1
    },
    {
        title: "Leave Balance",
        value: "12.2",
        status: "1 Pending",
        icon: statslogo2
    },
    {
        title: "Late Marks",
        value: "2",
        status: "Watch",
        icon: statslogo3
    },
    {
        title: "My Requests",
        value: "1",
        status: "In Progress",
        icon: statslogo4
    },
]

const actionss = [
    {
        title: "Request attendance regularization",
        discription: "Missed punch / late mark correction",
        button: "Request"
    },
    {
        title: "View documents",
        discription: "Offer letter, policies, uploads",
        button2: "Open"
    },
    {
        title: "Raise a helpdesk request",
        discription: "HR / IT / Admin support",
        button3: "Raise"
    },
]

const panelClass = 'rounded-[20px] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]'
const metricCardClass = 'flex min-h-[156px] items-center justify-between rounded-[20px] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-[0_6px_16px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]'
const actionCardClass = 'flex flex-col gap-3 rounded-[16px] border border-[#E8ECF1] bg-[#F8F9FA] p-4 sm:flex-row sm:items-center sm:justify-between'
const primaryButtonClass = 'inline-flex items-center justify-center rounded-lg border border-[#E4E9EE] bg-[#0575E6] px-5 text-sm font-medium text-white shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 hover:bg-[#0467CA] active:scale-[0.99]'
const subtleButtonClass = 'inline-flex items-center justify-center rounded-lg border border-[#D6E4FF] bg-[#F1F5FF] px-4 py-2 text-[13px] font-medium text-[#1E3A8A] shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 hover:bg-[#E6EEFF] active:scale-[0.99]'
const smallActionButtonClass = 'inline-flex h-[36px] min-w-[92px] items-center justify-center rounded-lg bg-[#0575E6] px-4 text-[13px] font-medium text-white'

const Employee = () => {
    const [isEmailCopied, setIsEmailCopied] = useState(false)

    const handleCopyEmail = async () => {
        const email = 'natasia@company.com'

        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(email)
            } else {
                const textArea = document.createElement('textarea')
                textArea.value = email
                textArea.setAttribute('readonly', '')
                textArea.style.position = 'absolute'
                textArea.style.left = '-9999px'
                document.body.appendChild(textArea)
                textArea.select()
                document.execCommand('copy')
                document.body.removeChild(textArea)
            }

            setIsEmailCopied(true)
            window.setTimeout(() => setIsEmailCopied(false), 2000)
        } catch (error) {
            console.error('Unable to copy email', error)
        }
    }

    return (
        <>
            <div className='min-h-screen bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 card-animate'>
                <div className='mx-auto flex max-w-[1600px] flex-col gap-5'>
                    <div className={`${panelClass} flex flex-wrap items-start justify-between gap-4`}>
                        <div>
                            <h1 className='font-bold text-[20px] text-[#212529]'>Employees</h1>
                            <p className='mt-1 text-[12px] text-[#667085]'>Manage employee directory, documents, and role-based actions.</p>
                        </div>

                        <button className={`${primaryButtonClass} h-[40px]`}>Apply Leave</button>

                    </div>
                    <div className={panelClass}>
                        <div className='flex flex-col gap-5 sm:flex-row sm:items-center'>
                            <div className='flex h-[82px] w-[82px] items-center justify-center rounded-[20px] bg-[#F0F3FF]'>
                                <img className='h-[42px] w-[42px]' src={statslogo1} alt='Employee profile icon' />
                            </div>
                            <div className='space-y-2'>
                                <h1 className='text-[18px] font-semibold text-[#212529]'>Natasia Bunny</h1>
                                <p className='text-[13px] leading-6 text-[#667085]'>EMP-1003 • Team Lead (Sales) • Bengaluru<br />Reports to Sarah Johnson • Status: Active • Employment: Full-time</p>
                                <div className='flex flex-wrap items-center gap-3 pt-1'>
                                    <button
                                        type='button'
                                        onClick={handleCopyEmail}
                                        className={subtleButtonClass}
                                    >
                                        natasia@company.com
                                    </button>
                                    {isEmailCopied && (
                                        <span className='text-[12px] font-medium text-[#10B981]'>Copied to clipboard</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-5 xl:grid-cols-[1.45fr_1fr]'>
                        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                        {employee.map((item, index) => (
                            <div
                                key={index}
                                className={metricCardClass}
                            >
                                <div>
                                    <div className='text-[14px] font-medium text-[#667085]'>{item.title}</div>
                                    <div className='mt-3 text-[28px] font-bold text-[#111827]'>{item.value}</div>
                                    <div className='mt-4 inline-flex h-7 items-center rounded-md border border-[#C5F5D5] bg-[#E9FFEF] px-3 text-xs font-medium text-[#10B981]'>
                                        {item.status}
                                    </div>
                                </div>

                                <div className='flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#F4F7FB]'>
                                    <img src={item.icon} alt={item.title} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={panelClass}>
                        <div className='pb-4'>
                            <h1 className='text-[18px] font-semibold text-[#212529]'>My Actions</h1>
                            <p className='mt-1 text-[13px] text-[#98A2B3]'>Self-service actions only.</p>
                        </div>
                        <div className='space-y-3'>
                        {actionss.map((item, index) => {
                            const actionLabel = item.button || item.button2 || item.button3

                            return (
                                <div key={index} className={actionCardClass}>
                                    <div>
                                        <div className='text-[15px] font-medium text-[#212529]'>{item.title}</div>
                                        <div className='mt-1 text-[13px] leading-5 text-[#98A2B3]' >{item.discription}</div>

                                    </div>
                                    <div>
                                        <div className={smallActionButtonClass}>
                                            {actionLabel}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Employee
