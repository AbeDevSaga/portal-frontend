import React from 'react'
import resident from '../../../common/utils/constants/mock/resident-mock'

const FamilyTree = () => {
  const familyData = resident[0] // Using the first resident data

  const handleSelect = (memberType: string, memberData: any) => {
    console.log(`Selected ${memberType}:`, memberData)
    // Navigation will be implemented later
  }

  const FamilyMemberCard = ({ 
    title, 
    data, 
    memberType, 
    profilePicture
  }: {
    title: string
    data: any
    memberType: string
    profilePicture: string
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3 mb-3">
        <img 
          src={profilePicture} 
          alt={title}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
        </div>
      </div>
      
      <div className="space-y-1 mb-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Name:</span>
          <span className="text-gray-900">{data.first_name || data.child_name} {data.last_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Gender:</span>
          <span className="text-gray-900">{data.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Occupation:</span>
          <span className="text-gray-900">{data.occupation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Birth Type:</span>
          <span className="text-gray-900">{data.birth_type}</span>
        </div>
      </div>
      
      <button 
        onClick={() => handleSelect(memberType, data)}
        className="w-full bg-primary text-white py-2 px-3 rounded text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Select
      </button>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Family Members</h1>
      
      {/* Parents Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Parents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FamilyMemberCard
            title="Husband"
            data={familyData.personal_info}
            memberType="husband"
            profilePicture={familyData.personal_info.profile_picture}
          />
          <FamilyMemberCard
            title="Wife"
            data={familyData.marital_info.spouse_name ? 
              { 
                first_name: familyData.marital_info.spouse_name.split(' ')[0],
                last_name: familyData.marital_info.spouse_name.split(' ')[1] || '',
                gender: "Female",
                occupation: "Teacher",
                birth_type: "SINGLE"
              } : 
              familyData.personal_info
            }
            memberType="wife"
            profilePicture="https://randomuser.me/api/portraits/women/6.jpg"
          />
        </div>
      </div>

      {/* Children Section */}
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">Children</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {familyData.children_info.map((child, index) => (
            <FamilyMemberCard 
              key={index} 
              title={`Child ${index + 1}`}
              data={child} 
              memberType="child"
              profilePicture={child.child_profile_picture}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FamilyTree
