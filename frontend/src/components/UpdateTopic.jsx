import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import {DrawerClose} from '@/components/ui/drawer';

const API_URL = "http://localhost:3000";

const UpdateTopic = ({ topic, className, onTopicUpdate }) => {
  
  
  const [topicName, setTopicName] = useState(topic?.name || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Send the updated data to the backend
      const response = await fetch(`${API_URL}/topics/admin/update/${topic._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: topicName }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        console.log("by coming from updae topic",data);
          
        onTopicUpdate(data.topic);
        setError("");
      } else {
        setError(data.message || "Failed to update topic.");
      }
    } catch (error) {
      setError(error.message || "An error occurred while updating the topic.");
    } finally {
      setLoading(false);
    }
  };

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

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500 mt-2">
              ⚠️ {error}
            </p>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <DrawerClose  asChild>

          <Button
            type="button"
            variant="outline"
            className="hover:bg-gray-200 dark:hover:bg-gray-700"

          >
            Cancel
          </Button>
        </DrawerClose>
        <Button
          type="submit"
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateTopic;
