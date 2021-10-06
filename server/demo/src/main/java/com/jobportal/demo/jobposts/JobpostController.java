package com.jobportal.demo.jobposts;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
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
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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




@CrossOrigin("http://localhost:3000")
@RestController
public class JobpostController {
	
	
	@Autowired
	JobpostRepository repository;
	
	@Autowired
	private MongoOperations mongooperations;
	
	
	@GetMapping("/alljobs")
	public List<JobpostModel> getalljobs(){
		List<JobpostModel> list=repository.findAll();
		System.out.println(list);
		
		return list;
	}
	
	@PostMapping("/createjobs")
	public String createjobpost(@RequestBody JobpostModel jobpost) {
		
		
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
			
//		System.out.println(pageNo+" "+pageSize+" "+sortBy);
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
	public String addPhoto(@RequestParam("id") String id, 
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
	public String getPhoto(@PathVariable String id) {
	    JobpostModel jobpost = repository.findById(id).get();
	    return  Base64.getEncoder().encodeToString(jobpost.getPdf().getData());
	}
	
	

}
