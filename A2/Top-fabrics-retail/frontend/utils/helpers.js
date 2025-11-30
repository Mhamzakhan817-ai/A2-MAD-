export const capitalize = (text) => {
if (!text) return "";
return text.charAt(0).toUpperCase() + text.slice(1);
};


export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// Format fabric names nicely
export const formatFabricName = (name) => capitalize(name.trim());