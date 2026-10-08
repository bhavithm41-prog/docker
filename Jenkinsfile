pipeline{
    agent any

    environment {
        DOCKER_IMAGE = "bhavith23/abc"
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/bhavithm41-prog/docker.git'

          }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }
        stage('Login to docker hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub_creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                   bat echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub_creds') {
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }
    }

    post{
        success{
            echo "Docker image pushed successfully!"
        }
        failure{
            echo "Failed to push Docker image!"
        }
    }
}