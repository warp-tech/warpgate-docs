# Rate Limiting

<div class="badge font-xs text-bg-warning mb-3">v0.16+</div>

Warpgate supports bandwidth rate limiting to control the throughput of connections. Rate limits can be configured at three levels:

1. **Global** - applies to all connections
2. **Per User** - applies to a specific user
3. **Per Target** - applies to a specific target

When multiple rate limits apply, the most restrictive limit is used.

## Setting Global Rate Limits

To set a global rate limit that applies to all users:

1. Go to `Config` > `Global parameters`
2. Find the "Rate limit" field
3. Enter the limit in bytes per second (e.g., `1048576` for 1 MB/s)

## Setting Per-User Rate Limits

To limit bandwidth for a specific user:

1. Go to `Config` > `Users`
2. Select the user
3. Find the "Rate limit" field
4. Enter the limit in bytes per second

This is useful for:
- Limiting bandwidth for specific user groups
- Setting different tiers for different users
- Preventing any single user from consuming too much bandwidth

## Setting Per-Target Rate Limits

To limit bandwidth for a specific target:

1. Go to `Config` > `Targets`
2. Select the target
3. Find the "Rate limit" field
4. Enter the limit in bytes per second

This is useful for:
- Protecting bandwidth-sensitive services
- Prioritizing certain targets over others
- Ensuring fair access across multiple targets

## Examples

| Limit (bytes/sec) | Approximate |
|--------------------|-------------|
| 1024 | 1 KB/s |
| 102400 | 100 KB/s |
| 1048576 | 1 MB/s |
| 10485760 | 10 MB/s |

### Use Case: Development vs Production

You might want to set different rate limits for development and production targets:

```yaml
# Production database - higher bandwidth allowed
targets:
  - name: production-db
    rate_limit_bytes_per_second: 10485760  # 10 MB/s

  - name: staging-db
    rate_limit_bytes_per_second: 1048576    # 1 MB/s

  - name: dev-db
    rate_limit_bytes_per_second: 512000      # 500 KB/s
```

### Use Case: User Tiers

Set different rate limits based on user subscription level:

```yaml
# Global default
rate_limit_bytes_per_second: 1048576  # 1 MB/s

# Premium users get higher limits (configured per-user)
# rate_limit_bytes_per_second: 10485760  # 10 MB/s
```

## How Rate Limiting Works

Warpgate uses a token bucket algorithm for rate limiting. The specified bytes per second represents the sustained rate. Burst traffic is allowed up to the bucket size.

Rate limiting is applied to:
- SSH connections
- MySQL connections
- PostgreSQL connections
- HTTP connections

## Troubleshooting

If users report slow connections, check:
1. The global rate limit in `Config` > `Global parameters`
2. The user's rate limit in `Config` > `Users` > [user]
3. The target's rate limit in `Config` > `Targets` > [target]

The effective rate limit is the minimum of all applicable limits.
