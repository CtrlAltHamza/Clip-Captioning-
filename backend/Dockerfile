# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory to /code
WORKDIR /code

# Install system dependencies required by OpenCV and other libraries
RUN apt-get update && apt-get install -y \
    git \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container at /code/
COPY requirements.txt /code/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Create a directory for the model if needed
RUN mkdir -p /code/models

# Copy the current directory contents into the container at /code
COPY . /code/

# Hugging Face Spaces exposes port 7860
EXPOSE 7860

# Command to run the application on port 7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
