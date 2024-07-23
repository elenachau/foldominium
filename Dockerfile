FROM pytorch/pytorch:latest

WORKDIR /app 

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "data_preparation.py"]