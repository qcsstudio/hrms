import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import "jodit/es2021/jodit.min.css";
import createAxios from "../../../../utils/axios.config";

const getOfficeDisplayName = (office) =>
  office?.officeName || office?.name || office?.office || office?.title || "";

const getOfficeCountryName = (office) => {
  if (typeof office?.country === "string") return office.country;
  return (
    office?.country?.name ||
    office?.countryName ||
    office?.location?.country ||
    ""
  );
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

  Object.values(value).forEach((child) =>
    collectOfficeCandidates(child, bucket)
  );
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
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [letterContent, setLetterContent] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [companyOffices, setCompanyOffices] = useState([]);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [templateOfficeIds, setTemplateOfficeIds] = useState([]);

  const templateId = searchParams.get("id") || "";
  const mode = searchParams.get("mode") || "create";
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";

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

  useEffect(() => {
    if (!templateId || (!isEditMode && !isViewMode)) return;

    const fetchTemplate = async () => {
      try {
        setIsLoadingTemplate(true);
        const res = await axiosInstance.get(
          `/config/getOne-template/${templateId}`,
          {
            meta: { auth: "ADMIN_AUTH" },
          }
        );

        const item = res?.data?.data || res?.data || {};

        setCategory(item?.category || "");
        setTemplateName(item?.templateName || item?.name || "");
        setLetterContent(item?.letterContent || item?.content || "");
        setSubject(item?.email?.subject || item?.subject || "");
        setEmailBody(item?.email?.body || item?.emailBody || item?.body || "");
        setTemplateOfficeIds(
          Array.isArray(item?.companyOfficeId)
            ? item.companyOfficeId
                .map((office) => office?._id || office?.id || office)
                .filter(Boolean)
            : []
        );
      } catch (error) {
        console.log("template detail error", error);
      } finally {
        setIsLoadingTemplate(false);
      }
    };

    fetchTemplate();
  }, [isEditMode, isViewMode, templateId]);

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

  const editorConfig = useMemo(
    () => ({
      readonly: isLoadingTemplate || isViewMode,
      minHeight: 240,
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "align",
        "|",
        "link",
        "table",
        "|",
        "undo",
        "redo",
      ],
    }),
    [isLoadingTemplate, isViewMode]
  );

  const buildPayload = () => ({
    category: category.trim(),
    templateName: templateName.trim(),
    letterContent: letterContent.trim(),
    email: {
      subject: subject.trim(),
      body: emailBody.trim(),
    },
    companyOfficeId:
      resolvedCompanyOfficeIds.length > 0
        ? resolvedCompanyOfficeIds
        : templateOfficeIds,
  });

  const handleTemplateSave = async () => {
    const payload = buildPayload();

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

  const handleTemplateUpdate = async () => {
    if (!templateId) return;

    const payload = buildPayload();

    try {
      await axiosInstance.put(`/config/update-template/${templateId}`, payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
      navigate("/config/organise/template/list");
    } catch (error) {
      console.log("template update error", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-xl font-bold text-foreground mb-8">
        {isViewMode
          ? "View template"
          : isEditMode
          ? "Update template"
          : "Template creation"}
      </h1>

      <div
        className={`border rounded-xl p-6 mb-4 ${
          step >= 1 ? "border-primary/30 bg-card" : "border-border bg-muted/30"
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
                  disabled={isLoadingTemplate || isViewMode}
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
                  disabled={isLoadingTemplate || isViewMode}
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

            <div className="border border-red-500 rounded-lg overflow-hidden mb-2 bg-card [&_.jodit-container]:border-0 [&_.jodit-container]:shadow-none [&_.jodit-workplace]:min-h-[240px] [&_.jodit-toolbar__box]:overflow-x-auto [&_.jodit-toolbar__box]:rounded-none [&_.jodit-status-bar]:hidden [&_.jodit-status-bar]:border-0 [&_.jodit-workplace+div]:hidden">
              <JoditEditor
                value={letterContent}
                config={{
                  ...editorConfig,
                  placeholder: "Start typing your letter content...",
                }}
                onBlur={(newContent) => setLetterContent(newContent)}
              />
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-5">
              <span className="text-warning">*</span>
              {"Press ' { } ' to see a selectable list of all possible placeholder variables."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (typeof onCancel === "function") {
                    onCancel();
                    return;
                  }
                  navigate("/config/organise/template/list");
                }}
                className="px-5 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                {isViewMode ? "Back" : "Preview"}
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
                  disabled={isLoadingTemplate || isViewMode}
                  className="flex-1 border border-border rounded-lg px-3 py-2.5 text-sm bg-card text-foreground"
                />

                <button className="text-sm text-muted-foreground px-2 py-2 hover:text-foreground">
                  {`{}`}
                </button>
              </div>

              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
                <span className="text-warning">*</span>
                This subject will be visible to the employee when the letter is
                sent.
              </p>
            </div>

            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Body
              </label>

              <div className="border border-border rounded-lg overflow-hidden bg-card [&_.jodit-container]:border-0 [&_.jodit-container]:shadow-none [&_.jodit-workplace]:min-h-[240px] [&_.jodit-toolbar__box]:overflow-x-auto [&_.jodit-toolbar__box]:rounded-none [&_.jodit-status-bar]:hidden [&_.jodit-status-bar]:border-0 [&_.jodit-workplace+div]:hidden">
                <JoditEditor
                  value={emailBody}
                  config={{
                    ...editorConfig,
                    placeholder: "Compose email body...",
                  }}
                  onBlur={(newContent) => setEmailBody(newContent)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  isViewMode
                    ? navigate("/config/organise/template/list")
                    : setStep(1)
                }
                className="px-5 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                {isViewMode ? "Back" : "Cancel"}
              </button>

              {!isViewMode && (
                <button
                  onClick={isEditMode ? handleTemplateUpdate : handleTemplateSave}
                  className="bg-blue-600 text-white px-8 py-2 rounded"
                >
                  {isEditMode ? "Update" : "Save"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
