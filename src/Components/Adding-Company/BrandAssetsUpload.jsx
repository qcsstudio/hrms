import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'

const BrandAssetsUpload = ({onNext,onBack}) => {
  const logoRef = useRef(null)
  const coverRef = useRef(null)

  const [logo, setLogo] = useState(null)
  const [cover, setCover] = useState(null)

  const handleFile = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    const preview = URL.createObjectURL(file)

    if (type === 'logo') {
      setLogo({ file, preview })
    } else {
      setCover({ file, preview })
    }
  }

  const removeFile = (type) => {
    if (type === 'logo') setLogo(null)
    else setCover(null)
  }

  return (
    <div className="space-y-6 w-[1280px] mx-auto">

      {/* ================= Brand Logo ================= */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Brand Logo</h3>
          <span className="text-sm text-gray-400">Recommended Size: <b>280×110 px</b></span>
        </div>

        <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {logo ? (
              <img src={logo.preview} alt="logo" className="w-16 h-16 object-contain rounded" />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded" />
            )}

            <p className="text-sm text-gray-500">
              Tip: use a transparent PNG or SVG. Keep some padding around the logo.
            </p>
          </div>

          {logo ? (
            <button
              onClick={() => removeFile('logo')}
              className="flex items-center gap-1 px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
            >
              <IoClose /> Delete
            </button>
          ) : (
            <button
              onClick={() => logoRef.current.click()}
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
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
          <span className="text-sm text-gray-400">Recommended Size: <b>720×788 px</b></span>
        </div>

        <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {cover ? (
              <img src={cover.preview} alt="cover" className="w-16 h-16 object-cover rounded" />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded" />
            )}

            <p className="text-sm text-gray-500">
              Tip: pick an image with safe space in the center (edges may crop).
            </p>
          </div>

          {cover ? (
            <button
              onClick={() => removeFile('cover')}
              className="flex items-center gap-1 px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
            >
              <IoClose /> Delete
            </button>
          ) : (
            <button
              onClick={() => coverRef.current.click()}
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
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
          <button
            type="button"
            className="h-11 w-[100px] border border-[#30333D] rounded-lg bg-white"
            onClick={onBack}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-11 w-[170px] border border-[#30333D] rounded-lg bg-white"
            // onClick={handlenext}
          >
            Continue Setup
          </button>
        </div>
    </div>
  )
}

export default BrandAssetsUpload
