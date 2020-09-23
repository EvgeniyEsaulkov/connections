# Connections

Информационный сайт о спортивных мероприятиях в окрестностях (Neighbourhood sport connections). Социальное приложение, которое помогает людям найти и поучаствовать в спортивных мероприятиях поблизости от их местоположения. Организаторы мероприятий публикуют информацию (место, время, вид спорта). Пользователь, желающий, например, поиграть в футбол, заходит на сайт, задает фильтры по виду спорта, дате, указывает локацию и видит список мероприятий, соответствующих заданным критериям.

### Scripts

* `bin/setup` - build Docker image and prepare DB
* `bin/server` - to run server locally
* `bin/docker-sync` - install docker-sync library to speed up performance on Mac OSX
* `bin/quality` - runs quality tools
* `bin/tests` - runs RSpec tests

### Bootstrap and run application


1. Clone application repository

```bash
git clone git://github.com/EvgeniyEsaulkov/connections.git
```

2. Run docker-sync setup script (optional, for Mac OSX users)

```bash
bin/docker-sync
```

3. Run setup script

```bash
bin/setup
```

4. Run application

```bash
bin/server
```
