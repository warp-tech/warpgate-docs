# Encrypting credentials at rest

<div class="badge font-xs text-bg-warning mb-3">v0.28+</div>

Warpgate has to store the credentials it uses to authenticate *to your targets* in its database. By default they are stored as-is, so if someone is able to obtain a copy of the database - a backup, a read replica, will hold every target credential.

With encryption enabled, credentials will be decrypted on demand only whenever Warpgate connects to a target. They stay encrypted in the database, in the API, and in the UI — once encryption is on, even an admin can no longer read a target's password back out of Warpgate.

!!! NOTE "What this protects against"
    Encryption at rest protects leaked database dumps, backups, replicas and misplaced database files. It does **not** protect against a compromised Warpgate node itself - the key is in that process's environment, so anything that can control the process can read the key.

## Enabling encryption

Generate a key:

```bash
openssl rand -base64 32
```

Set it as `WARPGATE_ENCRYPTION_KEY` on every node and restart Warpgate. Once all nodes have started, Warpgate will encrypt all credentials in the database.

The key must be exactly 32 bytes, base64-encoded. Warpgate will refuse to start if the value is malformed.

!!! WARNING "Back up the key"
    The key is not stored anywhere. If you lose it, the stored credentials cannot be recovered and you will have to re-enter every target's credentials by hand.

## Helm

Put the key in a secret and reference it from `values.yaml`:

```yaml
envFromSecret:
  WARPGATE_ENCRYPTION_KEY: "warpgate-secret/encryptionKey"
  WARPGATE_ENCRYPTION_KEY_OLD: "warpgate-secret/encryptionKeyOld"
```

The format is `<secret-name>/<key>`.

## Losing or changing the key

Warpgate will never refuse to start because of a key-related problem, so a lost key won't take it down. A node **without** the key still starts and works, but will not be able to connect to the affected targets.

## Rotating the key

A key can be rotated fully online without stoping the cluster.

1. Generate a new key.
2. On every node, set `WARPGATE_ENCRYPTION_KEY` to the **new** key and `WARPGATE_ENCRYPTION_KEY_OLD` to the **previous** value.
3. Roll out the change.
4. Once every running node reports the new key, Warpgate will re-encrypt all stored credentials with it.
5. When the log reports the re-encryption is complete, remove `WARPGATE_ENCRYPTION_KEY_OLD` and roll out once more.

`WARPGATE_ENCRYPTION_KEY_OLD` supports a comma-separated list, in case multiple old keys are needed to decrypt existing values (e.g. a rotation was interrupted):

```bash
WARPGATE_ENCRYPTION_KEY_OLD="<previous-key>,<key-before-that>"
```

Keys are only ever used to *read* with; the key in `WARPGATE_ENCRYPTION_KEY` is the one everything is written with.
