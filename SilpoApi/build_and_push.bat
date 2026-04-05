@echo off

echo Docker login...
docker login

echo Building Docker image api...
docker build -t npd421-silpo-home-api . 

echo Tagging Docker image api...
docker tag npd421-silpo-home-api:latest bloodyroom/npd421-silpo-home-api:latest

echo Pushing Docker image api to repository...
docker push bloodyroom/npd421-silpo-home-api:latest

echo Done ---api---!
pause
 