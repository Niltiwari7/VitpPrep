import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { FaBook, FaList, FaQuestion } from 'react-icons/fa';

const AdminStats = ({ topics, subtopics, questions }) => {
    const stats = [
        { label: "Topics Created", value: topics, icon: <FaBook size={24} /> },
        { label: "Subtopics Created", value: subtopics, icon: <FaList size={24} /> },
        { label: "Questions Added", value: questions, icon: <FaQuestion size={24} /> },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
            {stats.map((stat, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition">
                    <CardHeader className="flex items-center gap-4 p-4">
                        <div className="bg-blue-100 text-blue-600 rounded-full p-3">
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
                        Stay consistent and keep adding more!
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AdminStats;
