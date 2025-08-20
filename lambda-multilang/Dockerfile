FROM public.ecr.aws/lambda/nodejs:20

RUN dnf -y update && \
    dnf -y install python3 python3-pip java-17-amazon-corretto-devel && \
    dnf clean all && rm -rf /var/cache/dnf

WORKDIR ${LAMBDA_TASK_ROOT}

COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY handler.js ./

CMD ["handler.handler"]
