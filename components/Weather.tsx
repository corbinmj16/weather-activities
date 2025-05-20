"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import type { Location } from "@/app/_types/Location";
import ReactMarkdown from "react-markdown";
import { ChatCompletionMessage } from "openai/src/resources.js";
import { Thermometer, MapPin } from "lucide-react";

export default function Weather() {
  const [zipCode, setZipCode] = useState<string | null>(null);
  const [weather, setWeather] = useState<Location | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [content, setContent] = useState<string | null>(null);

  async function handleZip() {
    try {
      const response = await fetch(`/api/weather/${zipCode}`);
      const data: Location = await response.json();

      setWeather(data);
      getActivites(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getActivites(data: Location) {
    setIsLoadingContent(true);

    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const activity: ChatCompletionMessage = await response.json();

      console.log("got it: ", activity);

      setContent(activity.content);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingContent(false);
    }
  }

  function ActivityContent() {
    if (!content && isLoadingContent) {
      return <p>Loading</p>;
    }
    if (content && !isLoadingContent) {
      return <ReactMarkdown>{content}</ReactMarkdown>;
    }
    return null;
  }

  return (
    <section className=" max-w-2xl mx-auto">
      <Label htmlFor="Zipcode">Zipcode</Label>
      <div className="flex gap-2">
        <Input
          type="zipcode"
          id="Zipcode"
          placeholder="29909"
          onChange={(e) => setZipCode(e.target.value)}
        />
        <Button onClick={() => handleZip()}>Plan my day</Button>
      </div>

      {weather && (
        <ul className="my-4">
          <li>
            <MapPin className="size-10" />
            {weather.location.name}
          </li>
          <li>
            <Thermometer className="size-10" />
            {weather.data.values.temperature}
          </li>
        </ul>
      )}

      <ActivityContent />
    </section>
  );
}
