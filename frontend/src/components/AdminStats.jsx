import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { FaBook, FaList, FaQuestion, FaUser } from 'react-icons/fa';

const AdminStats = ({ topics, subtopics, questions, userCount }) => {

    const stats = [
        {
            label: "Topics Created",
            value: topics,
            icon: <FaBook size={24} />,
            content: "Number of Topics"
        },
        {
            label: "Subtopics Created",
            value: subtopics,
            icon: <FaList size={24} />,
            content: "Number of Subtopics"
        },
        {
            label: "Questions Added",
            value: questions,
            icon: <FaQuestion size={24} />,
            content: "Number of question Created"
        },
        {
            label: 'Number of Users',
            value: userCount,
            icon: <FaUser size={24} />,
            content: "Number of User with Us"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
            {stats.map((stat, index) => (
                <Card key={index} className="shadow-md  transition min-h-[180px] hover:-translate-y-2 hover:shadow-xl duration-300">
                    <CardHeader className="flex items-center gap-4 p-4">
                        <div className={`bg-${stat.value > 0 ? 'green' : 'red'}-100 text-${stat.value > 0 ? 'green' : 'red'}-600 rounded-full p-2`}>
                            {stat.icon}
                        </div>
                        <div>
                            <CardTitle className="text-xl font-semibold text-center text-gray-800 dark:text-white">
                                {stat.value}
                            </CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        </div>
                    </CardHeader>
                    <CardContent className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-200">
                        {stat.content}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AdminStats;
