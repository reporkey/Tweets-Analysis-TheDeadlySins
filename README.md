# COMP90024 Cluser and Cloud Computing Project 2 Team #3
The aim of the project is to determine the 'Gluttony' tweets in australia, and we will compute the distribution among sevral metropolis and different states by anlyzing thoes tweets. We can prove our hypothesis by comparing the statistic of Aurin.<br>

# Team Member 
This project is developed by Group 3.<br>
Jingling Zhou 888137<br>
Xiaoyue Ma 878899<br>
Chengeng Liu 813174<br>
Yunxue Chen 905136<br>
Zichun Zhu 784145<br>


## Deployment 
Ansible is an open source automation tool and widely used in the area of configuration management and application deployment. In this project, we adopted ansible, bash script and docker as our configuration management tools. <br>
To use the application and deploy the system that we built, ensure that you have the following environment set up already: <br>
1. Python version > 2.7<br>
2. Openstack sdk installed <br>
3. Able to run bash script<br>
4. Has access to nectar cloud platform.<br>
5. Able to get openstack src file. <br>


```
To run the program, Run: ". [Your openstack src file]; ansible-playbook --ask-become-pass -i [Your hosts file] [Your Ansible Playbook] "
OR followe the template provided under Script/ 
and enter bash run-nectar.sh (with your variables replaced) 
```

## Scenarios
In this assignment we mainly concern about the gluttony sin by analyze tweets of people’s social life in Australia. Gluttony often refers to eating foods far beyond daily ingest or desperately, people who has this sin is extremely easy to be obese. Combined with PHIDU dataset, our team decided to use obesity as analysis bridge connecting with the gluttony.<br>
After observing the tweets, we harvested from twitter, we decided to determine the obesity tweet by its text which not only contains the tweet’s context but also includes the hashtags. And the specific method is that we set some words and emojis into a token list, if a tweet’s text contains one of the tokens in token list, this tweet is an obesity tweet. Using the obese tweets divide by the total tweets, we can get the obese tweets rat, after that we can make the comparison in different scenarios.<br>


