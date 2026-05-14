import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from "../../../utils/axios.config";

const uid = () => Math.random().toString(36).slice(2, 9);
const blankQuestion = () => {
  const opts = Array.from({ length: 4 }, () => ({ id: uid(), text: "" }));
  return { id: uid(), text: "", options: opts, correctOptionId: null };
};

export default function SurveyQuestions() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);
  const [questions, setQuestions] = useState([blankQuestion()]);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateQ = (qid, patch) =>
    setQuestions((qs) => qs.map((q) => (q.id === qid ? { ...q, ...patch } : q)));

  const addQuestion = () => setQuestions((qs) => [...qs, blankQuestion()]);
  const removeQuestion = (qid) =>
    setQuestions((qs) => (qs.length > 1 ? qs.filter((q) => q.id !== qid) : qs));

  const addOption = (qid) => {
    const q = questions.find((q) => q.id === qid);
    updateQ(qid, { options: [...q.options, { id: uid(), text: "" }] });
  };

  const removeOption = (qid, oid) => {
    const q = questions.find((x) => x.id === qid);
    if (q.options.length <= 2) return;
    updateQ(qid, {
      options: q.options.filter((o) => o.id !== oid),
      correctOptionId: q.correctOptionId === oid ? null : q.correctOptionId,
    });
  };

  const updateOption = (qid, oid, text) => {
    const q = questions.find((x) => x.id === qid);
    updateQ(qid, { options: q.options.map((o) => (o.id === oid ? { ...o, text } : o)) });
  };

  const buildQuestionPayload = (question, index) => {
    const options = question.options.map((option, optionIndex) => ({
      id: String(optionIndex + 1),
      text: option.text.trim(),
      isCorrect: question.correctOptionId === option.id,
    }));
    const correctOptionIndex = question.options.findIndex(
      (option) => option.id === question.correctOptionId
    );

    return {
      text: question.text.trim(),
      options,
      correctOptionId: String(correctOptionIndex + 1),
      ratingScale: 5,
      hasComment: true,
      order: index + 1,
      status: "active",
    };
  };

  const buildPayload = () => ({
    questions: questions.map((question, index) => buildQuestionPayload(question, index)),
  });

  const handleCreate = async () => {
    for (const q of questions) {
      if (!q.text.trim()) return showToast("Each question needs text");
      if (q.options.some((o) => !o.text.trim()))
        return showToast("Fill all option fields or remove empty ones");
      if (!q.correctOptionId)
        return showToast("Mark one correct option per question");
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/auth/createQuestions-survey", buildPayload(), {
        meta: { auth: "ADMIN_AUTH" },
      });

      if (response?.data?.success) {
        navigate("/dashboard/performance");
        return;
      }

      showToast(`Survey created with ${questions.length} question(s)!`, "success");
    } catch (error) {
      console.error("Create survey questions API failed:", error);
      showToast(error?.response?.data?.message || "Question creation failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          padding: "12px 20px", borderRadius: 8, fontWeight: 500, fontSize: 14,
          background: toast.type === "success" ? "#059669" : "#dc2626",
          color: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.2s ease"
        }}>
          {toast.msg}
        </div>
      )}

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <button
              onClick={() => navigate("/dashboard/survey")}
              style={{
              display: "flex", alignItems: "center", gap: 4, fontSize: 13,
              color: "#6b7280", background: "none", border: "none", cursor: "pointer", marginBottom: 8, padding: 0
            }}>
              ← Back to setup
            </button>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: "#111827" }}>Build Survey Questions</h1>
            <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>
              Add questions, provide options, and mark the correct answer.
            </p>
          </div>
          <span style={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap", paddingTop: 4 }}>
            {questions.length} question{questions.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {questions.map((q, qIdx) => (
            <div key={q.id} style={{
              background: "#fff", borderRadius: 12, padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
            }}>
              {/* Question header */}
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                    Question {qIdx + 1}
                  </label>
                  <input
                    value={q.text}
                    onChange={(e) => updateQ(q.id, { text: e.target.value })}
                    placeholder="Enter your question"
                    style={{
                      width: "100%", boxSizing: "border-box", padding: "9px 12px",
                      border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14,
                      outline: "none", background: "#f9fafb", color: "#111827"
                    }}
                  />
                </div>
                <button
                  onClick={() => removeQuestion(q.id)}
                  disabled={questions.length === 1}
                  style={{
                    background: "none", border: "none", cursor: questions.length === 1 ? "not-allowed" : "pointer",
                    padding: 6, marginTop: 20, opacity: questions.length === 1 ? 0.3 : 1,
                    color: "#ef4444"
                  }}
                  title="Remove question"
                >
                  🗑
                </button>
              </div>

              {/* Options */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
                  Options (select the correct one)
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {q.options.map((o, oIdx) => {
                    const isCorrect = q.correctOptionId === o.id;
                    return (
                      <div key={o.id} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        border: `1.5px solid ${isCorrect ? "#10b981" : "#e5e7eb"}`,
                        borderRadius: 8, padding: "8px 10px",
                        background: isCorrect ? "#f0fdf4" : "#f9fafb"
                      }}>
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={isCorrect}
                          onChange={() => updateQ(q.id, { correctOptionId: o.id })}
                          style={{ accentColor: "#10b981", width: 16, height: 16, cursor: "pointer", flexShrink: 0 }}
                        />
                        <input
                          value={o.text}
                          onChange={(e) => updateOption(q.id, o.id, e.target.value)}
                          placeholder={`Option ${oIdx + 1}`}
                          style={{
                            flex: 1, border: "none", background: "transparent",
                            fontSize: 14, outline: "none", color: "#111827"
                          }}
                        />
                        {isCorrect && <span style={{ color: "#10b981", fontSize: 16 }}>✓</span>}
                        <button
                          onClick={() => removeOption(q.id, o.id)}
                          disabled={q.options.length <= 2}
                          style={{
                            background: "none", border: "none", cursor: q.options.length <= 2 ? "not-allowed" : "pointer",
                            color: "#9ca3af", fontSize: 16, padding: 2,
                            opacity: q.options.length <= 2 ? 0.3 : 1
                          }}
                        >×</button>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => addOption(q.id)}
                  style={{
                    marginTop: 10, display: "flex", alignItems: "center", gap: 4,
                    padding: "7px 14px", border: "1px solid #e5e7eb", borderRadius: 8,
                    background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer",
                    fontWeight: 500
                  }}
                >
                  + Add option
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid #e5e7eb", marginTop: 24, paddingTop: 20
        }}>
          <button
            onClick={addQuestion}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "9px 18px", border: "1px solid #e5e7eb", borderRadius: 8,
              background: "#fff", fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer"
            }}
          >
            + Add question
          </button>
          <button
            onClick={handleCreate}
            disabled={isSubmitting}
            style={{
              padding: "9px 22px", borderRadius: 8, border: "none",
              background: "#059669", color: "#fff", fontSize: 14,
              fontWeight: 600, cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? "Creating..." : "Create Survey"}
          </button>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </div>
  );
}
