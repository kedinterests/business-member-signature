import { apiInitializer } from "discourse/lib/api";
import { h } from "virtual-dom";

export default apiInitializer((api) => {
  console.log("[Business Member Signature] Initializer loaded");
  
  api.renderInOutlet("after-post-body", (outletArgs) => {
    const post = outletArgs.post;
    
    console.log("[Business Member Signature] Rendering in outlet for post:", post?.id);
    console.log("[Business Member Signature] Post data:", post);
    console.log("[Business Member Signature] Outlet args:", outletArgs);
    
    if (!post) {
      return null;
    }
    
    // Get user's primary group
    const user = post.user;
    const primaryGroup = user?.primary_group_name;
    
    console.log("[Business Member Signature] User:", user?.username);
    console.log("[Business Member Signature] Primary group:", primaryGroup);
    console.log("[Business Member Signature] Settings:", settings);
    
    // Access settings - they should be available in the component context
    const profileLinkGroups = settings?.profile_link_groups || "";
    const alternateSigGroups = settings?.alternate_sig_groups || "";
    const profileLinkText = settings?.profile_link_text || "";
    const alternateSigText = settings?.alternate_sig_text || "";
    const alternateSigLink = settings?.alternate_sig_link || "#";
    
    console.log("[Business Member Signature] profileLinkGroups:", profileLinkGroups);
    console.log("[Business Member Signature] alternateSigGroups:", alternateSigGroups);
    
    // Process list settings - they can be arrays or pipe-separated strings
    const profileGroups = Array.isArray(profileLinkGroups)
      ? profileLinkGroups
      : String(profileLinkGroups || "").split("|").map(g => g.trim()).filter(g => g);
    
    const alternateGroups = Array.isArray(alternateSigGroups)
      ? alternateSigGroups
      : String(alternateSigGroups || "").split("|").map(g => g.trim()).filter(g => g);
    
    console.log("[Business Member Signature] Processed profileGroups:", profileGroups);
    console.log("[Business Member Signature] Processed alternateGroups:", alternateGroups);
    
    // Check if user's primary group matches profile link groups
    if (primaryGroup && profileGroups.includes(primaryGroup)) {
      console.log("[Business Member Signature] Returning profile link signature");
      return h('div.group-signature', [
        h('a.group-user-link', { href: `/u/${user.username}/summary` }, profileLinkText)
      ]);
    }
    
    // Check if user's primary group matches alternate signature groups
    if (primaryGroup && alternateGroups.includes(primaryGroup)) {
      console.log("[Business Member Signature] Returning alternate signature");
      return h('div.alt-signature', [
        h('a.alt-sig-link', { href: alternateSigLink }, alternateSigText)
      ]);
    }
    
    console.log("[Business Member Signature] No signature returned");
    return null;
  });
});

