import { useState } from "react";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const ChevronRight = ({ style }) => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={style}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);
const ImageIcon = () => (
  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{opacity:0.4}}>
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);
const CheckCircle = () => (
  <svg width="18" height="18" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const Input = ({ value, onChange, placeholder }) => (
  <input
    value={value} onChange={onChange} placeholder={placeholder}
    style={{
      flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0",
      borderRadius: 8, fontSize: 14, outline: "none", background: "#fff",
      color: "#1e293b", transition: "border .15s",
    }}
    onFocus={e => e.target.style.borderColor = "#6366f1"}
    onBlur={e => e.target.style.borderColor = "#e2e8f0"}
  />
);

const Select = ({ value, onChange, options, placeholder }) => (
  <select
    value={value} onChange={e => onChange(e.target.value)}
    style={{
      flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0",
      borderRadius: 8, fontSize: 14, outline: "none", background: "#fff",
      color: value ? "#1e293b" : "#94a3b8", cursor: "pointer",
    }}
  >
    <option value="">{placeholder || "Select"}</option>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

const Btn = ({ children, variant = "primary", size = "md", onClick }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    borderRadius: 8, fontWeight: 600, cursor: "pointer",
    fontSize: size === "sm" ? 13 : 14,
    padding: size === "sm" ? "6px 14px" : "8px 18px",
    transition: "all .15s",
  };
  const styles = {
    primary: { background: "#6366f1", color: "#fff", border: "none" },
    outline: { background: "#fff", color: "#374151", border: "1px solid #e2e8f0" },
    destructive: { background: "#ef4444", color: "#fff", border: "none" },
  };
  return <button style={{ ...base, ...styles[variant] }} onClick={onClick}>{children}</button>;
};

const Switch = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    style={{
      width: 44, height: 24, borderRadius: 12, cursor: "pointer",
      background: checked ? "#6366f1" : "#cbd5e1",
      position: "relative", transition: "background .2s",
    }}
  >
    <div style={{
      position: "absolute", top: 3, left: checked ? 23 : 3,
      width: 18, height: 18, borderRadius: "50%", background: "#fff",
      transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)",
    }} />
  </div>
);

const Badge = ({ children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
    border: "1px solid #22c55e", color: "#16a34a", background: "#f0fdf4",
  }}>{children}</span>
);

const Divider = () => <div style={{ borderBottom: "1px solid #e2e8f0", marginBottom: 24 }} />;
const RowDivider = () => <div style={{ borderBottom: "1px solid #f1f5f9" }} />;

// ─── PROFILE SETTINGS ─────────────────────────────────────────────────────────
const ProfileSettings = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", country: "", state: "", city: "", zip: "",
  });
  const set = (f, v) => setForm(p => ({ ...p, [f]: v }));

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>Profile Settings</h2>
      <Divider />

      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 16 }}>Basic Information</h3>
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            border: "2px dashed #cbd5e1", background: "#f8fafc",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ImageIcon />
          </div>
          <div>
            <p style={{ fontWeight: 600, color: "#1e293b", marginBottom: 2 }}>Profile Photo</p>
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 10 }}>Recommended image size is 40px × 40px</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn size="sm">Upload</Btn>
              <Btn size="sm" variant="outline">Cancel</Btn>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px", marginBottom: 32 }}>
        {[
          ["firstName", "First Name"], ["lastName", "Last Name"],
          ["email", "Email"], ["phone", "Phone"],
        ].map(([field, label]) => (
          <div key={field} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <label style={{ width: 100, fontSize: 14, fontWeight: 600, color: "#374151", flexShrink: 0 }}>{label}</label>
            <Input value={form[field]} onChange={e => set(field, e.target.value)} />
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 16 }}>Address Information</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px" }}>
        <div style={{ gridColumn: "1/-1", display: "flex", alignItems: "center", gap: 16 }}>
          <label style={{ width: 100, fontSize: 14, fontWeight: 600, color: "#374151", flexShrink: 0 }}>Address</label>
          <Input value={form.address} onChange={e => set("address", e.target.value)} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <label style={{ width: 100, fontSize: 14, fontWeight: 600, color: "#374151", flexShrink: 0 }}>Country</label>
          <Select value={form.country} onChange={v => set("country", v)}
            options={[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"}]} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <label style={{ width: 100, fontSize: 14, fontWeight: 600, color: "#374151", flexShrink: 0 }}>State</label>
          <Select value={form.state} onChange={v => set("state", v)}
            options={[{value:"ny",label:"New York"},{value:"ca",label:"California"}]} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <label style={{ width: 100, fontSize: 14, fontWeight: 600, color: "#374151", flexShrink: 0 }}>City</label>
          <Input value={form.city} onChange={e => set("city", e.target.value)} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <label style={{ width: 100, fontSize: 14, fontWeight: 600, color: "#374151", flexShrink: 0 }}>Zip Code</label>
          <Input value={form.zip} onChange={e => set("zip", e.target.value)} />
        </div>
      </div>
    </div>
  );
};

// ─── SECURITY SETTINGS ────────────────────────────────────────────────────────
const SecuritySettings = () => {
  const [googleAuth, setGoogleAuth] = useState(true);

  const Row = ({ title, desc, badge, check, extra, action }) => (
    <div style={{ padding: "20px 0", borderBottom: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>{title}</h3>
            {badge && <Badge><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display:"inline-block" }} />Connected</Badge>}
            {check && <CheckCircle />}
          </div>
          <p style={{ fontSize: 13, color: "#94a3b8" }}>{desc}</p>
          {extra && <div style={{ marginTop: 10, display: "flex", gap: 8 }}>{extra}</div>}
        </div>
        <div>{action}</div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>Security Settings</h2>
      <Divider />

      <Row title="Password"
        desc="Set a unique password to protect the account  |  Last Changed 03 Jan 2024, 09:00 AM"
        action={<Btn>Change Password</Btn>} />

      <Row title="Two Factor Authentication"
        desc="Receive codes via SMS or email every time you login"
        action={<Btn>Enable</Btn>} />

      <Row title="Google Authentication"
        desc="Connect to Google" badge
        action={<Switch checked={googleAuth} onChange={() => setGoogleAuth(p => !p)} />} />

      <Row title="Phone Number Verification"
        desc="The Phone Number associated with the account  |  Verified Mobile Number : +99264710583"
        check
        extra={[<Btn key="r" variant="outline" size="sm">Remove</Btn>, <Btn key="c" size="sm">Change</Btn>]} />

      <Row title="Email Verification"
        desc="The email address associated with the account  |  Verified Email : info@example.com"
        check
        action={<div style={{ display: "flex", gap: 8 }}><Btn variant="outline" size="sm">Remove</Btn><Btn size="sm">Change</Btn></div>} />

      <Row title="Device Management"
        desc="The devices associated with the account"
        action={<Btn>Manage</Btn>} />

      <Row title="Account Activity"
        desc="The activities of the account"
        action={<Btn>View</Btn>} />

      <Row title="Deactivate Account"
        desc="This will shutdown your account. Your account will be reactive when you sign in again"
        action={<Btn>Deactivate</Btn>} />

      <div style={{ padding: "20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>Delete Account</h3>
            <p style={{ fontSize: 13, color: "#94a3b8" }}>Your account will be permanently deleted</p>
          </div>
          <Btn variant="destructive">Delete</Btn>
        </div>
      </div>
    </div>
  );
};

// ─── NOTIFICATION SETTINGS ────────────────────────────────────────────────────
const initialNotifications = [
  { title: "New Hire and Onboarding Notifications", description: "Alerts when a new hire is added to the system.", push: true, sms: true, email: true },
  { title: "Time Off and Leave Requests", description: "Notifications when leave requests are approved or rejected.", push: true, sms: true, email: true },
  { title: "Employee Performance and Review Updates", description: "Notifications when performance reviews are updated.", push: true, sms: true, email: true },
  { title: "Payroll and Compensation", description: "Alerts when payroll is processed or pending approval.", push: true, sms: true, email: true },
  { title: "Job Applications and Recruitment", description: "Alerts for new applications or stage updates.", push: true, sms: true, email: true },
];

const NotificationSettings = () => {
  const [notifs, setNotifs] = useState(initialNotifications);
  const toggle = (i, f) => setNotifs(p => p.map((n, idx) => idx === i ? { ...n, [f]: !n[f] } : n));

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>Notifications</h2>
      <Divider />
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 80px 80px 80px",
          background: "#f8fafc", padding: "12px 24px",
          fontSize: 13, fontWeight: 700, color: "#374151", borderBottom: "1px solid #e2e8f0",
        }}>
          <span>Modules</span>
          <span style={{ textAlign: "center" }}>Push</span>
          <span style={{ textAlign: "center" }}>SMS</span>
          <span style={{ textAlign: "center" }}>Email</span>
        </div>
        {notifs.map((n, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr 80px 80px 80px",
            padding: "16px 24px", alignItems: "center",
            borderBottom: i < notifs.length - 1 ? "1px solid #f1f5f9" : "none",
          }}>
            <div>
              <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 14, marginBottom: 2 }}>{n.title}</p>
              <p style={{ fontSize: 13, color: "#94a3b8" }}>{n.description}</p>
            </div>
            {["push", "sms", "email"].map(f => (
              <div key={f} style={{ display: "flex", justifyContent: "center" }}>
                <Switch checked={n[f]} onChange={() => toggle(i, f)} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const sidebarItems = [
  { key: "profile", label: "Profile Settings" },
  { key: "security", label: "Security Settings" },
  { key: "notifications", label: "Notifications" },
];

const breadcrumbLabels = {
  profile: "Profile Settings",
  security: "Security",
  notifications: "Notification",
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{  margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b" }}>Settings</h1>
          <button style={{
            padding: 8, border: "1px solid #e2e8f0", borderRadius: 8,
            background: "#fff", cursor: "pointer", display: "flex",
          }}>
            <ChevronRight style={{ transform: "rotate(-90deg)" }} />
          </button>
        </div>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>
          <HomeIcon />
          <ChevronRight />
          <span>General Settings</span>
          <ChevronRight />
          <span style={{ color: "#1e293b", fontWeight: 500 }}>{breadcrumbLabels[activeTab]}</span>
        </div>

        {/* Tab button */}
        <div style={{ marginBottom: 24 }}>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 10,
            background: "#6366f1", color: "#fff", fontWeight: 600, fontSize: 14,
            border: "none", cursor: "pointer",
          }}>
            <SettingsIcon /> General Settings
          </button>
        </div>

        {/* Layout */}
        <div style={{ display: "flex", gap: 24 }}>
          {/* Sidebar */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", padding: 8 }}>
              {sidebarItems.map(item => (
                <button key={item.key} onClick={() => setActiveTab(item.key)}
                  style={{
                    width: "100%", textAlign: "left", padding: "10px 14px",
                    borderRadius: 8, fontSize: 14, cursor: "pointer", border: "none",
                    background: activeTab === item.key ? "#eef2ff" : "transparent",
                    color: activeTab === item.key ? "#6366f1" : "#64748b",
                    fontWeight: activeTab === item.key ? 700 : 400,
                    transition: "all .15s",
                  }}
                >
                  {activeTab === item.key && <span style={{ marginRight: 6 }}>»</span>}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div style={{
            flex: 1, border: "1px solid #e2e8f0", borderRadius: 16,
            background: "#fff", padding: 32, position: "relative",
          }}>
            <button style={{
              position: "absolute", top: 16, right: 16,
              width: 40, height: 40, borderRadius: 10,
              background: "#6366f1", color: "#fff", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <SettingsIcon />
            </button>

            {activeTab === "profile" && <ProfileSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
          </div>
        </div>
      </div>
    </div>
  );
  }