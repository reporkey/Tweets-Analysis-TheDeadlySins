#!/bin/bash

# First source openrc file, which has vars to interact with the openstack api. 
. ./Instance-Creation/unimelb-comp90024-group-3-openrc.sh; ansible-playbook --ask-become-pass -i Instance-Creation/hosts Instance-Creation/nectar.yaml 
# -i host