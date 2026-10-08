FROM python:3.13

WORKDIR /index

COPY . .

CMD ["python","index.py"]