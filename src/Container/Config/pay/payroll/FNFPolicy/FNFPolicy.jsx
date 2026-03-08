
import { useState } from "react";
import { createPortal } from "react-dom";

export default function FNFPolicy() {
  const [view, setView] = useState("list");
  const [showFormula, setShowFormula] = useState(false);
  const [showLearn, setShowLearn] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const policies = [
    {
      id: 1,
      name: "Salary Structure Name",
      date: "12 Jun 2025 11:10 AM",
    },
    {
      id: 2,
      name: "Salary Structure Name",
      date: "12 Jun 2025 11:10 AM",
    },
  ];

  const faq = [
    "What is Gratuity ?",
    "What is Gratuity Act, 1972 ?",
    "When you will Receive Gratuity ?",
    "How is Gratuity Paid ?",
    "Tax on Gratuity Payment ?",
  ];

  /* -----------------------
      LIST PAGE
  ------------------------*/

  if (view === "list") {
    return (
      <div className="p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">FnF Policy</h1>
            <p className="text-gray-500 text-sm">
              Manage employee directory, documents, and role-based actions.
            </p>
          </div>

          <button
            onClick={() => setView("create")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full"
          >
            Create +
          </button>
        </div>

        {/* Table Header */}

        <div className="grid grid-cols-4 text-sm text-gray-500 border-b pb-3">
          <span>FNF Policy Name</span>
          <span>Created By</span>
          <span>Assigned Employee</span>
          <span className="text-right">Action</span>
        </div>

        {/* Rows */}

        <div className="space-y-4 mt-4">
          {policies.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 items-center border rounded-lg p-4 bg-white"
            >
              {/* Name */}

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>

              {/* Created by */}

              <div>
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="w-9 h-9 rounded-full"
                />
              </div>

              {/* Assigned */}

              <div className="flex -space-x-2 items-center">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/40?img=4"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-xs ml-2">
                  +12
                </div>
              </div>

              {/* Actions */}

              <div className="flex justify-end gap-3">
                <button className="p-2 hover:bg-gray-100 rounded">
                  ✏️
                </button>

                <button className="p-2 hover:bg-gray-100 rounded">
                  ⋮
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* -----------------------
        CREATE PAGE
  ------------------------*/

  return (
    <div className="p-8 space-y-6 relative">

      <div>
        <h1 className="text-2xl font-semibold">FnF Policy</h1>
        <p className="text-gray-500 text-sm">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Policy Name */}

      <div>
        <label className="text-sm font-medium">FnF policy name</label>
        <input
          className="w-full border rounded-lg px-4 py-2 mt-1"
          placeholder="Choose Account"
        />
      </div>

      {/* Basic Pay */}

      <div>
        <label className="text-sm font-semibold">Basic Pay</label>

        <div className="border rounded-lg p-4 mt-2 flex items-center gap-3">
          <input type="radio" checked readOnly />
          <span>Yes</span>
        </div>

        <div className="border rounded-lg p-4 mt-2 flex items-center gap-3 text-gray-500">
          <input type="radio" readOnly />
          <span>No</span>
          <span className="text-sm">
            Employee will continue to receive salary during notice period
          </span>
        </div>
      </div>

      {/* FnF Days */}

      <div>
        <label className="text-sm">
          How many days after exit date do you want to process FnF payments?
        </label>

        <div className="flex items-center gap-2 mt-2">
          <input
            className="border rounded-lg px-4 py-2 w-48"
            placeholder="Choose Account"
          />
          <span className="text-gray-500 text-sm">Days</span>
        </div>
      </div>

      {/* Gratuity */}

      <div>
        <label className="text-sm">
          Would you like to pay accrual Gratuity to employees?
        </label>

        <div className="border rounded-lg p-4 mt-2 flex items-center gap-3">
          <input type="radio" checked readOnly />
          <span>Yes</span>
        </div>

        {/* Threshold */}

        <div className="mt-4">
          <label className="text-sm">
            What is the threshold years & months for payment of accrued Gratuity?
          </label>

          <div className="flex gap-3 mt-2">
            <input className="border rounded-lg px-4 py-2 w-40" placeholder="Years"/>
            <input className="border rounded-lg px-4 py-2 w-40" placeholder="Months"/>
          </div>
        </div>

        {/* Non CTC */}

        <div className="mt-4">
          <label className="text-sm">
            Would you like to pay Gratuity to employee as a Non-CTC payment and
            with no-impact on their salary breakdown?
          </label>

          <div className="border rounded-lg p-4 mt-2 flex items-center gap-3">
            <input type="radio" checked readOnly />
            <span>Yes</span>
          </div>

          {/* Info Cards */}

          <div className="space-y-3 mt-4">

            <div className="border rounded-lg p-4 flex justify-between items-center">
              <span>Want to learn more about how gratuity is calculated?</span>

              <button
                onClick={() => setShowFormula(true)}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                View Formula
              </button>
            </div>

            <div className="border rounded-lg p-4 flex justify-between items-center">
              <span>Have further questions about Gratuity?</span>

              <button
                onClick={() => setShowLearn(true)}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Learn More
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Buttons */}

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => setView("list")}
          className="border px-5 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => setView("list")}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* FORMULA DRAWER */}

      {showFormula && createPortal (
        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFormula(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[420px] bg-white shadow-lg p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Gratuity Formula</h2>
              <button onClick={() => setShowFormula(false)}>✕</button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg space-y-4">

              <p className="text-sm">
                Gratuity is calculated differently based on the number of employees.
              </p>

              <div>
                <p className="text-sm font-medium">Employee count &gt; 10</p>
                <div className="border rounded-lg p-3 mt-1 text-sm bg-white">
                  (15 × Salary × Working Years) / 26
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Employee Count ≤ 10</p>
                <div className="border rounded-lg p-3 mt-1 text-sm bg-white">
                  (15 × Salary × Working Years) / 30
                </div>
              </div>

              <p className="text-sm">
                *Remainder period of over 6 months will be counted as 1 working year.
              </p>

            </div>

          </div>

        </div>,document.body
      )}

      {/* LEARN MORE DRAWER */}

      {showLearn && createPortal (
        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowLearn(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[420px] bg-white shadow-lg p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Learn More About Gratuity</h2>
              <button onClick={() => setShowLearn(false)}>✕</button>
            </div>

            {faq.map((item, i) => (
              <div key={i} className="border rounded-lg mb-3">

                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex justify-between items-center p-3"
                >
                  {item}
                  <span>{expanded === i ? "▲" : "▼"}</span>
                </button>

                {expanded === i && (
                  <div className="p-3 text-sm text-gray-600 border-t">
                    Example explanation text about gratuity.
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>,document.body
      )}

    </div>
  );
}
