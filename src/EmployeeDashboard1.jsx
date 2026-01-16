import React from 'react'
import { discardicon, statslogo1, statslogo2, statslogo3, statslogo4, action, action2, group, vector, vector2 } from './allAssetsImport/allAssets'


const cards = [
  {
    title: "Team Size",
    value: 13,
    badge: "stable",
    icon: statslogo1
  },
  {
    title: "Present Today",
    value: 13,
    badge: "2 Not Marked",
    icon: statslogo2
  },
  {
    title: "Pending Approvals",
    value: 13,
    badge: "2 Due Today",
    icon: statslogo3
  },
  {
    title: "Onboarding Task",
    value: 10,
    badge: "In progress",
    icon: statslogo4
  },
]
const employee = [
  {
    name: "Aman raj",
    email: "aman.raj@company.com",
    department: "Engineering",
    Role: "Employee",
    Status: "Active",
    joining: "12 jun 2025",
    actionicon: action,
    actionicon1: action2

  },
  {
    name: "Pooja Sharma  ",
    email: "pooja@company.com",
    department: "HR",
    Role: "Manager",
    Status: "Active",
    joining: " 3 jun 2025",
    actionicon: action,
    actionicon1: action2
  },
  {
    name: "Vivek Kumar",
    email: "vivek.kumar@company.com",
    department: "Sales",
    Role: "Team Lead",
    Status: "Pending Invite",

    joining: "----",
    actionicon2: group,
    actionicon3: vector
  },
  {
    name: "Neha Mehta",
    email: "neha.mehta@company.com",
    department: "Operations",
    Role: "Employee",
    Status: "inactive",
    joining: "19 jun 2025",

    actionicon4: vector2
  },
]

const EmployeeDashboard1 = () => {
  return (
    <>
      <div className='bg-gray-50 p-5'>




        <div className='flex justify-between'>
          <div>

            <h1>Employees</h1>
            <p className='text-gray-200'>Manage employee directory, documents, and role-based actions.</p>
          </div>

          <button className="bg-[#0575E6] text-white px-4 py-2  rounded">
            + Add Employees
          </button>
        </div>
        <div className='m-5 border border-[#DEE2E6] w-[290px] flex justify-around rounded-md h-[40px]'>
          <button>All Employees</button>
          <button>My Team</button>
          <button>Me</button>
        </div>

        <div className='flex justify-between'>
          <div className='flex gap-3'>
            <button className='border border-[#DEE2E6] text-left rounded-md w-[210px] h-[40px] bg-white '>Department</button>
            <button className='border border-[#DEE2E6] text-left rounded-md w-[210px] h-[40px] bg-white'>Role</button>
            <button className='border border-[#DEE2E6] text-left rounded-md w-[210px] h-[40px] bg-white'>Location</button>
            <button className='border border-[#DEE2E6] text-left rounded-md w-[210px] h-[40px] bg-white'>Status</button>
          </div>
          <div className='border border-[#DEE2E6] rounded-md w-[90px] h-[40px] flex items-center justify-evenly'>
            <button >clear</button>
            <img className='h-5' src={discardicon} />
          </div>
        </div>


        {/* 2nd///////////////////////// */}

        <div className="flex justify-between m-7">
          {cards.map((item, index) => (
            <div key={index} className='flex justify-between items-center w-[264px] bg-[white] h-[110px]'>

              <div  >
                <div >

                  {item.title}
                </div>
                {item.value}
                <div>

                  <button className='border border-[#C5F5D5] bg-[#E9FFEF] text-[#10B981]'>{item.badge}</button>
                </div>

              </div>
              <div>
                <img className='h-[50px] w-[50px]' src={item.icon} />
              </div>

            </div>

          ))}

        </div>
        {/* 3rd.............................. */}
        <div>
          <div >
            <ul className='flex justify-between text-[#8F97A3] m-[15px] p-5 items-center border-b-2 border-[#E3E5E8]'>
              <li className=' w-[266px]' >Employee</li>
              <li>Department</li>
              <li>Role</li>
              <li>Status</li>
              <li>Joining</li>
              <li>Action</li>
            </ul>
            <div >
              {employee.map((item, index) => (
                <div key={index} className='flex justify-between border border-[#0000001A] h-[64px] m-[15px] p-5 items-center rounded-md '>

                  <div className='flex gap-[10px]'>



                    <div>

                      <div >{item.name}</div>
                      <div className='text-gray-300 w-[270px]'>{item.email}</div>
                    </div>
                  </div>




                  <div>
                    <div className='w-[120px] '  >{item.department}</div>
                  </div>
                  <div>
                    <div  >{item.Role}</div>

                  </div>
                  <div>
                    <div className='border  border-[#C5F5D5] bg-[#E9FFEF] text-[#10B981]  box-border  rounded-md' >{item.Status}</div>
                  </div>
                  <div>
                    <div className='text-[#52525B] '>{item.joining}</div>
                  </div>
                  <div className='flex items-start gap-2  '>
                    {item.actionicon && <img src={item.actionicon} />}
                    {item.actionicon1 && <img src={item.actionicon1} />}
                    {item.actionicon2 && <img src={item.actionicon2} />}
                    {item.actionicon3 && <img src={item.actionicon3} />}
                    {item.actionicon4 && <img src={item.actionicon4} />}

                  </div>




                </div>
              ))}

            </div>

          </div>
        </div>







      </div>



















    </>
  )
}

export default EmployeeDashboard1
