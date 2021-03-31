# Set base image
FROM python:3.8-alpine

# Set working directory
WORKDIR /app

# Timezone selection
RUN apk add --no-cache tzdata
ENV TZ=Australia/Melbourne
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install Alpine dependencies
RUN apk add build-base
RUN apk add unixodbc-dev
RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev

# Copy source code and project files, and install requirements
COPY ./ /app
RUN pip install -r requirements.txt

# Start the server
CMD /bin/sh -c "python -m flask run -h 0.0.0.0 -p 5000"
