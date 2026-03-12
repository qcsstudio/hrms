import { createPortal } from "react-dom";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "--";

const AssignedEmployeesDrawer = ({ isOpen, onClose, department }) => {
  const employees = department?.assignedEmployees || [];

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <div
      className={`fixed inset-0 z-[2600] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        onClick={onClose}
        className={`absolute inset-0 bg-black/35 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close assigned employee drawer"
      />

      <aside
        className={`absolute right-0 top-0 h-full w-[92%] max-w-[420px] border-l border-gray-200 bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Assigned Employees</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {department?.name || "Department"} - {employees.length} employees
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            aria-label="Close drawer"
          >
            <RxCross2 className="h-4 w-4" />
          </button>
        </div>

        <div className="h-[calc(100%-72px)] overflow-y-auto p-5">
          {employees.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-500">
              No employees assigned to this department.
            </div>
          ) : (
            <div className="space-y-3">
              {employees.map((employee, index) => (
                <div
                  key={`${employee.name}-${index}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center">
                    {getInitials(employee.name)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                    <p className="text-xs text-gray-500">Employee</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>,
    document.body
  );
};

export default AssignedEmployeesDrawer;
