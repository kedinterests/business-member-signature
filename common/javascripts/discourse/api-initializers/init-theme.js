import { apiInitializer } from "discourse/lib/api";
import { h } from "virtual-dom";

export default apiInitializer((api) => {
  api.decorateWidget('post-contents:after-cooked', helper => {
    let attrs = helper.attrs;
    if (settings.profile_link_groups.includes(attrs.primary_group_name)) {
      return h('div.group-signature', h('a.group-user-link',
        { href: '/u/' + helper.attrs.username + '/summary' }, settings.profile_link_text));
    } else {
      if (settings.alternate_sig_groups.includes(attrs.primary_group_name)) {
        return h('div.alt-signature', h('a.alt-sig-link',
          { href: settings.alternate_sig_link }, settings.alternate_sig_text));
      }
    }
  });
});

