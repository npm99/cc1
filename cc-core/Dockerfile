FROM node:18.20.0-alpine3.18 as development

RUN apk update
RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev
RUN apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing libmount ttf-dejavu ttf-droid ttf-freefont ttf-liberation fontconfig

WORKDIR /usr/src/app
COPY package.json .
COPY .npmrc .
COPY . .
RUN npm install -g @nestjs/cli && npm install
RUN npm run build



FROM node:18.16.1-alpine3.18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}\
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apk update && apk add --no-cache chromium
RUN apk update && apk upgrade -U -a --ignore alpine-baselayout
RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev
RUN apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing libmount ttf-dejavu ttf-droid ttf-freefont ttf-liberation fontconfig wget
RUN mkdir -p /usr/share/fonts/truetype/sarabun

# Download the Sarabun fonts and install them
RUN wget -q -O /usr/share/fonts/truetype/sarabun/Sarabun-Regular.ttf \
    https://github.com/google/fonts/raw/main/ofl/sarabun/Sarabun-Regular.ttf && \
    wget -q -O /usr/share/fonts/truetype/sarabun/Sarabun-Bold.ttf \
    https://github.com/google/fonts/raw/main/ofl/sarabun/Sarabun-Bold.ttf && \
    wget -q -O /usr/share/fonts/truetype/sarabun/Sarabun-Italic.ttf \
    https://github.com/google/fonts/raw/main/ofl/sarabun/Sarabun-Italic.ttf && \
    wget -q -O /usr/share/fonts/truetype/sarabun/Sarabun-BoldItalic.ttf \
    https://github.com/google/fonts/raw/main/ofl/sarabun/Sarabun-BoldItalic.ttf

# Update font cache
RUN fc-cache -f -v

# Verify if Sarabun font was installed (for debugging)
RUN fc-list | grep "Sarabun"

WORKDIR /usr/src/app
COPY package.json .
COPY .npmrc .
COPY . .
RUN npm install --only=production
COPY --from=development /usr/src/app/dist ./dist

RUN find /usr/local/lib/node_modules -name "yarn.lock" -type f -delete
RUN find /usr/local/lib/node_modules -name "package-lock.json" -type f -delete

RUN find /usr/src/app/node_modules -name "yarn.lock" -type f -delete
RUN find /usr/src/app/node_modules -name "package-lock.json" -type f -delete

CMD ["npm", "run", "start:prod"]