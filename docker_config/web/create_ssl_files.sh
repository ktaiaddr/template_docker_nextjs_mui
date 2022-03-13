#!/bin/bash

#以下を参照
#https://qiita.com/ukei2021/items/9fd5a46253f0a43f7ddb

DIR=$(dirname $(realpath $0))

SSL_FILES_DIR=${DIR}/ssl
mkdir ${SSL_FILES_DIR}

source ${DIR}/../../.env

KEYFILE=${SSL_FILES_DIR}/ssl.key
CSRFILE=${SSL_FILES_DIR}/ssl.csr
SANFILE=${SSL_FILES_DIR}/san.txt
CRTFILE=${SSL_FILES_DIR}/ssl.crt

SUBJECT="/C=JP/ST=Tokyo/L=LOCAL/O=LOCAL inc./OU=LOCAL/CN=${HTTP_CONF_SERVER_NAME}"

openssl genrsa -out ${KEYFILE} 2048

openssl req -new -sha256 -key ${KEYFILE} -out ${CSRFILE} -subj "${SUBJECT}"

openssl req -noout -text -in ${CSRFILE}

echo "subjectAltName = DNS:${HTTP_CONF_SERVER_NAME}" >  ${SANFILE}

openssl x509 -req -sha256 -days 3650 -signkey ${KEYFILE} -in ${CSRFILE} -out ${CRTFILE} -extfile ${SANFILE}

echo ${HTTP_CONF_SERVER_NAME}