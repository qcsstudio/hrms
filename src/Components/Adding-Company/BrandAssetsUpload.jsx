import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import axiosInstance from '../../utils/axios.config'
import createAxios from '../../utils/axios.config'

const BrandAssetsUpload = ({ onNext, onBack }) => {
  const { token, companyId } = useSelector((state) => state.user)
 

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

  const handleFile = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    setData((prev) => ({
      ...prev,
      [type]: file,
    }))

    setPreview((prev) => ({
      ...prev,
      [type]: URL.createObjectURL(file),
    }))
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
  const axiosInstance = createAxios()

  async function handlenext() {
     console.log(token,"000000000000000000000000")
  console.log(companyId,"1111111111111111111")
    try {
      const payload = new FormData()
      if (formData.logo) payload.append('brand-logo', formData.logo)
      if (formData.cover) payload.append('cover-image', formData.cover)

      const res = await axiosInstance.post(
        `/companies/${companyId}/company-brandlogoandimage`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log(res.data)
      onNext()
    } catch (error) {
      console.log('API Error:', error)
    }
  }

  return (
    <div className="space-y-6 w-[1280px] mx-auto">

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

        <button className="h-11 w-[170px] border rounded-lg" onClick={handlenext}>
          Continue Setup
        </button>
      </div>
    </div>
  )
}

export default BrandAssetsUpload
