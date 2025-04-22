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
import { addTopic, updateTopic } from "../utils/slices/topic.slice.js";
import { toast } from 'react-hot-toast';
import { addSubTopic, updateSubtopics } from "../utils/slices/subtopic.slice.js";
import { Loader2 } from "lucide-react";



const API_URL= import.meta.env.VITE_API_URL;

const AddContentPage = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const adminInfo = useSelector((state) => state.admin.adminInfo || {});
  // states
  const [topics, setTopics] = useState({});
  const [subtopic, setSubtopic] = useState({});
  const [errortopics, setErrorTopics] = useState('');
  const [selectedTopic, setSelectedTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [topicdesc, setTopicdesc] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [newSubtopic, setNewSubtopic] = useState("");

  // Error state
  const [SubtopicError, setSubtopicError] = useState('');
  const [questionError, setQuestionError] = useState('');
  const [hint, setHint] = useState("");

  // loader state
  const [topicLoading, setTopicLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [subtopicLoading, setSubtopicLoading] = useState(false);

  const [questionDetails, setQuestionDetails] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    tags: [],
    miscellaneous: false,
    url: "",
    examples: [{ input: "", output: "" }],
    constraints: [],
    hints: [],
    topicId: "",
    subtopicId: "",
  });


  const toggleTheme = () => {
    dispatch(setDarkMode(!darkMode));
  }

  // fetching the topics when page load and when topic got updated
  console.log(questionDetails);
  

  useEffect(() => {
    const fetchTopics = async () => {
      setTopicLoading(true);
      setErrorTopics('');

      try {
        const response = await fetch(`${API_URL}/topics/getalltopics`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json(); // Await the response correctly

        if (data.success) {
          setTopics(data.topics);
          setSelectedTopic(data.topics[0]?._id); // Handle undefined cases safely
        } else {
          setErrorTopics(data.message);
        }
      } catch (error) {
        setErrorTopics(error.message);
      } finally {
        setTopicLoading(false);
      }
    };

    fetchTopics();
  }, [API_URL]);


  // fetching the subtopics when page load and when subtopic got updated

  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        setSubtopicError('');
        setSubtopicLoading(true);

        const response = await fetch(`${API_URL}/subtopics/${selectedTopic}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json();
       // console.log(data);

        if (data.success) {
          setSubtopic(data.subtopics);
          setSelectedSubtopic(data.subtopics[0]?._id);
        } else {
          setSubtopicError(data.message);

        }
      } catch (error) {
        setSubtopicError(error.message || 'An unexpected error occurred');
      } finally {
        setSubtopicLoading(false);
      }
    }
    fetchSubtopics();
  }, [selectedTopic, API_URL]);




  const handleAddTopic = async () => {
    try {
      setErrorTopics('');
      setTopicLoading(true);

      const response = await fetch(`${API_URL}/topics/admin/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTopic, description: topicdesc }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setTopics([...topics, data.topic]);
        toast.success(data.message);
        setNewTopic('');
        setTopicdesc('');
        setErrorTopics('');
      } else {
        toast.error(data.message);
        setErrorTopics(data.message);
      }
    } catch (error) {

      setErrorTopics(error.message || 'An unexpected error occurred');
    } finally {

      setTopicLoading(false);
    }
  };



  const handleAddSubtopic = async () => {
    try {
      setSubtopicError('');
      setSubtopicLoading(true);

      const response = await fetch(`${API_URL}/subtopics/admin/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newSubtopic, topicId: selectedTopic }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setSubtopic((prevSubtopics) => [...prevSubtopics, data.subtopic]);
        toast.success(data.message);
        setNewSubtopic('');
        setSubtopicError('');
      } else {
        toast.error(data.message);
        setSubtopicError(data.message);
      }
    } catch (error) {
      setSubtopicError(error.message || 'An unexpected error occurred');
    } finally {
      setSubtopicLoading(false);
    }
  };


  const handleAddExample = () => {
    setQuestionDetails((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "" }]
    }))
  }

  const handleRemoveExample = (index) => {
    setQuestionDetails((prev) => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index)
    }));
  };




  const handleAddHint = () => {
    setQuestionDetails((prev) => {
      return {
        ...prev,
        hints: [...prev.hints, hint]
      }
    })
  }


  const handleRemoveHints = (index) => {
    setQuestionDetails((prev) => {
      return {
        ...prev, hints: prev.hints.filter((_, i) => i !== index)
      }
    })
  }


 console.log(selectedSubtopic);
 


  const handleQuestionSubmit = async () => {
    try {
        setQuestionLoading(true); 
        setQuestionError('');

       
        const updatedQuestionDetails = {
            ...questionDetails,
            topicId: selectedTopic,
            subtopicId: selectedSubtopic
        };
        
        console.log(updatedQuestionDetails);
        

        const response = await fetch(`${API_URL}/questions/admin/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedQuestionDetails), 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
            toast.success(data.message);
            setQuestionDetails({
                title: "",
                description: "",
                difficulty: "easy",
                tags: [],
                miscellaneous: false,
                url: "",
                examples: [{ input: "", output: "" }],
                constraints: [],
                hints: [],
                topicId: "",
                subtopicId: "",
            })
        } else {
            toast.error(data.message);
            setQuestionError(data.message);
        }
    } catch (error) {
        setQuestionError(error.message || 'An unexpected error occurred');
    } finally {
        setQuestionLoading(false);
    }
};

  
  return (
    <div className="flex flex-col md:flex-row h-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden" >
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
                <div>
                  <Label className="text-base font-medium">Topic</Label>
                  <div className="md:flex gap-2">
                    {/* Show error if any */}
                    {errortopics ? (
                      <p className="text-red-500 text-sm">{errortopics}</p>
                    ) : (
                      <>
                        {/* Ensure topics exist before rendering Select */}
                        {topics && Object.keys(topics).length > 0 ? (
                          <Select value={selectedTopic} onValueChange={value => setSelectedTopic(value)}>
                            <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                              <SelectValue placeholder="Select Topic" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(topics).map((topic, index) => (

                                <SelectItem key={topic?._id || index} value={topic?._id}>
                                  {topic?.name}
                                </SelectItem>
                              ))}

                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-gray-500 text-sm">No topics available</p> // Show outside of Select
                        )}
                      </>
                    )}

                    {/* Add Topic Button & Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full md:w-1/2 md:mt-0 px-6 py-3 bg-white text-black hover:bg-gray-200 
          transition-all duration-300 rounded-lg shadow-md flex items-center justify-center"
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

                          <Input
                            placeholder="Enter the description"
                            value={topicdesc}
                            onChange={(e) => setTopicdesc(e.target.value)}
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                          />

                          {
                            topicLoading ? (
                              <div className="flex justify-center items-center">
                                <Loader2 className="h-6 w-6 animate-spin text-gray-200 dark:text-gray-700" />
                              </div>
                            ) : (
                              <Button
                                onClick={handleAddTopic} disabled={topicLoading}
                              >
                                Save Topic
                              </Button>

                            )
                          }
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Subtopic</Label>
                  <div className="md:flex gap-2">
                    {/* Show error if any */}
                    {SubtopicError ? (
                      <p className="text-red-500 text-sm">{SubtopicError}</p>
                    ) : (
                      <>
                        {/* Ensure subtopics exist before rendering Select */}
                        {subtopic && Object.keys(subtopic).length > 0 ? (
                          <Select value={selectedSubtopic} onValueChange={value => setSelectedSubtopic(value)}>
                            <SelectTrigger className="border-gray-300 dark:border-gray-700 dark:bg-gray-800">
                              <SelectValue placeholder="Select Subtopic" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(subtopic).map((sub, index) => (
                                <SelectItem key={sub?._id || index} value={sub?._id}>
                                  {sub?.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-gray-500 text-sm">No subtopics available</p>
                        )}
                      </>
                    )}

                    {/* Add Subtopic Button & Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full md:w-1/2 md:mt-0 px-6 py-3 bg-white text-black hover:bg-gray-200 transition-all duration-300 rounded-lg shadow-md flex items-center justify-center"
                        >
                          Add Subtopic
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add a New Subtopic</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Enter New Subtopic"
                            value={newSubtopic}
                            onChange={(e) => setNewSubtopic(e.target.value)}
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                          />

                          {
                            subtopicLoading ? (
                              <div
                                className="flex justify-center items-center">
                                <Loader2 className="h-6 w-6 animate-spin text-gray-200 dark:text-gray-700" />
                              </div>) : (
                              <Button onClick={handleAddSubtopic}>Save Subtopic</Button>
                            )
                          }

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
                  <Button className="w-full mt-4" onClick={handleAddExample} type='button'>Add Example</Button>
                </div>
                {/* Hint */}

                <div className="space-y-3">
                  <Label className="text-base font-medium">Hints</Label>
                  {questionDetails.hints.map((hint, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Add Hint"
                        value={hint}  // Directly accessing hint since hints is an array of strings
                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        onChange={(e) => {
                          const updatedHints = [...questionDetails.hints];
                          updatedHints[index] = e.target.value; // Correctly updating the index
                          setQuestionDetails({ ...questionDetails, hints: updatedHints });
                        }}
                      />

                      <Button variant="destructive" onClick={() => handleRemoveHints(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button className="w-full mt-4" onClick={handleAddHint} type="button">
                    Add Hint
                  </Button>
                </div>

                {/* contraint */}

                {/* Tags */}
                <div>
                  <Label className="text-base font-medium">Constraints (comma-separated)</Label>
                  <Input
                    type="text"
                    value={questionDetails.constraints.join(", ")}
                    onChange={(e) =>
                      setQuestionDetails({
                        ...questionDetails,
                        constraints: e.target.value.split(", "),
                      })
                    }
                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
                {/* Submit */}
                <Button type="submit" onClick={handleQuestionSubmit} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full items-center flex justify-center mx-auto h-14" disabled={questionLoading}>
                  {questionLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Submit"
                  )}
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
