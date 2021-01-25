1. Start redis-0

```
docker run -d --rm --name redis-0 \
 --net redis \
 -v ${PWD}/redis-0:/etc/redis/ \
 redis:6.0-alpine redis-server /etc/redis/redis.conf
```

2. Start redis-1

```
docker run -d --rm --name redis-1 \
--net redis \
-v ${PWD}/redis-1:/etc/redis/ \
redis:6.0-alpine redis-server /etc/redis/redis.conf
```

3. Start redis-2

```
docker run -d --rm --name redis-2 \
--net redis \
-v ${PWD}/redis-2:/etc/redis/ \
redis:6.0-alpine redis-server /etc/redis/redis.conf
```

4. Start sentinel-0

```
docker run -d --rm --name sentinel-0 --net redis \
    -v ${PWD}/sentinel-0:/etc/redis/ \
    redis:6.0-alpine \
    redis-sentinel /etc/redis/sentinel.conf
```

5. Start sentinel-1

```
docker run -d --rm --name sentinel-1 --net redis \
    -v ${PWD}/sentinel-1:/etc/redis/ \
    redis:6.0-alpine \
    redis-sentinel /etc/redis/sentinel.conf
```

6. Start sentinel-2

```
docker run -d --rm --name sentinel-2 --net redis \
    -v ${PWD}/sentinel-2:/etc/redis/ \
    redis:6.0-alpine \
    redis-sentinel /etc/redis/sentinel.conf
```

7. Build client application image

```
docker build . -t aditya/redis-client:v1.0.0
```

8. Starting client application

```
docker run -it --net redis \
--env-file .env \
-p 80:80 \
aditya/redis-client:v1.0.0
```
