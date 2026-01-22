import React from 'react'
import { statslogo1, statslogo2, statslogo3, statslogo4 } from '../../allAssetsImport/allAssets'

const statsData = [
  {
    title: (
      <>
        Total<br />Companies
      </>
    ),
    value: '257',
    subtitle: '+08 this month',
    icon: statslogo1,
    bg: 'bg-indigo-100'
  },
  {
    title: (
      <>
        Active<br />Companies
      </>
    ),
    value: '89',
    subtitle: '76% activation rate',
    icon: statslogo2,
    bg: 'bg-indigo-100'
  },
  {
    title: 'Trials',
    value: '5',
    subtitle: 'Expiring in 3 days',
    icon: statslogo3,
    bg: 'bg-indigo-100'
  },
  {
    title: (
      <>
        Monthly<br />Subscription Revenue
      </>
    ),
    value: '23',
    subtitle: '+08 this month',
    icon: statslogo4,
    bg: 'bg-emerald-100'
  }
]

const Statics = () => {
  return (
    <div className="flex gap-5">
      {statsData.map((item, index) => (
        <div key={index} className="bg-white w-full p-4 rounded-lg">
          <div className="flex justify-between">
            <h2 className="font-semibold font-plein">
              {item.title}
            </h2>

            <div className={`${item.bg} w-12 h-12 flex items-center justify-center rounded`}>
              <img src={item.icon} alt="icon" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mt-2">
            {item.value}
          </h1>

          <p className="text-sm text-gray-400">
            {item.subtitle}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Statics
