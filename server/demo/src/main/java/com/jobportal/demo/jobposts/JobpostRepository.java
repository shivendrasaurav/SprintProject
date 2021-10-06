package com.jobportal.demo.jobposts;


import java.util.Optional;

import org.bson.types.Binary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;



public interface JobpostRepository extends  MongoRepository<JobpostModel,String> {


}
