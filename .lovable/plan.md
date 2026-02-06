

## Enable Leaked Password Protection

This will enable the "Leaked Password Protection" feature in the authentication settings, which prevents users from signing up or changing their password to one that has been found in known data breaches.

### What will change

- The authentication system will be configured to reject passwords that appear in known breach databases (such as HaveIBeenPwned).
- Users attempting to sign up or reset their password with a compromised password will receive an error asking them to choose a different password.

### Technical details

- Use the `configure-auth` tool to enable the `LEAKED_PASSWORD_PROTECTION` setting on the authentication configuration.
- No code changes are required -- this is a backend configuration update.
- After enabling, the `SUPA_auth_leaked_password_protection` security finding will be deleted from the scan results.

