# Configuration 

[Log into the Warpgate admin UI](https://github.com/warp-tech/warpgate/wiki/Accessing-the-admin-UI) and navigate to `Config` > `Users` > `admin` and click `Add OTP`:

<img width="500" alt="image" src="https://github.com/user-attachments/assets/b0ea8e7c-cdc2-422c-bd7f-47509190121c">

The QR code shown can now be used to set up a mobile TOTP authenticator app.

Once done, click `Update configuration` to save.

## Credentials policy configuration for SSH & HTTP

To specify 2FA policies for SSH or HTTP sessions, uncheck `Any credential` in the corresponding `Auth policy section` and select all required credentials:

<img width="500" alt="image" src="https://github.com/user-attachments/assets/66af67b5-11a9-4914-9fde-34ac62f433a6">
