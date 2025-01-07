library 'jenkins-ptcs-library@6.0.1'

podTemplate(label: pod.label,
  containers: pod.templates + [
    containerTemplate(name: 'node', image: 'node:22', ttyEnabled: true, command: '/bin/sh -c', args: 'cat'),
  ]
) {
    node(pod.label) {
      stage('Checkout') {
        checkout scm
      }
      stage('Build') {
        container('node') {
          sh """
            npm ci
            npm run build:lib
            npm run build:copyfiles
          """
        }
      }
      stage('Publish tag') {
        publishTagToNpm("dist/ngx-resource-calendar")
      }
    }
  }