import { useState, useEffect } from "react";

type npmDownloadProps = {
  repoName: string;
  orgName: string;
};

export const useGithubPullRequests = ({
  repoName,
  orgName,
}: npmDownloadProps) => {
  const [pullRequests, setPullRequests] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${orgName}/${repoName}/pulls`,
        );
        const data = await response.json();
        setPullRequests(typeof data?.length === "number" ? data.length : null);
      } catch (error) {
        console.error("Error fetching download data:", error);
        setPullRequests(null);
      }
    }

    load();
  }, [repoName, orgName]);

  return pullRequests;
};
