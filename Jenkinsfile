pipeline {
    agent any

    tools {nodejs "NodeJS"}

    stages {
        stage('Checkout from GitLab') {
            steps {
                checkout([ $class: 'GitSCM',
                            branches: [[name: '*/main']],
                            extensions: [],
                            userRemoteConfigs: [[credentialsId: 'bd019ac5-d82d-48c8-8481-50b4fca9f8ea',
                                                 url: 'https://gitlab.mi.hdm-stuttgart.de/mk374/foodadvisor-sem-ws21']]])
                    }
        }
        stage('Build backend') {
            steps {
                echo 'Build Docker image'
                sh 'docker build -t jenkins/backend-app ./backend'
            }
        }
        stage('Build frontend') {
            steps {
                echo 'Build Docker image'
                sh 'docker build -t jenkins/frontend-app ./frontend'
            }
        }
        stage('Testing...') {
            steps {
                echo 'Run backend Test Suite...'
                dir('backend') {
                    // sh 'python3 manage.py test backend'
                }

                echo 'Run frontend Test Suite...'
                dir('frontend') {
                    sh 'npm test -- --watchAll=false'
                }

                echo 'Start backend container'
                sh 'docker run -d jenkins/backend-app'

                echo 'Start frontend container'
                sh 'docker run -d jenkins/frontend-app'
            }
        }
        stage('Cleanup') {
            steps{
                echo 'Stop and kill all docker containers and remove all images.'
                sh 'docker stop $(docker ps -aq)'
                sh 'docker rm $(docker ps -aq)'
                sh 'docker rmi $(docker images -q)'
            }
        }
    }
}