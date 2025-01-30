import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Sidebar from "@/components/Sidebar";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../utils/slices/theme.slice.js"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";;

const AddContentPage = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const adminInfo = useSelector((state) => state.admin.adminInfo || {});

  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
 
  const [subtopics, setSubtopics] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [newSubtopic, setNewSubtopic] = useState("");
  const [hint,setHint] = useState("");

  const [questionDetails, setQuestionDetails] = useState({
    title: "",
    description: "",

    difficulty: "easy",
    tags: [],
    miscellaneous: false,
    url: "",
    examples: [{ input: "", output: "" }],
    constraints: "",
    hints: [],
  });

  // Toggle Theme
  const toggleTheme = () => {
    dispatch(setDarkMode(!darkMode));
  };

  // Handle Example Addition
  const handleAddExample = () => {
    setQuestionDetails((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "" }],
    }));
  };

  // Handle Example Removal
  const handleRemoveExample = (index) => {
    setQuestionDetails((prev) => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index),
    }));
  };

  // Handle Adding a New Topic
  const addNewTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic]);
      setSelectedTopic(newTopic);
      setNewTopic("");
    }
  };

  // Handle Adding a New Subtopic
  const addNewSubtopic = () => {
    if (newSubtopic.trim()) {
      setSubtopics([...subtopics, newSubtopic]);
      setSelectedSubtopic(newSubtopic);
      setNewSubtopic("");
    }
  };

  // Handle Hint Addition
  const handleAddHint = () => {
    setQuestionDetails((prev)=>{
      return {...prev,hints:[...prev.hints,hint]}
    })
  }
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex items-center md:justify-between 
        justify-end px-2 py-4 bg-gray-100 dark:bg-gray-800 shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-semibold hidden md:inline">Add Question</h1>
          <div className="flex gap-4 items-center  ">
            <button
              onClick={toggleTheme}
              className="p-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              {darkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>
            <img
              className="w-10 h-10 rounded-full object-cover shadow"
              src={adminInfo.imageUrl}
              alt="Profile"
            />
          </div>
        </header>

        {/* Form Section */}
        <div className="sm:w-[80%] w-full mx-auto md:p-6 p-2 md:space-y-6 sm:space-y-2">
          <Card className="dark:bg-gray-900 bg-white shadow-lg rounded-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold">Add Question</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5">
                {/* Title */}
                <div>
                  <Label className="text-base font-medium">Title</Label>
                  <Input
                    type="text"
                    value={questionDetails.title}
                    onChange={(e) =>
                      setQuestionDetails({ ...questionDetails, title: e.target.value })
                    }
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
             
                {/* Description */}
                <div>
                  <Label className="text-base font-medium">Description</Label>
                  <Textarea
                    value={questionDetails.description}
                    onChange={(e) =>
                      setQuestionDetails({ ...questionDetails, description: e.target.value })
                    }
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <Label className="text-base font-medium">Difficulty</Label>
                  <Select
                    value={questionDetails.difficulty}
                    onValueChange={(value) =>
                      setQuestionDetails({ ...questionDetails, difficulty: value })
                    }
                  >
                    <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-base font-medium">Tags (comma-separated)</Label>
                  <Input
                    type="text"
                    value={questionDetails.tags.join(", ")}
                    onChange={(e) =>
                      setQuestionDetails({
                        ...questionDetails,
                        tags: e.target.value.split(", "),
                      })
                    }
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                {/* Topic */}
                <div >

                <Label className="text-base font-medium">Topic</Label>
                <div className="md:flex gap-2">
                  {/* Select Topic Dropdown */}
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                      <SelectValue placeholder="Select Topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic, index) => (
                        <SelectItem key={index} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Add Topic Button & Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full md:w-1/2 md:mt-0 px-6 py-3  bg-white
                        text-black hover:bg-gray-200  transition-all duration-300 rounded-lg shadow-md flex items-center justify-center"
                      >
                        Add Topic
                      </Button>

                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a New Topic</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Enter New Topic"
                          value={newTopic}
                          onChange={(e) => setNewTopic(e.target.value)}
                          className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        />
                        <Button
                          onClick={() => {
                            if (newTopic.trim()) {
                              addNewTopic(newTopic);
                              setNewTopic(""); // Reset input after adding
                            }
                          }}
                        >
                          Save Topic
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                </div>
              

                {/* Subtopic */}
                <div>
                  <Label className="text-base font-medium">Subtopic</Label>
                  <div className="md:flex gap-2">
                    {/* Select Subtopic Dropdown */}
                    <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic}>
                      <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                        <SelectValue placeholder="Select Subtopic" />
                      </SelectTrigger>
                      <SelectContent>
                        {subtopics.map((subtopic, index) => (
                          <SelectItem key={index} value={subtopic}>
                            {subtopic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Add Subtopic Button & Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full md:w-1/2 md:mt-0 px-6 py-3  bg-white
                        text-black hover:bg-gray-200  transition-all duration-300 rounded-lg shadow-md flex items-center justify-center">Add Subtopic</Button>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add a New Subtopic</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Enter New Subtopic"
                            value={newSubtopic}
                            onChange={(e) => setNewSubtopic(e.target.value)}
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 w-full"
                          />
                          <Button
                            className="w-full"
                            onClick={() => {
                              if (newSubtopic.trim()) {
                                addNewSubtopic(newSubtopic);
                                setNewSubtopic(""); // Reset input after adding
                              }
                            }}
                          >
                            Save Subtopic
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                 {/* Url */}
                 <div>
                  <Label className="text-base font-medium">URL</Label>
                  <Input
                    type="text"
                    value={questionDetails.url}
                    onChange={(e) =>
                      setQuestionDetails({ ...questionDetails, url: e.target.value })
                    }
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  />
               </div>

                {/* Miscellaneous */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={questionDetails.miscellaneous}
                    onCheckedChange={(value) =>
                      setQuestionDetails({ ...questionDetails, miscellaneous: value })
                    }
                  />
                  <Label>Miscellaneous</Label>
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Examples</Label>
                  {questionDetails.examples.map((example, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Input"
                        value={example.input}
                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        onChange={(e) => {
                          const updatedExamples = [...questionDetails.examples];
                          updatedExamples[index].input = e.target.value;
                          setQuestionDetails({ ...questionDetails, examples: updatedExamples });
                        }}
                      />
                      <Input
                        placeholder="Output"
                        value={example.output}
                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        onChange={(e) => {
                          const updatedExamples = [...questionDetails.examples];
                          updatedExamples[index].output = e.target.value;
                          setQuestionDetails({ ...questionDetails, examples: updatedExamples });
                        }}
                      />
                      <Button variant="destructive" onClick={() => handleRemoveExample(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button className="w-full mt-4" onClick={handleAddExample}>Add Example</Button>
                </div>
                {/* Hint */}
                <div>
                  <Label className="text-base font-medium">Hints</Label>
                  <Textarea
                    value={questionDetails.hints}
                    onChange={(e) =>
                      setHint((prev)=> prev = e.target.value)
                    }
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  /> 
                  <Button onClick={handleAddHint} className="w-full mt-4">Add Hint</Button>                 
                </div>
                {/* Submit */}
                <Button type="submit" className="w-full mt-4">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  );
};

export default AddContentPage;
