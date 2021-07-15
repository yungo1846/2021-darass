import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { QUERY } from "../constants/api";
import { Project } from "../types/project";
import { request } from "../utils/request";

const useProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getProjectsAsync = async () => {
      try {
        const projects = await request.get<Project[]>(QUERY.PROJECT);

        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    };

    getProjectsAsync();
  }, []);

  return { projects };
};

export default useProject;
