"use client";

import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";

export default function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1);

    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loader />;
}
