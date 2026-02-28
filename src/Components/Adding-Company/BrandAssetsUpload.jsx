import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import createAxios from '../../utils/axios.config'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const BrandAssetsUpload = ({ onNext, onBack }) => {
  const { token } = useSelector((state) => state.user)

      const companyId = localStorage.getItem('companyId')

  const logoRef = useRef(null)
  const coverRef = useRef(null)

  // ✅ single state for API
  const [formData, setData] = useState({
    logo: null,
    cover: null,
  })

  // ✅ preview only for UI
  const [preview, setPreview] = useState({
    logo: null,
    cover: null,
  })

  const [skipmodal,setSkipmodal] = useState(false)

  const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB
  const RECOMMENDED_SIZES = {
    logo: { width: 280, height: 110 },
    cover: { width: 720, height: 788 },
  }

  const handleFile = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    // ❌ size validation (BLOCKING)
    if (file.size > MAX_FILE_SIZE) {
      toast.info("File size should not exceed 2 MB")
      e.target.value = ""
      return
    }

    // ✅ STATE IMMEDIATELY SET (IMPORTANT)
    setData((prev) => ({
      ...prev,
      [type]: file,
    }))

    const previewURL = URL.createObjectURL(file)
    setPreview((prev) => ({
      ...prev,
      [type]: previewURL,
    }))

    // 🔍 dimension check (NON-BLOCKING)
    const img = new Image()
    img.src = previewURL

    img.onload = () => {
      const { width, height } = img
      const recommended = RECOMMENDED_SIZES[type]

      if (width !== recommended.width || height !== recommended.height) {
        toast.info(
          `⚠ Recommended size for ${type === "logo" ? "Logo" : "Cover Image"} is ${recommended.width}×${recommended.height}px.\nYou can continue, but better results ke liye image change karein.`
        )
      }

      URL.revokeObjectURL(previewURL)
    }
  }


  const removeFile = (type) => {
    setData((prev) => ({
      ...prev,
      [type]: null,
    }))

    setPreview((prev) => ({
      ...prev,
      [type]: null,
    }))
  }

  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get("token")

  const navigate = useNavigate()

  const axiosInstance = createAxios(token)

  async function handlenext() {
    console.log(token, "000000000000000000000000")
    console.log(companyId, "1111111111111111111")
    try {
      const payload = new FormData()
      if (formData.logo) payload.append('brand-logo', formData.logo)
      if (formData.cover) payload.append('cover-image', formData.cover)

      const res = await axiosInstance.post(
        `/companies/${companyId}/company-brandlogoandimage`,
        payload,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'multipart/form-data',
        //   },
        // }
        {
          meta: { auth: "ADMIN_AUTH" }
        }

      )

      console.log(res.data)
      onNext()
    } catch (error) {
      console.log('API Error:', error)
    }
  }

  async function handleInvitenext() {
    console.log(token, "000000000000000000000000")
    // console.log(companyId, "1111111111111111111")
    try {
      const payload = new FormData()
      if (formData.logo) payload.append('brand-logo', formData.logo)
      if (formData.cover) payload.append('cover-image', formData.cover)

      const res = await axiosInstance.post(
        // `/companies/${companyId}/company-brandlogoandimage`,
        `/invites/${companyId}/invite-companyBrandingSetup`,
        payload,
        {
          meta: { auth: "X_TENANT_TOKEN" }
        }
      )
      console.log(res.data)
      onNext()
    } catch (error) {
      console.log('API Error:', error)
      toast.error(error?.response?.data?.message)
    }
  }
  const handleskip = () => {
   if (inviteToken) {
    setSkipmodal(true)
    
   } else {
    navigate('/dashboard')
   }

  }

  const handleSubmit = ()=> {
    inviteToken ? handleInvitenext() : handlenext()
  }

  return (
    <div className="space-y-6 w-[1280px] mx-auto">

      {/* skip Popup======================= */}
      {
        skipmodal &&  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] h-[350px] flex items-center justify-center shadow-lg">

            <p className="text-sm text-gray-600 mb-5">
              Please check your email for further instructions.
            </p>

    
          </div>
        </div>
      }

      {/* ================= Brand Logo ================= */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Brand Logo</h3>
          <span className="text-sm text-gray-400">
            Recommended Size: <b>280×110 px</b>
          </span>
        </div>

        <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {preview.logo ? (
              <img src={preview.logo} alt="logo" className="w-16 h-16 object-contain rounded" />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded" />
            )}
            <p className="text-sm text-gray-500">
              Tip: use a transparent PNG or SVG. Keep some padding around the logo.
            </p>
          </div>

          {preview.logo ? (
            <button onClick={() => removeFile('logo')} className="flex items-center gap-1 px-4 py-2 border rounded-md text-sm">
              <IoClose /> Delete
            </button>
          ) : (
            <button onClick={() => logoRef.current.click()} className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm">
              Upload
            </button>
          )}

          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e, 'logo')}
          />
        </div>
      </div>

      {/* ================= Login Cover Image ================= */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Login Cover Image</h3>
          <span className="text-sm text-gray-400">
            Recommended Size: <b>720×788 px</b>
          </span>
        </div>

        <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {preview.cover ? (
              <img src={preview.cover} alt="cover" className="w-16 h-16 object-cover rounded" />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded" />
            )}
            <p className="text-sm text-gray-500">
              Tip: pick an image with safe space in the center (edges may crop).
            </p>
          </div>

          {preview.cover ? (
            <button onClick={() => removeFile('cover')} className="flex items-center gap-1 px-4 py-2 border rounded-md text-sm">
              <IoClose /> Delete
            </button>
          ) : (
            <button onClick={() => coverRef.current.click()} className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm">
              Upload
            </button>
          )}

          <input
            ref={coverRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e, 'cover')}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button className="h-11 w-[100px] border rounded-lg" onClick={onBack}>
          Cancel
        </button>
        <div className='flex gap-2'>
          <button className="h-11 w-[170px] border rounded-lg" onClick={handleskip}>
            Skip
          </button>

        <button className="h-11 w-[170px] border rounded-lg" onClick={handleSubmit}>
          Continue Setup
        </button>
        </div>
      </div>
    </div>
  )
}

export default BrandAssetsUpload
