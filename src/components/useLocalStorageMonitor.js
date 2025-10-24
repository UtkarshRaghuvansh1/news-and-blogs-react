import { useEffect, useState } from "react";

// Helper function to calculate and return local storage usage data
const getLocalStorageUsage = () => {
  // Common limit for localStorage is 5MB.
  const MAX_STORAGE_BYTES = 5 * 1024 * 1024;
  let totalBytesUsed = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    // Rough estimate: sum of key length + value length, multiplied by 2 bytes/char (UTF-16)
    totalBytesUsed += (key.length + (value ? value.length : 0)) * 2;
  }

  // Convert bytes to KB for readability
  const totalKBUsed = (totalBytesUsed / 1024).toFixed(2);
  const remainingKB = Math.max(
    0,
    (MAX_STORAGE_BYTES - totalBytesUsed) / 1024
  ).toFixed(2);
  const percentUsed = ((totalBytesUsed / MAX_STORAGE_BYTES) * 100).toFixed(2);

  // Log to console for debugging purposes
  console.log("--- Local Storage Usage Report ---");
  console.log(`Total data currently used (approx): ${totalKBUsed} KB`);
  console.log(`Remaining space (approx): ${remainingKB} KB`);
  console.log(`Percentage used: ${percentUsed}%`);
  console.log("----------------------------------");

  return {
    usedKB: totalKBUsed,
    remainingKB: remainingKB,
    percentUsed: percentUsed,
  };
};

// --- CUSTOM HOOK ---
// Encapsulates the logic for tracking local storage usage.
export const useLocalStorageMonitor = () => {
  const [storageUsage, setStorageUsage] = useState({
    usedKB: "0.00",
    remainingKB: "5120.00",
    percentUsed: "0.00",
  });

  // Function to manually refresh and set the usage data
  const updateUsage = () => {
    const usage = getLocalStorageUsage();
    setStorageUsage(usage);
  };

  // Update usage immediately on component mount
  useEffect(() => {
    updateUsage();
  }, []);

  return { storageUsage, updateUsage };
};
