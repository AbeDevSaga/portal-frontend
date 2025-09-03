import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import { TriangleAlert } from "lucide-react";
import React from "react";

const TotalRaisedIssue = ({
    raisedIssues = [
        {
            issueId: "32a123123",
            raisedBy: "Bereket Nigussie",
            resolved: true,
            issue: "The System shows that the fingerprint is similar with another person",
        },
        {
            issueId: "32a123123",
            raisedBy: "Bereket Nigussie",
            resolved: true,
            issue: "The System shows that the fingerprint is similar with another person",
        },
        {
            issueId: "32a123123",
            raisedBy: "Bereket Nigussie",
            resolved: true,
            issue: "The System shows that the fingerprint is similar with another person",
        },
        {
            issueId: "32a123123",
            raisedBy: "Bereket Nigussie",
            resolved: true,
            issue: "The System shows that the fingerprint is similar with another person",
        },
        {
            issueId: "32a123123",
            raisedBy: "Bereket Nigussie",
            resolved: true,
            issue: "The System shows that the fingerprint is similar with another person",
        },
        {
            issueId: "32a123123",
            raisedBy: "Bereket Nigussie",
            resolved: true,
            issue: "The System shows that the fingerprint is similar with another person",
        },
    ],
}) => {
    return (
        <Card className='py-5 px-5 w-full space-y-5'>
            <p className='text-2xl font-semibold'>
                Total Raised Issue ({raisedIssues.length})
            </p>
            <div className='h-[250px] overflow-y-scroll space-y-5'>
                {raisedIssues.map((item) => (
                    <div
                        key={item.issueId}
                        className='border rounded-md py-1.5 px-3'
                    >
                        <p>#Issue ID : {item.issueId}</p>
                        <div className='rounded-sm border p-1'>
                            <div className='grid lg:grid-cols-5 gap-1'>
                                <div className='lg:col-span-2 flex flex-col'>
                                    <div className='flex-1 min-h-[120px]'></div>
                                    <Button asChild>
                                        <p>
                                            {item.resolved
                                                ? "Resolved"
                                                : "Not Resolved"}
                                        </p>
                                    </Button>
                                </div>
                                <div className='lg:col-span-3 text-xs flex flex-col justify-between'>
                                    <p className='text-xs'>{item.issue}</p>
                                    <div>
                                        <p>Raised By</p>
                                        <div className='flex items-center gap-2'>
                                            <Avatar>
                                                <AvatarImage src='' />
                                                <AvatarFallback>
                                                    {item.raisedBy}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p>{item.raisedBy}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div></div>
                        </div>
                    </div>
                ))}
            </div>
            <Button className='flex items-center gap-2 w-full py-2' size='lg'>
                <TriangleAlert />
                <p>Raise Issue</p>
            </Button>
        </Card>
    );
};

export default TotalRaisedIssue;
