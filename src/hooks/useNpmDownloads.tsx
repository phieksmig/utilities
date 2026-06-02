import { useState, useEffect } from "react";

type npmDownloadProps = {
  packageName: string;
  point: string;
}

export const useNpmDownloads = ({ packageName, point }: npmDownloadProps) => {
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          `https://api.npmjs.org/downloads/point/${point}/${packageName}`,
        );
        const data = await response.json();
        setDownloads(
          typeof data?.downloads === "number" ? data.downloads : null,
        );
      } catch (error) {
        console.error("Error fetching download data:", error);
        setDownloads(null);
      }
    }

    load();
  }, [packageName, point]);

  return downloads;
}   