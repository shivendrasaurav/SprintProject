package com.jobportal.demo.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;






@CrossOrigin("http://localhost:3000")
@RestController
public class UsersController {
	
	@Autowired
	UsersRepository repository;
	
		
	@GetMapping("/allusers")
	public List<UsersModel> getallusers(){
		List<UsersModel> list=repository.findAll();
		System.out.println(list);
		
		return list;
	}
	
	@PostMapping("/createuser")
	public String createuser(@RequestBody UsersModel user) {
		
		
		repository.save(user);
		
		return "User has been added successfully";
		
	}
	

}
