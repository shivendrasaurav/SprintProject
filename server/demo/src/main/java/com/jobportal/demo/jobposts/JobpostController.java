package com.jobportal.demo.jobposts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin("http://localhost:3000")
@RestController
public class JobpostController {
	
	
	@Autowired
	JobpostRepository repository;
	
	
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
	
	

}
