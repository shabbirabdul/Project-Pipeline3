# Milestone 3: DEPLOYMENT

###Automatic deployment environment configuration 

A playbook is created to provision infrastructure necessary to run the application. 

##### Playbook Command

`ansible-playbook -i inventory playbook.yml`

##### Hosts File

```
[web]
52.5.189.34
[client]
52.4.175.99 
```

##### Playbook File
```
---
- hosts: web
  user: ubuntu

  tasks:
    ##
    # Apt package installation of required software.
    #
    - name: General | Install required packages.
      action: apt pkg={{ item }} state=installed
      sudo: yes
      tags: common
      with_items:
        - unzip
        - wget
      
    - name: Download Tomcat 7.0.42
      get_url: url=http://archive.apache.org/dist/tomcat/tomcat-7/v7.0.42/bin/apache-tomcat-7.0.42.tar.gz dest=/home/apache-tomcat-7.0.42.tar.gz
      sudo: yes

    - name: Extract Tomcat
      command: chdir=/home tar -xvzf apache-tomcat-7.0.42.tar.gz creates=/home/apache-tomcat-7.0.42
      sudo: yes

    - name: Configure Tomcat server
      template: src=/home/shabbir/Downloads/apache-tomcat-7.0.59/conf/tomcat-users.xml dest=/home/apache-tomcat-7.0.42/conf/
      sudo: yes

    - name: Start Tomcat
      command: /home/apache-tomcat-7.0.42/bin/startup.sh
      sudo: yes
 
```
##### Inventory File

```
[web]
node0 ansible_ssh_host=ec2-52-5-254-8.compute-1.amazonaws.com ansible_ssh_user=ubuntu ansible_ssh_private_key_file=~/Downloads/ckan-local.pem

[client]
node1 ansible_ssh_host=52.5.189.34 ansible_ssh_user=ubuntu ansible_ssh_private_key_file=~/Downloads/ckan-local.pem
```

##### Ansible Running

![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0764/63a27456-e3a6-11e4-8465-867c2269f6dc.png)

###Deployment of Binaries and Remote Deployment

The Application used here is a JAVA  web application built using MAVEN, Jenkins job is configured to run this MAVEN project. After the build is complete, the generated artifacts are pushed to remote AWS EC-2 instances.

##### Deployment Configuration:

A post build step has been configured to deploy the artifacts generated after build step. The post build step undeploys and redeploys the application on Tomcat sever. The application is automatically undeployed and deployed using by creating a manager user in Tomcat. 

![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0769/63c11a14-e3a6-11e4-9993-f360ed5067aa.png)

### Canary Release

We have configured 2 jenkins jobs one for Production deploy which deploys on all servers and one for Canary release which deploys artifacts on subset of servers.

##### Jenkins jobs

1. Production Deployment
2. Canary Deployment

![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0766/63b272f2-e3a6-11e4-8ed0-123410d4ede0.png)

Similarly, we have two branches in our git repository, developer and production branch.
Both these branches have a respective Jenkins Hook connected to them that triggers Canary Release and Production release jobs in Jenkins.

##### Production Deploy Job

The below configurations are done for deployment post build on production EC-2 instances.
![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0765/63ace5f8-e3a6-11e4-997b-20e73280f594.png)

![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0768/63b7a998-e3a6-11e4-9105-cdff6c9bc812.png)

##### Canary Deploy Job
The below configurations are done for deployment post build on Canary instances EC-2 instances.
![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0762/6399aaa6-e3a6-11e4-9433-b36b074d6d91.png)

![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0763/639c1be2-e3a6-11e4-9ab3-b80cb77e7901.png)

###Monitor the application for Alerts/Failures

Monitoring application can be done using several approaches.

1. A Jenkins Site Monitoring plugin is installed to get the status of application. The plugin checks if the site is up for every 2 seconds.
2. ![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0770/3e965e32-e3a8-11e4-803e-2785bb2af38c.png)

2. The Jenkins job configured also gives the status of a successful build.

![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0768/63b7a998-e3a6-11e4-9105-cdff6c9bc812.png)

3. We can also extend our Monitoring workshop to check if the application is breaching memory contraints. To explain this we have deployed same web application on two different servers, when the memory limit exceeds 85% the proxy server will toggle between servers. 

```
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

      socket.on('heartbeat',function(data){
            if(data.memory > 0.85 )
              {
                servers = [BACKUP]
              }
      });

```
![alt text] (https://github.ncsu.edu/github-enterprise-assets/0000/2100/0000/0771/0175b87c-e3b7-11e4-9bb5-1e4d8886198c.png)













