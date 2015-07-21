#!/bin/bash

mkdir dumps
mkdir .dump
mongodump --db dihh -o .dump/db
cp -R public/uploads/ .dump/
tar -zcvf "dumps/dihh-$(date '+%y-%m-%d').tar.gz" .dump
rm -Rf .dump
