package com.jobportal.demo.users;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface UsersRepository extends MongoRepository<UsersModel,String> {

}
