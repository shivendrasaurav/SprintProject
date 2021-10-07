package com.jobportal.demo.jobposts;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Date;

import java.util.List;
import java.util.Map;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;


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
		return mongotemplate.find(query, JobpostModel.class);
	}
	@GetMapping("/jobby/{searchQuery}")
	public List<JobpostModel> jobBy(@PathVariable("searchQuery") String searchQuery){
		
		TextCriteria criteria = TextCriteria.forDefaultLanguage()
				  .matching(searchQuery);
		
		Query query = TextQuery.queryText(criteria)
		  .sortByScore();
		System.out.println("[jobBy] query:"+query);

		
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
	
	@DeleteMapping("/deletejob/{id}")
	public void deleteJobPost(@PathVariable("id") String id){
		repository.deleteById(id);
		
	}
	
	@GetMapping("/page")
	public Map<String, Object> getAllJobsInPage(@RequestParam(value = "pageno", defaultValue = "0") int pageNo,
			@RequestParam(value = "pagesize", defaultValue = "2") int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "id") String sortBy) {
			
		Map<String, Object> response = new HashMap<String, Object>();
		Sort sort = Sort.by(sortBy);
		Pageable page =  PageRequest.of(pageNo, pageSize, sort);
		Page<JobpostModel> jobPage = repository.findAll(page);
		response.put("data", jobPage.getContent());
		response.put("Totalpages", jobPage.getTotalPages());
		response.put("TotalElements", jobPage.getTotalElements());
		response.put("CurrentPageNo", jobPage.getNumber());
		
		return response;
	}
	
	
	
	@PutMapping("/pdf/add")
	public String addPdf(@RequestParam("id") String id, 
	  @RequestParam("file") MultipartFile file) 
	  throws IOException {
		Binary pdf = new Binary(BsonBinarySubType.BINARY, file.getBytes());
		Query query=new Query();
		query.addCriteria(Criteria.where("id").is(id));
		JobpostModel jobTest1 = mongooperations.findOne(query, JobpostModel.class);
		jobTest1.setPdf(pdf);
		mongooperations.save(jobTest1);
	    return jobTest1.getId();
	}
	
	@GetMapping("/pdf/{id}")
	public String getPdf(@PathVariable String id) {
	    JobpostModel jobpost = repository.findById(id).get();
	    return  Base64.getEncoder().encodeToString(jobpost.getPdf().getData());
	}
	
	
	@GetMapping("/search/skills/{data}")
	public List<JobpostModel> searchskillquery(@PathVariable String data)
	{
		
		
		TextCriteria criteria = TextCriteria.forDefaultLanguage()
				  .matchingAny(data);
		Query query = TextQuery.queryText(criteria);
		System.out.println(query);
		System.out.println(mongotemplate.find(query,JobpostModel.class ));	
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
