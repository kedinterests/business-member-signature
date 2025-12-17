import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  console.log("[Business Member Signature] Initializer loaded");
  console.log("[Business Member Signature] Settings:", settings);
  
  // Register a helper to check if a value is in a list
  api.registerHelper("includes-group", function(groupList, groupName) {
    if (!groupList || !groupName) return false;
    
    const groups = Array.isArray(groupList)
      ? groupList
      : String(groupList || "").split("|").map(g => g.trim()).filter(g => g);
    
    return groups.includes(groupName);
  });
  
  // The template file at javascripts/discourse/connectors/after-post-body/business-member-signature.hbs
  // will automatically be used by Discourse to render in the outlet
});

