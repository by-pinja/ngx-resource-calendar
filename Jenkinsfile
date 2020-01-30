library 'jenkins-ptcs-library@2.3.0'

podTemplate(label: pod.label,
  containers: pod.templates + [
    containerTemplate(name: 'node', image: 'node:12', ttyEnabled: true, command: '/bin/sh -c', args: 'cat'),
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
            npm run build
          """
        }
      }
      stage('Publish tag') {
        sh """
            ls -la
            cd dist/ngx-resource-calendar
            ls -la
        """
        dir("dist") {
            sh """
                ls
            """
            publishTagToNpm()
        }
      }
    }
  }