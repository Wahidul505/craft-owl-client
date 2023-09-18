import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ToolCard from "./ToolCard";

const Tools = () => {
  const { data: tools, isLoading } = useQuery("display-tools", () =>
    fetch("https://craft-owl-server.vercel.app/tool").then((res) => res.json())
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {tools.map((tool) => (
          <ToolCard key={tool._id} tool={tool} />
        ))}
      </div>
      <p className="text-2xl text-primary underline text-right">
        <Link to="/tools">See All</Link>
      </p>
    </div>
  );
};

export default Tools;
