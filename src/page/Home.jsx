import React, { useEffect } from "react";

export default function Home() {
  console.log();
  useEffect(() => {
    if (import.meta.env.DEV) {
      setTimeout(() => {
        window.location.href = "https://www.thebodyshop.co.id/";
      }, 3000);
    }
  }, []);
  return <div></div>;
}
