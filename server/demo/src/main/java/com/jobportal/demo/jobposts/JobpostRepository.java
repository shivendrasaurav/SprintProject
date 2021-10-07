package com.jobportal.demo.jobposts;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;



public interface JobpostRepository extends  MongoRepository<JobpostModel,String> {
	
	@Query("{ 'company_name' : { $regex: ?0 } }")
	List<JobpostModel> findByCompanyName(String name);
	
	@Query("{ 'title' : { $regex: ?0 } }")
	List<JobpostModel> findByTitle(String name);

	@Query("{ 'skills' : { $regex: ?0 } }")
	List<JobpostModel> findBySkills(String name);	
	


}
