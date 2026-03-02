# LDAP Authentication

Warpgate supports LDAP authentication, allowing you to integrate with existing LDAP directories like Active Directory or OpenLDAP.

## Setting Up LDAP

1. Go to `Config` > `LDAP Servers`
2. Click "Add LDAP Server"
3. Fill in the connection details:

### Connection Settings

| Field | Description |
|-------|-------------|
| **Name** | A friendly name for this LDAP server |
| **Host** | LDAP server hostname |
| **Port** | LDAP port (typically 389 or 636 for LDAPS) |
| **TLS Mode** | `off`, `starttls`, or `ldaps` |
| **Verify Certificate** | Whether to verify TLS certificates |

### Authentication Settings

| Field | Description |
|-------|-------------|
| **Bind DN** | Distinguished Name to bind as for searching (e.g., `cn=admin,dc=example,dc=com`) |
| **Bind Password** | Password for the bind account |
| **Base DN** | Base Distinguished Names to search in (one or more) |
| **User Filter** | LDAP filter to find users (e.g., `(memberOf=cn=warpgate-users,ou=groups,dc=example,dc=com)`) |

### User Attribute Mapping

| Field | Description | Default |
|-------|-------------|---------|
| **Username Attribute** | LDAP attribute containing the username | `cn` |
| **SSH Key Attribute** | LDAP attribute containing SSH public keys | (none) |
| **UUID Attribute** | LDAP attribute containing a unique user ID | (none) |

### Auto-link SSO Users

Enable "Auto-link SSO users" to automatically link LDAP users to SSO providers based on email matching.

## Example LDAP Configurations

### Active Directory

```yaml
Host: ldap.example.com
Port: 389
TLS Mode: starttls
Bind DN: cn=warpgate,cn=Users,dc=example,dc=com
Base DN: dc=example,dc=com
User Filter: (memberOf=cn=warpgate-users,cn=Users,dc=example,dc=com)
Username Attribute: sAMAccountName
```

### OpenLDAP

```yaml
Host: ldap.example.com
Port: 389
TLS Mode: starttls
Bind DN: cn=admin,dc=example,dc=com
Base DN: ou=people,dc=example,dc=com
User Filter: (objectClass=inetOrgPerson)
Username Attribute: uid
```

## Using LDAP Users

Once configured, users can log in with their LDAP credentials:

1. Navigate to the Warpgate login page
2. Enter their LDAP username and password
3. Warpgate will authenticate against the LDAP server

### SSH Key Management via LDAP

If you configure the SSH Key Attribute, Warpgate will automatically retrieve users' SSH public keys from LDAP. Users can add their public keys to their LDAP attribute, and Warpgate will use them for authentication.

## Troubleshooting LDAP Issues

### Common Issues

1. **Connection refused**: Check the host and port are correct
2. **Invalid credentials**: Verify the Bind DN and password
3. **Users not found**: Check the Base DN and User Filter
4. **TLS errors**: Try disabling certificate verification or check the certificate

### Testing Your Configuration

Use an LDAP browser tool (like ldapsearch) to verify your settings:

```bash
# Test LDAP connection
ldapsearch -H ldap://ldap.example.com:389 \
  -D "cn=warpgate,cn=Users,dc=example,dc=com" \
  -W \
  -b "dc=example,dc=com" \
  "(objectClass=person)"
```

### Security Considerations

- Use LDAPS (port 636) or StartTLS for encrypted connections
- Create a dedicated service account for Warpgate with minimal permissions
- Use a filter to only allow specific groups access to Warpgate
- Regularly rotate the bind password
