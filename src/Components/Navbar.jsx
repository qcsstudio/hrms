import { IoMdMenu } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toggleMenu, setIsConfig } from "../Redux/sidebarSlice";
import { avatar, navbarLogo, notification, search } from "../allAssetsImport/allAssets";
import { logout } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidDownArrow } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import createAxios from "../utils/axios.config";



// import { fetchCurrentUser } from "../utils/thunkApis/userThunkApis";

const notificationItems = [
  {
    id: 1,
    title: "Leave Request Approved",
    message: "Priya Singh's leave request for Apr 11 has been approved.",
    time: "2 min ago"
  },
  {
    id: 2,
    title: "New Employee Added",
    message: "Rahul Verma has been successfully added to the employee directory.",
    time: "10 min ago"
  },
  {
    id: 3,
    title: "Payroll Alert",
    message: "Payroll processing for March has started and requires review.",
    time: "30 min ago"
  },
  {
    id: 4,
    title: "Policy Update",
    message: "Leave policy draft has been updated. Please review and publish.",
    time: "1 hr ago"
  }
];

const buildSearchableText = (record) =>
  [record.fullName, record.email, record.employeeId, record.department, record.role, record.status]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const fallbackSearchRecords = [
  {
    id: "emp-1",
    fullName: "Aman Raj",
    email: "aman.raj@company.com",
    employeeId: "EMP-001",
    department: "Engineering",
    role: "Employee",
    status: "Active"
  },
  {
    id: "emp-2",
    fullName: "Pooja Sharma",
    email: "pooja@company.com",
    employeeId: "EMP-002",
    department: "HR",
    role: "Manager",
    status: "Active"
  },
  {
    id: "emp-3",
    fullName: "Vivek Kumar",
    email: "vivek.kumar@company.com",
    employeeId: "EMP-003",
    department: "Sales",
    role: "Team Lead",
    status: "Pending Invite"
  },
  {
    id: "emp-4",
    fullName: "Neha Mehta",
    email: "neha.mehta@company.com",
    employeeId: "EMP-004",
    department: "Operations",
    role: "Employee",
    status: "Inactive"
  }
].map((item) => ({ ...item, searchableText: buildSearchableText(item) }));

const normalizeEmployeeRecord = (entry, index) => {
  const source = entry?.employees || entry?.employee || entry || {};

  const normalized = {
    id: source?._id || entry?._id || `search-emp-${index}`,
    fullName: source?.fullName || source?.name || entry?.fullName || entry?.name || "",
    email: source?.workEmail || source?.email || entry?.email || "",
    employeeId: source?.employeeId || entry?.employeeId || "",
    department:
      source?.department?.name ||
      source?.department ||
      entry?.department?.name ||
      entry?.department ||
      "",
    role:
      source?.designation?.name ||
      source?.designation ||
      source?.role?.name ||
      source?.role ||
      entry?.designation?.name ||
      entry?.designation ||
      entry?.role ||
      "",
    status: source?.status || entry?.status || ""
  };

  normalized.searchableText = buildSearchableText(normalized);
  return normalized.searchableText ? normalized : null;
};

const Navbar = () => {
  const { isConfig } = useSelector((state) => state.sidebar)


  const { user, role } = useSelector((state) => state.user);
  const token = localStorage.getItem("authToken");

  console.log("user:", user)
  console.log("role:", role)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const searchDropdownRef = useRef(null);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchRecords, setSearchRecords] = useState(fallbackSearchRecords);


  function handleLogout() {

    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/login");
  }


  const handleProfileAction = (value) => {
    if (value === "config") {
      dispatch(setIsConfig(true));
    }

    if (value === "normal") {
      dispatch(setIsConfig(false));
    }
    if (value === "logout") {
      setIsLogoutModalOpen(true);
    }
    setIsProfileMenuOpen(false);
  };

  const handleSearchResultClick = (record) => {
    setSearchKeyword(record.fullName || record.email || "");
    setIsSearchOpen(false);
    navigate("/dashboard/employee", {
      state: {
        searchKeyword: record.fullName || record.email || "",
        fromNavbarSearch: true
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }

      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchSearchRecords = async () => {
  //     setIsSearchLoading(true);

  //     try {
  //       const axiosInstance = createAxios(token);
  //       const res = await axiosInstance.get("/employees/all", {
  //         meta: { auth: "ADMIN_AUTH" }
  //       });

  //       const records = Array.isArray(res?.data)
  //         ? res.data
  //           .map((item, index) => normalizeEmployeeRecord(item, index))
  //           .filter(Boolean)
  //         : [];

  //       if (isMounted) {
  //         setSearchRecords(records.length > 0 ? records : fallbackSearchRecords);
  //       }
  //     } catch (error) {
  //       console.log("navbar search fetch failed", error);
  //       if (isMounted) {
  //         setSearchRecords(fallbackSearchRecords);
  //       }
  //     } finally {
  //       if (isMounted) {
  //         setIsSearchLoading(false);
  //       }
  //     }
  //   };

  //   fetchSearchRecords();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [token]);

  // useEffect(() => {
  //   const keyword = searchKeyword.trim().toLowerCase();

  //   if (!keyword) {
  //     setSearchResults([]);
  //     return;
  //   }

  //   const filteredResults = searchRecords
  //     .filter((item) => item.searchableText.includes(keyword))
  //     .slice(0, 8);

  //   setSearchResults(filteredResults);
  // }, [searchKeyword, searchRecords]);

  // useEffect(() => {
  //   if (!isNotificationDrawerOpen) {
  //     return;
  //   }

  //   const previousBodyOverflow = document.body.style.overflow;

  //   const handleEsc = (event) => {
  //     if (event.key === "Escape") {
  //       setIsNotificationDrawerOpen(false);
  //     }
  //   };

  //   document.body.style.overflow = "hidden";
  //   document.addEventListener("keydown", handleEsc);

  //   return () => {
  //     document.body.style.overflow = previousBodyOverflow;
  //     document.removeEventListener("keydown", handleEsc);
  //   };
  // }, [isNotificationDrawerOpen]);


  return (
    <>
      {/* Navbar */}
      <header className='w-[100vw] h-[5rem] bg-[#ffffff] relative z-[1000] overflow-visible'>

        {/* Navbar inner Container */}
        <div className="innerNavContainer w-[100%] h-[100%] px-[1.5rem] py-[1.37rem] flex items-center justify-between relative z-[1001] overflow-visible">

          {/* Logo & menu button */}
          <div className="leftNavbarContainer h-[100%] flex items-center  gap-[1.25rem]">

            <div className="menuButtonContainer ">
              <IoMdMenu className='text-[1.7rem] cursor-pointer' onClick={() => dispatch(toggleMenu())} />
            </div>

            <div className="logoContainer">
              <Link href={`/dashboard`}>
                <img src={navbarLogo} alt={"logo_image"} className=' object-contain cursor-pointer select-none' />
              </Link>
            </div>

          </div>

          {/* search bar */}
          <div
            ref={searchDropdownRef}
            className="centerNavbarContainer relative w-[34.12rem] min-h-[2.25rem] flex items-center bg-[#F5F6F7] rounded-[0.5rem] px-3"
          >
            <img src={search} width={20} height={20} alt={"search_icons"} className='w-[1.25rem] h-[1.25rem] cursor-pointer select-none' />
            <input
              type="text"
              value={searchKeyword}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(event) => {
                setSearchKeyword(event.target.value);
                if (!isSearchOpen) {
                  setIsSearchOpen(true);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && searchResults.length > 0) {
                  handleSearchResultClick(searchResults[0]);
                }

                if (event.key === "Escape") {
                  setIsSearchOpen(false);
                }
              }}
              placeholder="Search employee, email, department, role, status"
              className="w-full bg-transparent pl-3 pr-1 text-[14px] text-[#111827] placeholder:text-[#797F8F] border-none shadow-none outline-none focus:outline-none focus:ring-0"
            />

            {isSearchOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-none z-[2100]">
                {searchKeyword.trim() === "" ? (
                  <div className="px-4 py-3 text-[12px] text-[#667085]">
                    Start typing to search employee details.
                  </div>
                ) : isSearchLoading ? (
                  <div className="px-4 py-3 text-[12px] text-[#667085]">
                    Loading records...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        onClick={() => handleSearchResultClick(result)}
                        className="w-full text-left px-4 py-2 border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors"
                      >
                        <p className="text-[13px] font-medium text-[#111827]">{result.fullName || "Employee"}</p>
                        <p className="text-[12px] text-[#667085]">
                          {[result.email, result.employeeId, result.department, result.role, result.status]
                            .filter(Boolean)
                            .join(" | ")}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-[12px] text-[#667085]">
                    No matching results found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile & notification Container */}
          <div className="rightNavbarContainer h-[100%] flex items-center gap-[1.5rem]">

            {/* notification container */}
            <button
              type="button"
              onClick={() => {
                setIsNotificationDrawerOpen((prev) => !prev);
                setIsProfileMenuOpen(false);
                setIsSearchOpen(false);
              }}
              className="notificationConatiner w-[1.4rem] h-[1.4rem] relative cursor-pointer border-none bg-transparent p-0 shadow-none outline-none focus:outline-none focus:ring-0"
              aria-label="Open notifications"
            >
              <img src={notification} width={20} height={20} alt={"notificatio_icon"} className='w-[100%] h-[100%] cursor-pointer select-none' />

              <div className="indicator w-[0.65rem] h-[0.625rem] rounded-[50%] bg-[#ffffff] absolute flex justify-center items-center top-[0rem] right-[0rem] p-[.1rem] ">
                <div className="colorIcon w-[100%] h-[100%] rounded-[50%] bg-[#f57600]"></div>
              </div>
            </button>

            {/* Profile Container */}
            <div ref={profileDropdownRef} className="profileContainer relative w-[4.37rem] h-[2.5rem] flex justify-between cursor-pointer">
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen((prev) => !prev);
                  setIsSearchOpen(false);
                }}
                className="absolute inset-0 w-full h-full border-none bg-transparent shadow-none outline-none focus:outline-none focus:ring-0 z-10"
                aria-label="Profile options"
              />


              {/* avatar Icon */}
              <div className="avatarContainer w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden z-0">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full rounded-full select-none"
                />
              </div>

              {/* arrow / text area */}
              <div className="avatarContainer w-[1.25rem] h-full flex justify-center items-center z-0">
                <span className="text-[10px]"><BiSolidDownArrow /></span>
              </div>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-[220px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-none z-[2000]">
                  <div className="w-full text-left px-4 py-2 text-sm text-[#111827] font-medium bg-blue-50">
                    {isConfig ? "Config" : "Normal"}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleProfileAction(isConfig ? "normal" : "config")}
                    className="w-full text-left px-4 py-2 text-sm text-[#111827] font-normal border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors"
                  >
                    {isConfig ? "Normal" : "Config"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProfileAction("logout")}
                    className="w-full text-left px-4 py-2 text-sm text-[#111827] font-normal border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}

            </div>


          </div>

        </div>

      </header>

      {/* Notification Drawer */}
      <div
        className={`fixed inset-0 z-[2500] ${isNotificationDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          type="button"
          onClick={() => setIsNotificationDrawerOpen(false)}
          aria-label="Close notifications drawer"
          className={`absolute inset-0 border-none bg-black/35 transition-opacity duration-300 ${
            isNotificationDrawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[92%] max-w-[380px] border-l border-[#E5E7EB] bg-white shadow-xl transition-transform duration-300 ${
            isNotificationDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-4">
            <div>
              <h2 className="text-[18px] font-semibold text-[#111827]">Notifications</h2>
              <p className="text-[12px] text-[#6B7280]">Latest updates and alerts</p>
            </div>
            <button
              type="button"
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#D1D5DB] bg-white text-[#4B5563] shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-[#F9FAFB]"
              aria-label="Close notification panel"
            >
              <RxCross2 />
            </button>
          </div>

          <div className="h-[calc(100%-76px)] overflow-y-auto p-4">
            {notificationItems.length > 0 ? (
              <div className="space-y-3">
                {notificationItems.map((item) => (
                  <div key={item.id} className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                    <h3 className="text-[14px] font-medium text-[#111827]">{item.title}</h3>
                    <p className="mt-1 text-[13px] text-[#4B5563]">{item.message}</p>
                    <p className="mt-2 text-[12px] text-[#6B7280]">{item.time}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-[14px] text-[#6B7280]">No new notifications</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40">
          <div className="w-[92%] max-w-[420px] rounded-xl bg-white p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-[#111827]">Confirm Logout</h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              Are you sure you want to logout?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-[#111827] shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-lg bg-[#0575E6] text-white border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-[#0463c4]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Navbar);
