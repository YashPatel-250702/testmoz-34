FROM public.ecr.aws/lambda/nodejs:20

# Install runtimes
RUN dnf -y update && \
    dnf -y install python3 python3-pip java-17-amazon-corretto-devel && \
    dnf clean all && rm -rf /var/cache/dnf

# Set working directory
WORKDIR ${LAMBDA_TASK_ROOT}

# Copy package files
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Copy handler
COPY handler.js ./

# Default Lambda CMD
CMD ["handler.handler"]
