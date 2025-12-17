import { apiInitializer } from "discourse/lib/api";
import { h } from "virtual-dom";

export default apiInitializer((api) => {
  console.log("[Business Member Signature] Initializer loaded");
  console.log("[Business Member Signature] Settings:", settings);
  
  api.decorateWidget('post-contents:after-cooked', helper => {
    let attrs = helper.attrs;
    
    console.log("[Business Member Signature] Widget decorated for user:", attrs.username);
    console.log("[Business Member Signature] All attrs:", attrs);
    console.log("[Business Member Signature] primary_group_name:", attrs.primary_group_name);
    console.log("[Business Member Signature] profile_link_groups setting:", settings.profile_link_groups);
    console.log("[Business Member Signature] alternate_sig_groups setting:", settings.alternate_sig_groups);
    
    if (settings.profile_link_groups && attrs.primary_group_name) {
      const profileGroups = Array.isArray(settings.profile_link_groups) 
        ? settings.profile_link_groups 
        : String(settings.profile_link_groups || "").split("|").map(g => g.trim()).filter(g => g);
      
      console.log("[Business Member Signature] Processed profileGroups:", profileGroups);
      console.log("[Business Member Signature] Checking if", attrs.primary_group_name, "is in profileGroups:", profileGroups.includes(attrs.primary_group_name));
      
      if (profileGroups.includes(attrs.primary_group_name)) {
        console.log("[Business Member Signature] Returning profile link signature");
        return h('div.group-signature', h('a.group-user-link',
          { href: '/u/' + helper.attrs.username + '/summary' }, settings.profile_link_text));
      }
    }
    
    if (settings.alternate_sig_groups && attrs.primary_group_name) {
      const alternateGroups = Array.isArray(settings.alternate_sig_groups)
        ? settings.alternate_sig_groups
        : String(settings.alternate_sig_groups || "").split("|").map(g => g.trim()).filter(g => g);
      
      console.log("[Business Member Signature] Processed alternateGroups:", alternateGroups);
      console.log("[Business Member Signature] Checking if", attrs.primary_group_name, "is in alternateGroups:", alternateGroups.includes(attrs.primary_group_name));
      
      if (alternateGroups.includes(attrs.primary_group_name)) {
        console.log("[Business Member Signature] Returning alternate signature");
        return h('div.alt-signature', h('a.alt-sig-link',
          { href: settings.alternate_sig_link }, settings.alternate_sig_text));
      }
    }
    
    console.log("[Business Member Signature] No signature returned for user:", attrs.username);
  });
});

