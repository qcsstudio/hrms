import React, { useEffect, useState } from 'react'
import createAxios from '../../utils/axios.config'
import OTPModal from './OTPModal'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCompanyData } from '../../Redux/userSlice'

// 🌍 DATA
import countries from "world-countries"
import ct from "countries-and-timezones"

// 🇺🇳 FLAG DROPDOWN
import Select, { components } from "react-select"
import * as Flags from "country-flag-icons/react/3x2"

import { getEmptyFields } from 'get_input_empty_fields';

const CompanySetup = ({ onNext, onBack }) => {

  const { token } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [formData, setFormdata] = useState({
    name: "",
    slug: "",
    country: "",
    timezone: "",
    currency: "",
    industryType: ""
  })

  const [showOtpModal, setShowOtpModal] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get("token")

  // form validation=================
  const [errors, setErrors] = useState({})


  useEffect(() => {
    if (!inviteToken) return
    const timer = setTimeout(() => setShowOtpModal(true), 2000)
    return () => clearTimeout(timer)
  }, [inviteToken])

  const handleOtpVerified = () => {
    setIsOtpVerified(true)
    setShowOtpModal(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata(prev => ({ ...prev, [name]: value }))
    setErrors({})
  }

  // 🌍 COUNTRY → TIMEZONE + CURRENCY
  const handleCountrySelect = (selected) => {
    if (!selected) return

    const countryCode = selected.value

    const timezone =
      ct.getCountry(countryCode)?.timezones?.[0] || ""

    const countryData =
      countries.find(c => c.cca2 === countryCode)

    const currency =
      countryData?.currencies
        ? Object.keys(countryData.currencies)[0]
        : ""

    setFormdata(prev => ({
      ...prev,
      country: countryCode,
      timezone,
      currency
    }))
  }

  // 🌍 Country options
  const countryOptions = countries.map(c => ({
    value: c.cca2,
    label: c.name.common
  }))

  const selectedCountry =
    countryOptions.find(c => c.value === formData.country) || null

  // ✅ FIXED OPTION COMPONENT (THIS WAS THE BUG)
  const CountryOption = (props) => {
    const { data, innerRef, innerProps } = props
    const Flag = Flags[data.value]

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex items-center gap-2 px-2 py-1 cursor-pointer"
      >
        {Flag && <Flag className="w-5 h-4 rounded-sm" />}
        <span>{data.label}</span>
      </div>
    )
  }

  // ✅ Selected value
  const CountrySingleValue = (props) => {
    const { data } = props
    const Flag = Flags[data.value]

    return (
      <components.SingleValue {...props}>
        <div className="flex items-center gap-2">
          {Flag && <Flag className="w-5 h-4 rounded-sm" />}
          <span>{data.label}</span>
        </div>
      </components.SingleValue>
    )
  }
  const axiosInstance = createAxios(token, inviteToken)


  const handleSubmitSuperAdmin = async () => {
    try {
      const res = await axiosInstance.post("companies", formData, {
        meta: { auth: "ADMIN_AUTH" }
      }
      )
      dispatch(setCompanyData(res.data))
      onNext()
    } catch (error) {
      console.log("API Error:", error)
    }
  }

  const handleSubmitInvite = async () => {
    if (!isOtpVerified) {
      alert("Please verify OTP first")
      return
    }

    try {
      await axiosInstance.post("/invites/company-setup", formData,
        //   {
        //   headers: { "x-invite-token": inviteToken },
        // }
        {
          meta: { auth: "X_TENANT_TOKEN" }
        }
      )
      onNext()
    } catch (error) {
      console.log("API Error:", error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const emptyFields = getEmptyFields(formData);
    if (emptyFields.length > 0) {
      emptyFields.forEach(field => {
        setErrors((prev) => ({ ...prev, [field]: `${field} is required` })); // setErrors fields 
      });
      // alert(JSON.stringify(emptyFields))
    } else {
      console.log("All fields filled:", formData);
      // Add further logic for data submission or API calls here
    }
    inviteToken ? handleSubmitInvite() : handleSubmitSuperAdmin()
  }
  return (
    <>
      {inviteToken && showOtpModal && !isOtpVerified && (
        <OTPModal onVerify={handleOtpVerified} api="/invites/validate-otp" />
      )}

      <div className="w-[1280px] bg-[#F9FAFB] p-6 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <h1 className="text-[30px] font-semibold">Company Setup</h1>
            <p className="text-[22px] text-gray-600">
              Add your company basics to configure default settings.
            </p>
          </div>


          <div>
            <p className="text-[15px] mb-1">Company name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3"
            />
            {errors.name && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.name}.</p>}
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <p className="mb-1">Slug</p>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full h-10 border border-black/10 rounded-lg px-3"
              />
              {errors.slug && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.slug}.</p>}
            </div>

            <div className="flex-1">
              <p className="mb-1">Country</p>
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountrySelect}
                placeholder="Select Country"
                components={{
                  Option: CountryOption,
                  SingleValue: CountrySingleValue
                }}
                className="w-full"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "40px",
                    borderRadius: "0.5rem",
                    borderColor: "rgba(0,0,0,0.1)",
                    boxShadow: "none"
                  })
                }}
              />
              {/* {errors.selectedCountry && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.selectedCountry}.</p>} */}

            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-1">
              <p className="mb-1">Timezone</p>
              <input
                type="text"
                value={formData.timezone}
                readOnly
                className="w-full h-10 border border-black/10 rounded-lg px-3 bg-gray-100"
              />
              {/* {errors.timezone && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.timezone}.</p>} */}

            </div>

            <div className="flex-1">
              <p className="mb-1">Currency</p>
              <input
                type="text"
                value={formData.currency}
                readOnly
                className="w-full h-10 border border-black/10 rounded-lg px-3 bg-gray-100"
              />
              {/* {errors.currency && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.currency}.</p>} */}

            </div>
          </div>

          <div>
            <p className="text-[15px] mb-1">Industry Type</p>
            <select
              name="industryType"
              value={formData.industryType}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 bg-white"
            >
              <option value="">Select Industry</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
            </select>
              {errors.industryType && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.industryType}.</p>}

          </div>

          <div className="flex justify-between mt-5">
            <button
              type="button"
              onClick={onBack}
              className="w-[100px] h-10 border border-[#30333D] rounded-lg bg-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-[150px] h-10 border border-[#30333D] rounded-lg bg-white"
            >
              Continue setup
            </button>
          </div>

        </form>
      </div>
    </>
  )
}

export default CompanySetup
