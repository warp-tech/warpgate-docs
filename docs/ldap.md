# LDAP

Warpgate can sync users' SSH public keys from LDAP.

You can manage LDAP servers under `Config` > `LDAP Servers`.

Once an LDAP server is added, you can import users by browsing the LDAP server (from the `Config` > `Users` page, click `Add from LDAP`) or link existing users to their LDAP entries by clicking `LDAP` > `Auto-link to LDAP` on the user configuration page.

Once a user is linked to LDAP, Warpgate will sync their SSH public keys from LDAP every time they try to authenticate. Any existing keys are going to be removed and neither the user nor you will be able to manage their own keys from the Warpgate UI anymore.
