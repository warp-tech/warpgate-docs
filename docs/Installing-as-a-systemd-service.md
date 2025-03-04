To add Warpgate to systemd and have it start automatically, run:

```bash
cat <<EOF > /etc/systemd/system/warpgate.service
[Unit]
Description=Warpgate
After=network.target
StartLimitIntervalSec=0

[Service]
Type=notify
Restart=always
RestartSec=5
ExecStart=/usr/bin/warpgate --config /etc/warpgate.yaml run

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now warpgate
```