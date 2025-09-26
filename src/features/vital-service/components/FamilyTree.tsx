"use client";
import React, { useState, useEffect, useCallback } from "react";
import resident from "../../../common/utils/constants/mock/resident-mock";
import { Button } from "@/common/components/ui/button";
import { Eye, Filter, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/common/components/common/CrrsaTable";
import { Card } from "@/common/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Relationship Tag Component
const RelationshipTag = ({ relationStatus }: { relationStatus: string }) => {
  const getTagStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "husband":
        return "bg-blue-100  text-blue-800 border-blue-200";
      case "wife":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "son":
        return "bg-green-100 text-green-800 border-green-200";
      case "daughter":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex justify-center items-center px-2.5 py-0.5 rounded-lg text-sm min-w-[70px] text-center font-medium border ${getTagStyles(
        relationStatus
      )}`}
    >
      {relationStatus}
    </span>
  );
};

// Family Table Columns
const FamilyTableColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
  },

  {
    accessorKey: "relation_status",
    header: "Relationship",
    cell: ({ row }: any) => {
      const relationStatus = row.original?.relation_status || "";
      return <RelationshipTag relationStatus={relationStatus} />;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "occupation",
    header: "Occupation",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }: any) => {
      // redirect to the id of the row
      const recordId = row.original?.id || "N/A";
      return (
        <Link href={`/civil-registration/birth/correction/${recordId}`}>
          <Eye />
        </Link>
      );
    },
  },
];

interface FamilyTreeProps {
  onContinue: (value: string) => void;
}

const FamilyTree = ({ onContinue }: FamilyTreeProps) => {
  const husbandData = resident[0]; // Husband's data
  const wifeData = resident[1]; // Wife's data
  const router = useRouter();
  // State management similar to index.tsx
  const [response, setResponse] = useState<any[]>([]);
  const [filteredResponse, setFilteredResponse] = useState<any[]>([]);
  const [genderFilter, setGenderFilter] = useState("all");
  const [view, setView] = useState("card");
  // Pagination state
  const [pageDetail, setPageDetail] = useState({
    pageIndex: 0,
    pageCount: 1,
    pageSize: 10,
  });

  // Create family list data
  const familyList = [
    {
      id: husbandData.personal_info.registration_form_number,
      name: `${husbandData.personal_info.first_name} ${husbandData.personal_info.last_name}`,
      first_name: husbandData.personal_info.first_name,
      last_name: husbandData.personal_info.last_name,
      gender: husbandData.personal_info.gender,
      relation_status: husbandData.personal_info.relation_status,
      occupation: husbandData.personal_info.occupation,
      profile_picture: husbandData.personal_info.profile_picture,
      memberType: husbandData.personal_info.relation_status,
    },
    {
      id: wifeData.personal_info.registration_form_number,
      name: `${wifeData.personal_info.first_name} ${wifeData.personal_info.last_name}`,
      first_name: wifeData.personal_info.first_name,
      last_name: wifeData.personal_info.last_name,
      gender: wifeData.personal_info.gender,
      relation_status: wifeData.personal_info.relation_status,
      occupation: wifeData.personal_info.occupation,
      profile_picture: wifeData.personal_info.profile_picture,
      memberType: wifeData.personal_info.relation_status,
    },
    ...husbandData.children_info.map((child, index) => ({
      id: child.registration_form_number,
      name: child.child_name,
      first_name: child.child_name.split(" ")[0],
      last_name: child.child_name.split(" ")[1] || "",
      gender: child.gender,
      relation_status: child.relation_status,
      occupation: child.occupation,
      profile_picture: child.child_profile_picture,
      memberType: child.relation_status,
    })),
  ];

  // Initialize response data
  useEffect(() => {
    setResponse(familyList);
    setFilteredResponse(familyList);
    setPageDetail({
      ...pageDetail,
      pageCount: Math.ceil(familyList.length / pageDetail.pageSize),
    });
  }, []);

  // Apply gender filter
  useEffect(() => {
    if (genderFilter === "all") {
      setFilteredResponse(response);
    } else {
      setFilteredResponse(
        response.filter((member: any) => {
          const memberGender = member.gender?.toLowerCase();
          const filterGender = genderFilter.toLowerCase();
          return memberGender === filterGender;
        })
      );
    }
  }, [genderFilter, response]);

  // Handle pagination
  const handlePagination = (index: number, size: number) => {
    console.log("index", index, "size", size);
    setPageDetail({
      ...pageDetail,
      pageIndex: index,
      pageSize: size,
    });
  };

  const handleSelect = (memberType: string, memberData: any) => {
    console.log(`Selected ${memberType}:`, memberData);
    // Navigation will be implemented later
    onContinue(memberData.id);
  };

  const FamilyMemberCard = ({ member }: { member: any }) => (
    <div
      key={member.id}
      onClick={() => handleSelect(member.memberType, member)}
      className="bg-white px-5 rounded-lg hover:bg-slate-100 hover:border-slate-300   transition-all duration-300 shadow-lg border cursor-pointer border-gray-100 p-4   hover:shadow-md"
    >
      <div className="flex items-center space-x-3 mb-3 border-b pb-3">
        <img
          src={member.profile_picture}
          alt={member.name}
          className="w-16 h-16 rounded-md object-cover"
        />
        <div className="flex flex-col flex-1">
          <span className="text-gray-500">Full Name</span>
          <span className="text-[#073954] font-semibold">
            {member.first_name} {member.last_name}
          </span>
        </div>
      </div>

      <div className="space-y-1 mb-3 text-sm">
        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-900 text-base font-medium">Gender</span>
          <span className="text-gray-900 text-base">{member.gender}</span>
        </div>
        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-900 text-base font-medium">
            Relation Ship
          </span>
          <div className="text-base">
            <RelationshipTag relationStatus={member.relation_status} />
          </div>
        </div>
        <div className="flex justify-between ">
          <span className="text-gray-900 text-base font-medium">
            Occupation
          </span>
          <span className="text-gray-900 text-base">{member.occupation}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="py-8 px-5 space-y-8 w-full">
        <div className="flex flex-wrap gap-5 justify-between items-center">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <p className="font-bold text-2xl text-[#073954]">
                Family Members
              </p>
              <p className="text-lg text-[#073954]/40">
                This is the family members section
              </p>
            </div>

            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                {/* layout make the user to choose from the card view or table view */}
                <Select value={view} onValueChange={setView}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Select View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Card View</SelectItem>
                    <SelectItem value="table">Table View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Gender filter dropdown */}
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gender</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              <Button
                className="flex items-center gap-1.5 !h-full primary-button"
                asChild
              >
                <Link href="/civil-registration/birth/new?selected=newChild" className="h-full">
                  <Plus />
                  Add Family Member
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Family Members Cards Section */}
        {view === "card" && (
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResponse.map((member) => (
                <FamilyMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
        {/* Family Members Table Section */}
        {view === "table" && (
          <div className="mt-10">
            <DataTable
              columns={FamilyTableColumns}
              data={filteredResponse}
              handlePagination={handlePagination}
              tablePageSize={pageDetail.pageSize}
              totalPageCount={pageDetail.pageCount}
              currentIndex={pageDetail.pageIndex}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FamilyTree;
