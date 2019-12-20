#!/usr/bin/env bash
# startServer.sh
#
# The goal of startServer is simply to wrap the starting and stopping
# of the default python webserver that is installed
#
# tested on macbook using python 2.7, to use python 3+ you need ot change the
# python command see:https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
# for details
# 

echo startServer.sh: starting
cd ~/Downloads
python -m SimpleHTTPServer 8080 &> /dev/null &
echo startServer.sh: sleeping 15 seconds to let server start
sleep 15
echo startServer.sh: sleep done, opening 
open http://localhost:8080/chooseyourpath-private.github.io/index.html
read -n 1 -s -r -p "Press any key to stop the server"
PID=`ps -eaf | grep SimpleHTTPServer | grep -v grep | awk '{print $2}'`
if [[ "" !=  "$PID" ]]; then
  echo "killing $PID"
  kill -9 $PID
fi
echo startServer: done
