import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { REACT_QUERY_KEY } from "../constants";
import { QUERY } from "../constants/api";
import { Project } from "../types/project";
import { request } from "../utils/request";

const useProject = () => {
  const queryClient = useQueryClient();

  const {
    data: projects,
    isLoading,
    error
  } = useQuery<Project[], Error>(REACT_QUERY_KEY.PROJECT, () => request.get(QUERY.PROJECT));

  const addMutation = useMutation<Project, Error, Project["name"]>(
    projectName => request.post(QUERY.PROJECT, projectName),
    {
      onSuccess: data => {
        queryClient.setQueryData<Project[] | undefined>(REACT_QUERY_KEY.PROJECT, projects => {
          return projects?.concat(data);
        });
      }
    }
  );

  const addProject = async (projectName: Project["name"]) => {
    const project = await addMutation.mutateAsync(projectName);

    return project;
  };

  return { projects, addProject };
};

export default useProject;
