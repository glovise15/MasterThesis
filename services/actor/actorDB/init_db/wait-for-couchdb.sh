#!/bin/bash
# any environment variable in this script is defined, this should
# be done during the deployment of a service or in a Dockerfile

set -o nounset # Treat unset variables as an error

until curl -X PUT ${COUCHDB_DB_URL} ; do
  echo "Actors DB wasn't created - sleeping"
  sleep 1
done
echo "DB of actors was created!"

echo "Apply a formatter for each view"
mkdir formatter_output
DEBUG=views* node func_to_string.js
if [[ ${?} != 0 ]]; then
  echo -e "ERROR: during the creation of views\nEND OF \{0}"
  exit 1
fi
echo -e "\tDONE"
cd formatter_output
echo "Creation of views for actors DB"
for view in `ls *.js`; do
  curl -X PUT "${COUCHDB_DB_URL}/_design/queries" --upload-file ${view}
  if [[ ${?} != 0 ]]; then
    echo -e "ERROR: during the creation of view ${view}\nEND OF \{0}"
    exit 1
  fi
done
echo -e "\tDONE"

echo "END OF ${0}"