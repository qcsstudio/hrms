import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import createAxios from "../../../utils/axios.config";
import { useSelector } from "react-redux";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// ✅ Country code → IANA timezone mapping
// Source: https://timezonedb.com/time-zones
const COUNTRY_TIMEZONES = {
  AF: ["Asia/Kabul"],
  AL: ["Europe/Tirane"],
  DZ: ["Africa/Algiers"],
  AD: ["Europe/Andorra"],
  AO: ["Africa/Luanda"],
  AG: ["America/Antigua"],
  AR: ["America/Argentina/Buenos_Aires", "America/Argentina/Cordoba", "America/Argentina/Mendoza"],
  AM: ["Asia/Yerevan"],
  AU: ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Perth", "Australia/Adelaide", "Australia/Darwin", "Australia/Hobart"],
  AT: ["Europe/Vienna"],
  AZ: ["Asia/Baku"],
  BS: ["America/Nassau"],
  BH: ["Asia/Bahrain"],
  BD: ["Asia/Dhaka"],
  BB: ["America/Barbados"],
  BY: ["Europe/Minsk"],
  BE: ["Europe/Brussels"],
  BZ: ["America/Belize"],
  BJ: ["Africa/Porto-Novo"],
  BT: ["Asia/Thimphu"],
  BO: ["America/La_Paz"],
  BA: ["Europe/Sarajevo"],
  BW: ["Africa/Gaborone"],
  BR: ["America/Sao_Paulo", "America/Manaus", "America/Fortaleza", "America/Recife", "America/Belem", "America/Porto_Velho", "America/Cuiaba", "America/Noronha"],
  BN: ["Asia/Brunei"],
  BG: ["Europe/Sofia"],
  BF: ["Africa/Ouagadougou"],
  BI: ["Africa/Bujumbura"],
  CV: ["Atlantic/Cape_Verde"],
  KH: ["Asia/Phnom_Penh"],
  CM: ["Africa/Douala"],
  CA: ["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax", "America/St_Johns", "America/Regina"],
  CF: ["Africa/Bangui"],
  TD: ["Africa/Ndjamena"],
  CL: ["America/Santiago", "Pacific/Easter"],
  CN: ["Asia/Shanghai", "Asia/Urumqi"],
  CO: ["America/Bogota"],
  KM: ["Indian/Comoro"],
  CG: ["Africa/Brazzaville"],
  CD: ["Africa/Kinshasa", "Africa/Lubumbashi"],
  CR: ["America/Costa_Rica"],
  CI: ["Africa/Abidjan"],
  HR: ["Europe/Zagreb"],
  CU: ["America/Havana"],
  CY: ["Asia/Nicosia"],
  CZ: ["Europe/Prague"],
  DK: ["Europe/Copenhagen"],
  DJ: ["Africa/Djibouti"],
  DM: ["America/Dominica"],
  DO: ["America/Santo_Domingo"],
  EC: ["America/Guayaquil", "Pacific/Galapagos"],
  EG: ["Africa/Cairo"],
  SV: ["America/El_Salvador"],
  GQ: ["Africa/Malabo"],
  ER: ["Africa/Asmara"],
  EE: ["Europe/Tallinn"],
  SZ: ["Africa/Mbabane"],
  ET: ["Africa/Addis_Ababa"],
  FJ: ["Pacific/Fiji"],
  FI: ["Europe/Helsinki"],
  FR: ["Europe/Paris"],
  GA: ["Africa/Libreville"],
  GM: ["Africa/Banjul"],
  GE: ["Asia/Tbilisi"],
  DE: ["Europe/Berlin"],
  GH: ["Africa/Accra"],
  GR: ["Europe/Athens"],
  GD: ["America/Grenada"],
  GT: ["America/Guatemala"],
  GN: ["Africa/Conakry"],
  GW: ["Africa/Bissau"],
  GY: ["America/Guyana"],
  HT: ["America/Port-au-Prince"],
  HN: ["America/Tegucigalpa"],
  HU: ["Europe/Budapest"],
  IS: ["Atlantic/Reykjavik"],
  IN: ["Asia/Kolkata"],
  ID: ["Asia/Jakarta", "Asia/Makassar", "Asia/Jayapura"],
  IR: ["Asia/Tehran"],
  IQ: ["Asia/Baghdad"],
  IE: ["Europe/Dublin"],
  IL: ["Asia/Jerusalem"],
  IT: ["Europe/Rome"],
  JM: ["America/Jamaica"],
  JP: ["Asia/Tokyo"],
  JO: ["Asia/Amman"],
  KZ: ["Asia/Almaty", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Atyrau", "Asia/Oral", "Asia/Qostanay", "Asia/Qyzylorda"],
  KE: ["Africa/Nairobi"],
  KI: ["Pacific/Tarawa", "Pacific/Enderbury", "Pacific/Kiritimati"],
  KP: ["Asia/Pyongyang"],
  KR: ["Asia/Seoul"],
  KW: ["Asia/Kuwait"],
  KG: ["Asia/Bishkek"],
  LA: ["Asia/Vientiane"],
  LV: ["Europe/Riga"],
  LB: ["Asia/Beirut"],
  LS: ["Africa/Maseru"],
  LR: ["Africa/Monrovia"],
  LY: ["Africa/Tripoli"],
  LI: ["Europe/Vaduz"],
  LT: ["Europe/Vilnius"],
  LU: ["Europe/Luxembourg"],
  MG: ["Indian/Antananarivo"],
  MW: ["Africa/Blantyre"],
  MY: ["Asia/Kuala_Lumpur", "Asia/Kuching"],
  MV: ["Indian/Maldives"],
  ML: ["Africa/Bamako"],
  MT: ["Europe/Malta"],
  MH: ["Pacific/Majuro"],
  MR: ["Africa/Nouakchott"],
  MU: ["Indian/Mauritius"],
  MX: ["America/Mexico_City", "America/Cancun", "America/Monterrey", "America/Merida", "America/Chihuahua", "America/Mazatlan", "America/Hermosillo", "America/Tijuana"],
  FM: ["Pacific/Pohnpei", "Pacific/Chuuk", "Pacific/Kosrae"],
  MD: ["Europe/Chisinau"],
  MC: ["Europe/Monaco"],
  MN: ["Asia/Ulaanbaatar", "Asia/Hovd", "Asia/Choibalsan"],
  ME: ["Europe/Podgorica"],
  MA: ["Africa/Casablanca"],
  MZ: ["Africa/Maputo"],
  MM: ["Asia/Rangoon"],
  NA: ["Africa/Windhoek"],
  NR: ["Pacific/Nauru"],
  NP: ["Asia/Kathmandu"],
  NL: ["Europe/Amsterdam"],
  NZ: ["Pacific/Auckland", "Pacific/Chatham"],
  NI: ["America/Managua"],
  NE: ["Africa/Niamey"],
  NG: ["Africa/Lagos"],
  MK: ["Europe/Skopje"],
  NO: ["Europe/Oslo"],
  OM: ["Asia/Muscat"],
  PK: ["Asia/Karachi"],
  PW: ["Pacific/Palau"],
  PS: ["Asia/Gaza", "Asia/Hebron"],
  PA: ["America/Panama"],
  PG: ["Pacific/Port_Moresby", "Pacific/Bougainville"],
  PY: ["America/Asuncion"],
  PE: ["America/Lima"],
  PH: ["Asia/Manila"],
  PL: ["Europe/Warsaw"],
  PT: ["Europe/Lisbon", "Atlantic/Azores", "Atlantic/Madeira"],
  QA: ["Asia/Qatar"],
  RO: ["Europe/Bucharest"],
  RU: ["Europe/Moscow", "Europe/Kaliningrad", "Europe/Samara", "Asia/Yekaterinburg", "Asia/Omsk", "Asia/Krasnoyarsk", "Asia/Irkutsk", "Asia/Yakutsk", "Asia/Vladivostok", "Asia/Magadan", "Asia/Sakhalin", "Asia/Srednekolymsk", "Asia/Kamchatka", "Asia/Anadyr"],
  RW: ["Africa/Kigali"],
  KN: ["America/St_Kitts"],
  LC: ["America/St_Lucia"],
  VC: ["America/St_Vincent"],
  WS: ["Pacific/Apia"],
  SM: ["Europe/San_Marino"],
  ST: ["Africa/Sao_Tome"],
  SA: ["Asia/Riyadh"],
  SN: ["Africa/Dakar"],
  RS: ["Europe/Belgrade"],
  SC: ["Indian/Mahe"],
  SL: ["Africa/Freetown"],
  SG: ["Asia/Singapore"],
  SK: ["Europe/Bratislava"],
  SI: ["Europe/Ljubljana"],
  SB: ["Pacific/Guadalcanal"],
  SO: ["Africa/Mogadishu"],
  ZA: ["Africa/Johannesburg"],
  SS: ["Africa/Juba"],
  ES: ["Europe/Madrid", "Africa/Ceuta", "Atlantic/Canary"],
  LK: ["Asia/Colombo"],
  SD: ["Africa/Khartoum"],
  SR: ["America/Paramaribo"],
  SE: ["Europe/Stockholm"],
  CH: ["Europe/Zurich"],
  SY: ["Asia/Damascus"],
  TW: ["Asia/Taipei"],
  TJ: ["Asia/Dushanbe"],
  TZ: ["Africa/Dar_es_Salaam"],
  TH: ["Asia/Bangkok"],
  TL: ["Asia/Dili"],
  TG: ["Africa/Lome"],
  TO: ["Pacific/Tongatapu"],
  TT: ["America/Port_of_Spain"],
  TN: ["Africa/Tunis"],
  TR: ["Europe/Istanbul"],
  TM: ["Asia/Ashgabat"],
  TV: ["Pacific/Funafuti"],
  UG: ["Africa/Kampala"],
  UA: ["Europe/Kiev", "Europe/Uzhgorod", "Europe/Zaporozhye"],
  AE: ["Asia/Dubai"],
  GB: ["Europe/London"],
  US: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Anchorage", "America/Adak", "Pacific/Honolulu"],
  UY: ["America/Montevideo"],
  UZ: ["Asia/Tashkent", "Asia/Samarkand"],
  VU: ["Pacific/Efate"],
  VE: ["America/Caracas"],
  VN: ["Asia/Ho_Chi_Minh"],
  YE: ["Asia/Aden"],
  ZM: ["Africa/Lusaka"],
  ZW: ["Africa/Harare"],
};

const GlobalDefaults = () => {
  // const { token } = useSelector(state => state.user);
  const token = localStorage.getItem('authToken')
  const axiosInstance = createAxios(token);

  const [globalSettings, setGlobalSettings] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [timezone, setTimezone] = useState("");
  const [availableTimezones, setAvailableTimezones] = useState([]);
  const [weekStart, setWeekStart] = useState("Monday");
  const [leaveCycleStartMonth, setLeaveCycleStartMonth] = useState("January");
  const [financialYearStartMonth, setFinancialYearStartMonth] = useState("April");
  const [dateFormat, setDateFormat] = useState("DD-MM-YYYY");
  const [timeFormat, setTimeFormat] = useState("24");
  const [subdomain, setSubdomain] = useState("");
  const [industrytype, setIndustrytype] = useState("");
  const [name, setName] = useState("");

  // ✅ Helper: Get IANA timezones for a country code
  const getTimezonesForCountry = (countryCode) => {
    return COUNTRY_TIMEZONES[countryCode] || [];
  };

  // 1️ Fetch countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,currencies,idd,flags")
      .then(res => res.json())
      .then(data => {
        const formatted = data
          .map(c => ({
            label: c.name.common,
            value: c.cca2, // ISO country code e.g. "IN", "US"
            currency: c.currencies ? Object.keys(c.currencies)[0] : "",
            callingCode:
              c.idd?.root && c.idd?.suffixes?.length
                ? c.idd.root + c.idd.suffixes[0]
                : "",
            flag: c.flags?.png || c.flags?.svg
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(formatted);
      });
  }, []);

  // 2️ Fetch global settings
  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const res = await axiosInstance.get("/companies/global-setting-get", {
          meta: { auth: "ADMIN_AUTH" }
        });
        setGlobalSettings(res?.data?.data);
        console.log(res?.data?.data)
      } catch (err) {
        console.error("Error fetching global settings:", err);
      }
    };
    fetchGlobalSettings();
  }, []);

  // 3️ Once both countries + settings loaded → populate form
  useEffect(() => {
    if (!globalSettings || countries.length === 0) return;

    const gs = globalSettings;

    const countryOption =
      countries.find(
        c => c.label.toLowerCase().trim() === gs.country?.toLowerCase().trim()
      ) || countries[0];

    setSelectedCountry(countryOption);

    // ✅ Get IANA timezones for the country
    const tzList = getTimezonesForCountry(countryOption.value);
    setAvailableTimezones(tzList);

    // ✅ Try to match saved timezone, else fallback to first
    const savedTz = gs.timezone || "";
    const matchedTz = tzList.includes(savedTz) ? savedTz : tzList[0] || "";
    setTimezone(matchedTz);

    setWeekStart(gs.weekStart || "Monday");
    setLeaveCycleStartMonth(gs.leaveCycleStartMonth || "January");
    setFinancialYearStartMonth(gs.financialYearStartMonth || "April");
    setDateFormat(gs.dateFormat || "DD-MM-YYYY");
    setTimeFormat(gs.timeFormat === "12-hour" ? "12" : "24");
    setSubdomain(gs.slug || "");
    setIndustrytype(gs.industryType || "");
    setName(gs.name || "");
  }, [globalSettings, countries]);

  // 4️ ✅ When country changes → update timezones + reset timezone to first
  const handleCountryChange = (option) => {
    setSelectedCountry(option);

    const tzList = getTimezonesForCountry(option.value);
    setAvailableTimezones(tzList);

    // Auto-select first timezone of the selected country
    setTimezone(tzList[0] || "");
  };

  const handleSave = async () => {
    if (!selectedCountry || !selectedCountry.currency) return;

    const payload = {
      name: name.trim(),
      slug: subdomain.trim(),
      industryType: industrytype,
      country: selectedCountry.label,
      timezone: timezone,
      currency: selectedCountry.currency,
      leaveCycleStartMonth: leaveCycleStartMonth || "January",
      financialYearStartMonth: financialYearStartMonth || "April",
      dateFormat: dateFormat || "DD-MM-YYYY",
      timeFormat: timeFormat === "24" ? "24-hour" : "12-hour",
      callingCode: selectedCountry.callingCode
    };

    console.log("FINAL PAYLOAD →", payload);

    try {
      await axiosInstance.patch(
        "/companies/global-setting-edit",
        payload,
        { meta: { auth: "ADMIN_AUTH" } }
      );

      alert("Global defaults saved successfully!");
    } catch (error) {
      console.error("SAVE ERROR →", error);
      alert("Failed to save global defaults");
    }
  };

  if (!globalSettings || countries.length === 0 || !selectedCountry) {
    return <div>Loading...</div>;
  }

  const CountryOption = ({ data, innerRef, innerProps }) => (
    <div ref={innerRef} {...innerProps} className="flex items-center gap-2 px-2 py-1 cursor-pointer">
      {data.flag && <img src={data.flag} alt="" className="w-5 h-4 rounded-sm object-cover" />}
      <span>{data.label}</span>
    </div>
  );

  const CountrySingleValue = (props) => (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {props.data.flag && <img src={props.data.flag} alt="" className="w-5 h-4 rounded-sm object-cover" />}
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Global Defaults</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Subdomain */}
        <div>
          <label className="text-sm font-medium">Your slug</label>
          <input
            placeholder="your company slug name"
            className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
          />
        </div>

        {/* Country, Currency, Calling Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium">Select Country</label>
            <Select
              options={countries}
              value={selectedCountry}
              onChange={handleCountryChange}  
              placeholder="Select Country"
              components={{ Option: CountryOption, SingleValue: CountrySingleValue }}
              className="mt-1 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Currency</label>
            <input
              readOnly
              value={selectedCountry?.currency || ""}
              className="mt-1 w-full px-4 py-3 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Calling Code</label>
            <input
              readOnly
              value={selectedCountry?.callingCode || ""}
              className="mt-1 w-full px-4 py-3 border rounded-lg bg-gray-50"
            />
          </div>
        </div>

        {/* Timezone & Week Start */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Select Timezone</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {availableTimezones.length > 0 ? (
                availableTimezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))
              ) : (
                <option value="">No timezone available</option>
              )}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">When does your week start?</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
            >
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </div>
        </div>

        {/* Leave Cycle & Financial Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Select Leave Cycle (Start month)</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={leaveCycleStartMonth}
              onChange={(e) => setLeaveCycleStartMonth(e.target.value)}
            >
              {MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Financial year starts</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={financialYearStartMonth}
              onChange={(e) => setFinancialYearStartMonth(e.target.value)}
            >
              {MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Date & Time Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Select preferred date format</label>
            <select
              className="mt-1 w-full px-4 py-3 border rounded-lg"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
            >
              <option>DD-MM-YYYY</option>
              <option>MM-DD-YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Select preferred time format</label>
            <div className="flex gap-4 mt-2">
              {["12", "24"].map(t => (
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