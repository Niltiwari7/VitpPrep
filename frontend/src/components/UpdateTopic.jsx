import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const UpdateTopic = ({ topic, className }) => {
  const [topicName, setTopicName] = useState(topic?.name || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Topic:", topicName);
    
  };
  console.log(topic);
  
  return (
    <Card className={cn("w-full max-w-md shadow-lg rounded-xl", className)}>
      <CardHeader className="border-b">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Update Topic
        </h3>
      </CardHeader>

      <CardContent>
        <form className="grid gap-4" onSubmit={handleUpdate}>
          <div className="grid gap-2">
            <Label htmlFor="topicName" className="text-sm font-medium">
              Topic Name
            </Label>
            <Input
              type="text"
              id="topicName"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className="border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter topic name..."
            />
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          className="hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button type="submit" onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
          Update
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateTopic;
