import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import createAxios from "../../../utils/axios.config";
import { useSelector } from "react-redux";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const GlobalDefaults = () => {
  const { token } = useSelector(state => state.user);
  const axiosInstance = createAxios(token);

  const [globalSettings, setGlobalSettings] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [timezone, setTimezone] = useState("");
  const [weekStart, setWeekStart] = useState("Monday");
  const [leaveCycleStartMonth, setLeaveCycleStartMonth] = useState("April");
  const [financialYearStartMonth, setFinancialYearStartMonth] = useState("April");
  const [dateFormat, setDateFormat] = useState("DD-MM-YYYY");
  const [timeFormat, setTimeFormat] = useState("24");
  const [subdomain, setSubdomain] = useState("");
  const [industrytype, setIndustrytype] = useState("");
  const [name, setName] = useState("");

  /* ---------- helpers ---------- */
  const getIANATimezones = (zones = []) =>
    zones.filter(z => z.includes("/"));

  /* ---------- fetch countries ---------- */
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
            timezones: getIANATimezones(c.timezones || []),
            flag: c.flags?.png || c.flags?.svg
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(formatted);
      });
  }, []);

  /* ---------- fetch global settings ---------- */
  useEffect(() => {
    const fetchSettings = async () => {
      const res = await axiosInstance.get(
        "/companies/global-setting-get",
        { meta: { auth: "ADMIN_AUTH" } }
      );
      setGlobalSettings(res?.data?.data);
    };
    fetchSettings();
  }, []);

  /* ---------- prefill ---------- */
  useEffect(() => {
    if (!globalSettings || countries.length === 0) return;

    const country =
      countries.find(
        c => c.label.toLowerCase() === globalSettings.country?.toLowerCase()
      ) || countries[0];

    setSelectedCountry(country);
    setTimezone(country.timezones[0] || "");
    setSubdomain(globalSettings.slug || "");
    setIndustrytype(globalSettings.industryType || "");
    setName(globalSettings.name || "");
  }, [globalSettings, countries]);

  /* ---------- country change ---------- */
  useEffect(() => {
    if (selectedCountry?.timezones?.length) {
      setTimezone(selectedCountry.timezones[0]);
    }
  }, [selectedCountry]);

  /* ---------- save ---------- */
  const handleSave = async () => {
    if (!selectedCountry) return;

    const payload = {
      name: name.trim(),
      slug: subdomain.trim(),
      industryType: industrytype,
      country: selectedCountry.label,
      timezone,
      currency: selectedCountry.currency,
      leaveCycleStartMonth,
      financialYearStartMonth,
      dateFormat,
      timeFormat: timeFormat === "24" ? "24-hour" : "12-hour",
      callingCode: selectedCountry.callingCode
    };

    console.log("FINAL PAYLOAD", payload);

    await axiosInstance.patch(
      "/companies/global-setting-edit",
      payload,
      { meta: { auth: "ADMIN_AUTH" } }
    );

    alert("Global defaults saved successfully!");
  };

  if (!globalSettings || !selectedCountry) return <div>Loading...</div>;

  /* ---------- custom select ---------- */
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
          <p className="text-sm text-gray-500">Manage employee settings</p>
        </div>
        <button onClick={handleSave} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        <input className="w-full px-4 py-3 border rounded-lg" value={subdomain} onChange={e=>setSubdomain(e.target.value)} />

        <div className="grid md:grid-cols-3 gap-6">
          <Select
            options={countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
            components={{ Option: CountryOption, SingleValue: CountrySingleValue }}
          />
          <input readOnly value={selectedCountry.currency} className="px-4 py-3 border rounded-lg bg-gray-50"/>
          <input readOnly value={selectedCountry.callingCode} className="px-4 py-3 border rounded-lg bg-gray-50"/>
        </div>

        <select value={timezone} onChange={e=>setTimezone(e.target.value)} className="w-full px-4 py-3 border rounded-lg">
          {selectedCountry.timezones.map(tz => (
            <option key={tz}>{tz}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GlobalDefaults;