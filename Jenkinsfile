pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "bhavith23/abc"
    }
    stages {
        stage('Clone Repository') {
            steps {
                // Specifying 'main' fixes your previous Git error too!
                git branch: 'main', url: 'https://github.com/bhavithm41-prog/docker.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // This block automatically logs into Docker Hub for you safely
                    docker.withRegistry('', 'dockerhub_creds') {
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Docker image pushed successfully!"
        }
        failure {
            echo "Failed to push Docker image!"
        }
    }
}
