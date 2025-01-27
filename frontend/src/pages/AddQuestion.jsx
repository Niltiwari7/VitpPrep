import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const AddContentPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
  
  const [subtopics, setSubtopics] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [newSubtopic, setNewSubtopic] = useState("");
  
  const [questionDetails, setQuestionDetails] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    tags: [],
    miscellaneous: false,
    url: "",
    examples: [{ input: "", output: "" }],
  });

//   // Fetch topics on page load
//   useEffect(() => {
//     axios.get("/api/topics").then((res) => setTopics(res.data));
//   }, []);

//   // Fetch subtopics whenever a topic is selected
//   useEffect(() => {
//     if (selectedTopic) {
//       axios.get(`/api/subtopics?topicId=${selectedTopic}`).then((res) => setSubtopics(res.data));
//     }
//   }, [selectedTopic]);

  const handleAddExample = () => {
    setQuestionDetails({
      ...questionDetails,
      examples: [...questionDetails.examples, { input: "", output: "" }],
    });
  };

  const handleRemoveExample = (index) => {
    const newExamples = [...questionDetails.examples];
    newExamples.splice(index, 1);
    setQuestionDetails({ ...questionDetails, examples: newExamples });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add topic if new
      let topicId = selectedTopic;
      if (newTopic) {
        const topicResponse = await axios.post("/api/topics", { name: newTopic });
        topicId = topicResponse.data._id;
      }

      // Add subtopic if new
      let subtopicId = selectedSubtopic;
      if (newSubtopic) {
        const subtopicResponse = await axios.post("/api/subtopics", {
          name: newSubtopic,
          topicId,
        });
        subtopicId = subtopicResponse.data._id;
      }

      // Add question
      await axios.post("/api/questions", {
        ...questionDetails,
        subtopicId,
      });

      alert("Content added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding content.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Add Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic Section */}
            <div className="grid gap-4">
              <Label>Topic</Label>
              <div className="flex gap-4">
                <Select
                  onValueChange={(value) => setSelectedTopic(value)}
                  disabled={!!newTopic}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic._id} value={topic._id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Add New Topic"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  disabled={!!selectedTopic}
                />
              </div>
            </div>

            {/* Subtopic Section */}
            <div className="grid gap-4">
              <Label>Subtopic</Label>
              <div className="flex gap-4">
                <Select
                  onValueChange={(value) => setSelectedSubtopic(value)}
                  disabled={!!newSubtopic}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Subtopic" />
                  </SelectTrigger>
                  <SelectContent>
                    {subtopics.map((subtopic) => (
                      <SelectItem key={subtopic._id} value={subtopic._id}>
                        {subtopic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Add New Subtopic"
                  value={newSubtopic}
                  onChange={(e) => setNewSubtopic(e.target.value)}
                  disabled={!!selectedSubtopic}
                />
              </div>
            </div>

            {/* Question Details Section */}
            <div className="grid gap-4">
              <Label>Question Title</Label>
              <Input
                type="text"
                value={questionDetails.title}
                onChange={(e) => setQuestionDetails({ ...questionDetails, title: e.target.value })}
                required
              />

              <Label>Description</Label>
              <Textarea
                value={questionDetails.description}
                onChange={(e) => setQuestionDetails({ ...questionDetails, description: e.target.value })}
                required
              />

              <Label>Difficulty</Label>
              <Select
                onValueChange={(value) =>
                  setQuestionDetails({ ...questionDetails, difficulty: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Label>Tags (comma-separated)</Label>
              <Input
                type="text"
                placeholder="e.g., Arrays, Sorting"
                onChange={(e) =>
                  setQuestionDetails({
                    ...questionDetails,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
              />

              <Label>Miscellaneous</Label>
              <Checkbox
                checked={questionDetails.miscellaneous}
                onCheckedChange={(checked) =>
                  setQuestionDetails({ ...questionDetails, miscellaneous: checked })
                }
              >
                Include Miscellaneous
              </Checkbox>

              <Label>URL</Label>
              <Input
                type="url"
                value={questionDetails.url}
                onChange={(e) => setQuestionDetails({ ...questionDetails, url: e.target.value })}
                required
              />

              <Label>Examples</Label>
              {questionDetails.examples.map((example, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <Input
                    type="text"
                    placeholder="Input"
                    value={example.input}
                    onChange={(e) => {
                      const newExamples = [...questionDetails.examples];
                      newExamples[index].input = e.target.value;
                      setQuestionDetails({ ...questionDetails, examples: newExamples });
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="Output"
                    value={example.output}
                    onChange={(e) => {
                      const newExamples = [...questionDetails.examples];
                      newExamples[index].output = e.target.value;
                      setQuestionDetails({ ...questionDetails, examples: newExamples });
                    }}
                  />
                  <Button variant="destructive" onClick={() => handleRemoveExample(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={handleAddExample} variant="outline">
                Add Example
              </Button>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddContentPage;
