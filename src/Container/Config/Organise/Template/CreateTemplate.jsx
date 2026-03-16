import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

const getOfficeDisplayName = (office) =>
  office?.officeName || office?.name || office?.office || office?.title || "";

const getOfficeCountryName = (office) => {
  if (typeof office?.country === "string") return office.country;
  return office?.country?.name || office?.countryName || office?.location?.country || "";
};

const collectOfficeCandidates = (value, bucket) => {
  if (!value) return;

  if (Array.isArray(value)) {
    value.forEach((item) => collectOfficeCandidates(item, bucket));
    return;
  }

  if (typeof value !== "object") return;

  const hasId = Boolean(value?._id || value?.id);
  const hasName = Boolean(getOfficeDisplayName(value));

  if (hasId && hasName) {
    bucket.push(value);
  }

  Object.values(value).forEach((child) => collectOfficeCandidates(child, bucket));
};

const extractCompanyOffices = (payload) => {
  const collected = [];
  collectOfficeCandidates(payload, collected);

  const dedupe = new Map();
  collected.forEach((item) => {
    const id = item?._id || item?.id;
    if (!id || dedupe.has(id)) return;

    dedupe.set(id, {
      id,
      name: getOfficeDisplayName(item),
      country: getOfficeCountryName(item),
    });
  });

  return Array.from(dedupe.values());
};

export default function CreateTemplate({ onCancel, onSave }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [letterContent, setLetterContent] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [companyOffices, setCompanyOffices] = useState([]);

  const selectedCountry = location.state?.country || "";
  const selectedOffice = location.state?.office || "";

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axiosInstance.get("/config/company-offices-data", {
          meta: { auth: "ADMIN_AUTH" },
        });
        setCompanyOffices(extractCompanyOffices(res?.data));
      } catch (error) {
        setCompanyOffices([]);
      }
    };

    fetchOffices();
  }, []);

  const resolvedCompanyOfficeIds = useMemo(() => {
    if (!selectedCountry) return [];

    const matched = companyOffices
      .filter((office) => {
        const sameCountry =
          (office.country || "").trim().toLowerCase() ===
          selectedCountry.trim().toLowerCase();

        if (!sameCountry) return false;
        if (selectedOffice === "ALL") return true;

        return (
          (office.name || "").trim().toLowerCase() ===
          selectedOffice.trim().toLowerCase()
        );
      })
      .map((office) => office.id);

    if (matched.length > 0) return matched;

    if (selectedOffice && /^[a-f\d]{24}$/i.test(selectedOffice)) {
      return [selectedOffice];
    }

    return [];
  }, [companyOffices, selectedCountry, selectedOffice]);

  const handleTemplateSave = async () => {
    const payload = {
      category: category.trim(),
      templateName: templateName.trim(),
      letterContent: letterContent.trim(),
      email: {
        subject: subject.trim(),
        body: emailBody.trim(),
      },
      companyOfficeId: resolvedCompanyOfficeIds,
    };

    try {
      await axiosInstance.post("/config/create-template", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });

      if (typeof onSave === "function") {
        onSave(payload);
      } else {
        navigate("/config/organise/template/list");
      }
    } catch (error) {
      console.log("template create error", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-xl font-bold text-foreground mb-8">
        Template creation
      </h1>

      {/* STEP 1 */}
      <div
        className={`border rounded-xl p-6 mb-4 ${
          step >= 1
            ? "border-primary/30 bg-card"
            : "border-border bg-muted/30"
        }`}
      >
        <div className="flex items-center gap-3 mb-5">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 1
                ? "border-2 border-primary text-primary"
                : "border-2 border-muted-foreground/30 text-muted-foreground"
            }`}
          >
            1
          </span>

          <h2 className="text-base font-semibold text-foreground">
            Compose letter
          </h2>
        </div>

        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-card text-foreground"
                >
                  <option value="">Select category</option>
                  <option value="Increments/Bonuses">
                    Increments/Bonuses
                  </option>
                  <option value="Promotions">Promotions</option>
                  <option value="Termination">Termination</option>
                  <option value="Onboarding">Onboarding</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Template name
                </label>

                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-card text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <p className="text-xs text-primary mb-2 cursor-pointer hover:underline">
              Do not find a category of your suiting? Request here.
            </p>

            <p className="text-sm text-foreground mb-3">
              Make a contextual letter by using variables as placeholders.
            </p>

            {/* TEXT EDITOR */}
            <div className="border border-border rounded-lg overflow-hidden mb-2">
              
              {/* CUSTOM TOOLBAR */}
              <div className="flex flex-wrap gap-2 border-b border-border bg-muted/40 px-3 py-2 text-sm">
                <button className="px-2 py-1 rounded hover:bg-muted font-bold">
                  B
                </button>

                <button className="px-2 py-1 rounded hover:bg-muted italic">
                  I
                </button>

                <button className="px-2 py-1 rounded hover:bg-muted underline">
                  U
                </button>

                <button className="px-2 py-1 rounded hover:bg-muted">
                  • List
                </button>

                <button className="px-2 py-1 rounded hover:bg-muted">
                  1. List
                </button>

                <button className="px-2 py-1 rounded hover:bg-muted">
                  Link
                </button>

                <button className="px-2 py-1 rounded hover:bg-muted">
                  Align
                </button>
              </div>

              <textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                className="w-full h-32 px-3 py-3 text-sm bg-card text-foreground resize-y border-0 outline-none"
                placeholder="Start typing your letter content..."
              />
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-5">
              <span className="text-warning">★</span>
              {"Press ' { } ' to see a selectable list of all possible placeholder variables."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (typeof onCancel === "function") {
                    onCancel();
                    return;
                  }
                  navigate("/config/organise/template");
                }}
                className="px-5 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                Preview
              </button>

              <button
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white px-8 py-2 rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* STEP 2 */}
      <div
        className={`border rounded-xl p-6 ${
          step >= 2
            ? "border-primary/30 bg-card"
            : "border-border bg-muted/30 opacity-60"
        }`}
      >
        <div className="flex items-center gap-3 mb-5">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 2
                ? "border-2 border-primary text-primary"
                : "border-2 border-muted-foreground/30 text-muted-foreground"
            }`}
          >
            2
          </span>

          <h2 className="text-base font-semibold text-foreground">
            Compose email
          </h2>
        </div>

        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Subject
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 border border-border rounded-lg px-3 py-2.5 text-sm bg-card text-foreground"
                />

                <button className="text-sm text-muted-foreground px-2 py-2 hover:text-foreground">
                  {`{}`}
                </button>
              </div>

              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
                <span className="text-warning">★</span>
                This subject will be visible to the employee when the letter is
                sent.
              </p>
            </div>

            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Body
              </label>

              <div className="border border-border rounded-lg overflow-hidden">

                {/* TOOLBAR */}
                <div className="flex flex-wrap gap-2 border-b border-border bg-muted/40 px-3 py-2 text-sm">
                  <button className="px-2 py-1 rounded hover:bg-muted font-bold">
                    B
                  </button>

                  <button className="px-2 py-1 rounded hover:bg-muted italic">
                    I
                  </button>

                  <button className="px-2 py-1 rounded hover:bg-muted underline">
                    U
                  </button>

                  <button className="px-2 py-1 rounded hover:bg-muted">
                    • List
                  </button>

                  <button className="px-2 py-1 rounded hover:bg-muted">
                    1. List
                  </button>

                  <button className="px-2 py-1 rounded hover:bg-muted">
                    Link
                  </button>
                </div>

                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full h-32 px-3 py-3 text-sm bg-card text-foreground resize-y border-0 outline-none"
                  placeholder="Compose email body..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleTemplateSave}
                className="bg-blue-600 text-white px-8 py-2 rounded"
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
