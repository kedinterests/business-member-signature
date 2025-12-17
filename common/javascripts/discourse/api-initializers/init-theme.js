import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  api.decorateWidget('post-contents:after-cooked', helper => {
    let h = helper.h,
        attrs = helper.attrs;
    
    if (settings.profile_link_groups && attrs.primary_group_name) {
      const profileGroups = Array.isArray(settings.profile_link_groups) 
        ? settings.profile_link_groups 
        : String(settings.profile_link_groups || "").split("|").map(g => g.trim()).filter(g => g);
      
      if (profileGroups.includes(attrs.primary_group_name)) {
        return h('div.group-signature', h('a.group-user-link',
          { href: '/u/' + helper.attrs.username + '/summary' }, settings.profile_link_text));
      }
    }
    
    if (settings.alternate_sig_groups && attrs.primary_group_name) {
      const alternateGroups = Array.isArray(settings.alternate_sig_groups)
        ? settings.alternate_sig_groups
        : String(settings.alternate_sig_groups || "").split("|").map(g => g.trim()).filter(g => g);
      
      if (alternateGroups.includes(attrs.primary_group_name)) {
        return h('div.alt-signature', h('a.alt-sig-link',
          { href: settings.alternate_sig_link }, settings.alternate_sig_text));
      }
    }
  });
});

