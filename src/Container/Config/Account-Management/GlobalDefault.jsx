import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import createAxios from "../../../utils/axios.config";
import { useSelector } from "react-redux";

const GlobalDefaults = () => {
  const { token } = useSelector(state => state.user);
  const axiosInstance = createAxios(token);

  const [globalSettings, setGlobalSettings] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [timezone, setTimezone] = useState("");
  const [weekStart, setWeekStart] = useState("Monday");

  const [subdomain, setSubdomain] = useState("");
  const [industrytype, setIndustrytype] = useState("");
  const [name, setName] = useState("");

  /* ---------------- COUNTRIES ---------------- */
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,currencies,idd,timezones,flags")
      .then(res => res.json())
      .then(data => {
        const formatted = data
          .map(c => ({
            label: c.name.common,
            value: c.cca2,
            currency: c.currencies ? Object.keys(c.currencies)[0] : "",
            callingCode:
              c.idd?.root && c.idd?.suffixes?.length
                ? c.idd.root + c.idd.suffixes[0]
                : "",
            timezones: c.timezones || [],
            flag: c.flags?.png || c.flags?.svg
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(formatted);
      });
  }, []);

  /* ---------------- GLOBAL SETTINGS ---------------- */
  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const res = await axiosInstance.get(
          "/companies/global-setting-get",
          { meta: { auth: "ADMIN_AUTH" } }
        );
        setGlobalSettings(res?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGlobalSettings();
  }, []);

  /* ---------------- PREFILL ---------------- */
  useEffect(() => {
    if (!globalSettings || countries.length === 0) return;

    const gs = globalSettings;

    const country =
      countries.find(
        c => c.label.toLowerCase() === gs.country?.toLowerCase()
      ) || countries[0];

    setSelectedCountry(country);
    setTimezone(gs.timezone || country.timezones?.[0] || "");

    setSubdomain(gs.slug || "");
    setIndustrytype(gs.industryType || "");
    setName(gs.name || "");
  }, [globalSettings, countries]);

  /* ---------------- AUTO SET TIMEZONE ON COUNTRY CHANGE ---------------- */
  useEffect(() => {
    if (!selectedCountry) return;

    // 🔥 Direct IANA timezone, no UTC
    if (selectedCountry.timezones?.length > 0) {
      setTimezone(selectedCountry.timezones[0]);
    }
  }, [selectedCountry]);

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    if (!selectedCountry || !timezone) return;

    const payload = {
      name: name.trim(),
      slug: subdomain.trim(),
      industryType: industrytype,
      country: selectedCountry.label,
      timezone, // ✅ Asia/Kolkata / America/New_York
      currency: selectedCountry.currency,
      callingCode: selectedCountry.callingCode,
    };

    try {
      await axiosInstance.patch(
        "/companies/global-setting-edit",
        payload,
        { meta: { auth: "ADMIN_AUTH" } }
      );
      alert("Global defaults saved successfully!");
    } catch {
      alert("Failed to save");
    }
  };

  if (!globalSettings || !selectedCountry) {
    return <div>Loading...</div>;
  }

  /* ---------------- CUSTOM SELECT UI ---------------- */
  const CountryOption = ({ data, innerRef, innerProps }) => (
    <div ref={innerRef} {...innerProps} className="flex items-center gap-2 px-2 py-1">
      <img src={data.flag} className="w-5 h-4 rounded-sm" />
      <span>{data.label}</span>
    </div>
  );

  const CountrySingleValue = (props) => (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        <img src={props.data.flag} className="w-5 h-4 rounded-sm" />
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 mx-auto">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Global Defaults</h1>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label>Your slug</label>
          <input
            className="mt-1 w-full px-4 py-3 border rounded-lg"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label>Select Country</label>
            <Select
              options={countries}
              value={selectedCountry}
              onChange={setSelectedCountry}
              components={{ Option: CountryOption, SingleValue: CountrySingleValue }}
            />
          </div>

          <div>
            <label>Currency</label>
            <input readOnly value={selectedCountry.currency} className="input" />
          </div>

          <div>
            <label>Calling Code</label>
            <input readOnly value={selectedCountry.callingCode} className="input" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label>Select Timezone</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {selectedCountry.timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Week starts on</label>
            <select className="mt-1 w-full px-4 py-3 border rounded-lg">
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalDefaults;