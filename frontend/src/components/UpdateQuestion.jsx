import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { DrawerClose } from '@/components/ui/drawer';

const API_URL = "http://localhost:3000";

const UpdateQuestion = ({ question, className , onQuestionUpdate }) => {
    const [title, setTitle] = useState(question?.title || '');
    const [description, setDescription] = useState(question?.description || '');
    const [tags, setTags] = useState(question?.tags.join(", ") || ''); // Convert tags to comma-separated string
    const [url, setUrl] = useState(question?.url || '');
    
    const [youtubeLink,setYoutubeLink] = useState(question?.videoLink || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Reset tags to comma-separated string if `question` is updated
        setTags(question?.tags.join(", ") || '');
    }, [question]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            // Convert tags from comma-separated string to an array
            const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag); // Remove empty tags

            // Send the updated data to the backend
            const response = await fetch(`${API_URL}/questions/update/${question._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, tags: tagsArray, url,videoLink:youtubeLink }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                console.log(data);
                
                onQuestionUpdate(data.question);
                setError("");
            } else {
                console.log(data.message);
                
                setError(data.message || "Failed to update question.");
            }
        } catch (error) {
            setError(error.message || "An error occurred while updating the question.");
        } finally {
            setLoading(false);
        }
    };

    console.log(youtubeLink)
    
    return (
        <Card className={cn("w-full max-w-md shadow-lg rounded-xl mx-auto", className)}>
            <CardHeader className="border-b">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                    Update Question
                </h3>
            </CardHeader>

            <CardContent>
                <form className="grid gap-4" onSubmit={handleUpdate}>
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                            Title
                        </Label>
                        <Input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            placeholder="Enter question title..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            Description
                        </Label>
                        <Input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            placeholder="Enter question description..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tags" className="text-sm font-medium">
                            Tags (comma-separated)
                        </Label>
                        <Input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            placeholder="Enter tags separated by commas..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="url" className="text-sm font-medium">
                            URL
                        </Label>
                        <Input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            placeholder="Enter URL..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="url" className="text-sm font-medium">
                            Youtube Link
                        </Label>
                        <Input
                            type="text"
                            id="youtubeLink"
                            value={youtubeLink}
                            onChange={(e) => setYoutubeLink(e.target.value)}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            placeholder="Enter Youtube URL..."
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
                <DrawerClose asChild>
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

export default UpdateQuestion;
