import React, { useEffect, useState } from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const GlobalDefaults = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [timezone, setTimezone] = useState("");
  const [timeFormat, setTimeFormat] = useState("24");

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,idd,currencies,timezones"
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .map((c) => ({
            name: c.name.common,
            code: c.cca2,
            callingCode:
              c.idd?.root && c.idd?.suffixes?.length
                ? c.idd.root + c.idd.suffixes[0]
                : "",
            currency: c.currencies ? Object.keys(c.currencies)[0] : "",
            timezones: c.timezones || [],
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formatted);
        setCountry(formatted.find((c) => c.name === "India") || formatted[0]);
      });
  }, []);

  useEffect(() => {
    if (country?.timezones?.length) {
      setTimezone(country.timezones[0]);
    }
  }, [country]);

  if (!country) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8  mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Global Defaults
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium">Your Subdomain</label>
          <input
            placeholder="https://________.qcs.com"
            className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium">Select Country</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={country.code}
              onChange={(e) =>
                setCountry(
                  countries.find((c) => c.code === e.target.value)
                )
              }
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Currency</label>
            <input
              readOnly
              value={country.currency}
              className="mt-1 w-full px-4 py-3 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Calling Code</label>
            <input
              readOnly
              value={country.callingCode}
              className="mt-1 w-full px-4 py-3 border rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Select Timezone</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {country.timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              When does your week start?
            </label>
            <select className="mt-1 w-full px-4 py-3 border rounded-lg">
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">
              Select Leave Cycle (Start month)
            </label>
            <select className="mt-1 w-full px-4 py-3 border rounded-lg">
              {MONTHS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Financial year starts
            </label>
            <select className="mt-1 w-full px-4 py-3 border rounded-lg">
              {MONTHS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">
              Select preferred date format
            </label>
            <select className="mt-1 w-full px-4 py-3 border rounded-lg">
              <option>DD-MM-YYYY</option>
              <option>MM-DD-YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Select preferred time format
            </label>
            <div className="flex gap-4 mt-2">
              {["12", "24"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFormat(t)}
                  className={`flex-1 h-12 md:h-14 rounded-lg font-semibold border transition ${
                    timeFormat === t
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-600"
                  }`}
                >
                  {t} Hours
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalDefaults;
