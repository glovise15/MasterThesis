#!/bin/bash

until curl -X PUT ${COUCHDB_DB_URL} ; do
  echo "Actors DB wasn't created - sleeping"
  sleep 1
done
echo "DB of actors was created!"
curl -X PUT ${_USERS_DB_URL}

echo -e "\tDONE"

echo "END OF ${0}"