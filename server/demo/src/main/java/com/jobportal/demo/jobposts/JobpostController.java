package com.jobportal.demo.jobposts;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.jobportal.demo.users.UsersModel;
import com.jobportal.demo.users.UsersRepository;


@CrossOrigin("http://localhost:3000")
@RestController
public class JobpostController {
	
	
	@Autowired
	JobpostRepository repository;
	

	@Autowired
	private UsersRepository Userrepository;
	
	@Autowired
	private MongoTemplate mongotemplate;
	
	@Autowired
	private MongoOperations mongooperations;
	
	
	@GetMapping("/alljobs")
	public List<JobpostModel> getalljobs(){
		
		Date d=new Date();
		Query query=new Query();
	query.addCriteria(Criteria.where("expire_date").gte(d));
	query.addCriteria(Criteria.where("status").is(1));
	System.out.println(mongotemplate.find(query, JobpostModel.class));
		
	
		
		return mongotemplate.find(query, JobpostModel.class);
	}
	
	@PostMapping("/createjobs")
	public String createjobpost(@RequestBody JobpostModel jobpost) {
		
		
		
		Date d=new Date();
		jobpost.setExpire_date(d);
		
	
		jobpost.setPosted_date(d);
		
		
		repository.save(jobpost);
		
		return "job has been added successfully";
		
	}
	
	
	@GetMapping("/search/skills/{data}")
	public List<JobpostModel> searchskillquery(@PathVariable String data)
	{
		
		
		TextCriteria criteria = TextCriteria.forDefaultLanguage()
				  .matchingAny(data);
		Query query = TextQuery.queryText(criteria);
		System.out.println(query);
		System.out.println(mongotemplate.find(query,JobpostModel.class ));
		
		
//		return mongotemplate.find(query,JobpostModel.class);
		
		
		
		
//		Query query= new Query();
//		
//		query.addCriteria(Criteria.where("skills").is(data));
//		System.out.println(mongotemplate.find(query,JobpostModel.class));
//		
		
		return repository.findBySkills(data);
		

	}
	
	
	@GetMapping("/search/title/{data}")
	public List<JobpostModel> searchtitlequery(@PathVariable String data)
	{
		
		Query query= new Query();
		
		query.addCriteria(Criteria.where("title").is(data));
		System.out.println(mongotemplate.find(query,JobpostModel.class));
		
		
		return repository.findByTitle(data);
//		return mongotemplate.find(query,JobpostModel.class);
	}
	
	@GetMapping("/search/company/{data}")
	public List<JobpostModel> searchcompanyquery(@PathVariable String data)
	{
		
		Query query= new Query();
		
		query.addCriteria(Criteria.where("company_name").is(data));
		System.out.println(mongotemplate.find(query,JobpostModel.class));
		
		return repository.findByCompanyName(data);
		
//		return mongotemplate.find(query,JobpostModel.class);
	}
	
	
	@GetMapping("/search/exp/{data}/{id}")
	public List<JobpostModel> searchexpquery(@PathVariable String data,@PathVariable int id)
	{
		
		Query query= new Query();
		
		if(id==0)
		{
			query.addCriteria(Criteria.where("experience").gte(data));	
			System.out.println("0");
		}
		else {
			query.addCriteria(Criteria.where("experience").lte(data));
			System.out.println("1");
		}
		
		return mongotemplate.find(query,JobpostModel.class);
	}
	
	
	@GetMapping("/userappliedjobs/{id}")
	public List<JobpostModel>  alluserjobs(@PathVariable String id){
		
		UsersModel data=Userrepository.findById(id).get();
		
		GroupOperation groupbyid=Aggregation.group("applied_jobs");
		
		System.out.println(groupbyid);
		
		List<String> appliedjobs=data.getApplied_jobs();
		
		List<JobpostModel> list=repository.findAll();
		
		System.out.println(appliedjobs);
		
		
		List<JobpostModel> res=new ArrayList<JobpostModel>();
		
		for (JobpostModel i : list) {
				if(appliedjobs.contains(i.getId()))
				{
					if(!res.contains(i.getId()));
					{
					res.add(i);
					}
				}
            
        }

		System.out.println(res);
		
		return res;
		
		
	}
	

}
