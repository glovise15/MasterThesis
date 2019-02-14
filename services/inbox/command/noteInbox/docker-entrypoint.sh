#!/usr/bin/env bash
HOST_DOMAIN="local.wolkenkit.io"
ping -q -c1 $HOST_DOMAIN > /dev/null 2>&1
HOST_IP= ip a | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1
echo -e "$HOST_IP\t$HOST_DOMAIN" >> /etc/hosts
