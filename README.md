# Moki Blog

## Pull Code
+ cd /usr/local/Moki-Blog
+ sudo npm run build
+ pm2 start ./.next/standalone/server.js  --name next-blog

## port 8081
+ sudo lsof -i :8081
+ sudo kill -9 <PID>
