import { useState, useEffect } from "react";

type npmDownloadProps = {
  repoName: string;
  orgName: string;
};

export const useGithubIssues = ({ repoName, orgName }: npmDownloadProps) => {
  const [openIssues, setOpenIssues] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${orgName}/${repoName}`,
        );
        const data = await response.json();
        setOpenIssues(
          typeof data?.open_issues_count === "number"
            ? data.open_issues_count
            : null,
        );
      } catch (error) {
        console.error("Error fetching download data:", error);
        setOpenIssues(null);
      }
    }

    load();
  }, [repoName, orgName]);

  return openIssues;
};
