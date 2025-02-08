import React from 'react';
import { useSelector } from 'react-redux';

const TopicCovered = () => {

  const theme = useSelector((state)=>state.theme.darkMode);
  const topic = useSelector((state)=>state.topic.topics);

  console.log(topic);
  
  const topics = [
    { name: 'Array', count: 144 },
    { name: 'String', count: 132 },
    { name: 'Linked List', count: 120 },
    { name: 'Tree', count: 108 },
    { name: 'Graph', count: 96 },
    { name: 'Stack', count: 84 },
    { name: 'Queue', count: 72 },
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Topics Covered</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{topic.name}</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{topic.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicCovered;
