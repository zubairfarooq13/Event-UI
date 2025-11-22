import React, { useState } from 'react';
import { FaSearch, FaUserPlus, FaEllipsisV } from 'react-icons/fa';

const TeamMembersTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Zubair Farooq',
      email: 'zubair.farooq@hotmail.com',
      phone: '+92 3365929305',
      avatar: null,
      venuesAssigned: ['Ramda'],
      rolesAssigned: ['Admin', 'Events manager', 'Finance / Accounting']
    }
  ]);

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Team members</h1>
        <p className="text-gray-600 mt-1">
          See who manages enquiries, accounts and listings for each of your published venues.
        </p>
      </div>

      {/* Search and Invite */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team members"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
          <FaUserPlus size={16} />
          Invite team member
        </button>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Phone number(s)</div>
          <div className="col-span-3">Venues assigned</div>
          <div className="col-span-3">Roles assigned</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div key={member.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                {/* Name */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                    ) : (
                      <span className="text-gray-500 font-medium text-sm">
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-span-3 flex items-center">
                  <p className="text-sm text-gray-700">{member.phone}</p>
                </div>

                {/* Venues Assigned */}
                <div className="col-span-3 flex items-center">
                  <p className="text-sm text-gray-700">
                    {member.venuesAssigned.join(', ')}
                  </p>
                </div>

                {/* Roles Assigned */}
                <div className="col-span-2 flex items-center">
                  <div className="flex flex-col gap-1">
                    {member.rolesAssigned.map((role, index) => (
                      <span key={index} className="text-sm text-gray-700">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaEllipsisV className="text-gray-400" size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No team members found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMembersTab;
