package com.jobportal.demo.users;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.demo.jobposts.JobpostModel;
import com.jobportal.demo.jobposts.JobpostRepository;



@CrossOrigin("http://localhost:3000")
@RestController
public class UsersController {
	
	@Autowired
	private UsersRepository repository;
	
	@Autowired
	private JobpostRepository jobRepository;
	
	@Autowired
	private MongoTemplate mongotemplate;
	
	@Autowired
	private MongoOperations mongooperations;
	
	
		
	
	PasswordEncoder passwordEncoder;
	
	
	@GetMapping("/allusers")
	public List<UsersModel> getallusers(){
		List<UsersModel> list=repository.findAll();
		System.out.println(list);
		
		return list;
	}
	
	
	
	
	
	@PostMapping("/createuser")
	public String createuser(@RequestBody UsersModel user) {
		
		Date d=new Date();
		
		user.setCreated_date(d);
		
		
		repository.save(user);
		
		return "User"+ user.getName()+" has been Created  successfully";
		
	}
	
	@GetMapping("/user/{id}")
	
	public Optional<UsersModel> finduserbyId(@PathVariable String id)
	{
		Optional<UsersModel> user=repository.findById(id);
		
		return user;
	}
	
	
	@DeleteMapping("/user/{id}")
	public String deleteuserbyId(@PathVariable String id)
	{
		
		repository.deleteById(id);
		return "user has been deleted successfully";
	}
	
	@PutMapping("user/{id}")
	public String updateuserbyId(@PathVariable String id,@RequestBody UsersModel user)
	{
		Query query=new Query();
		query.addCriteria(Criteria.where("id").is(id));
		UsersModel userTest1 = mongooperations.findOne(query, UsersModel.class);
				
		Date d=new Date();
		
		userTest1.setCreated_date(d);
		userTest1.setName(user.getName());
		userTest1.setBlocked(user.getBlocked());
		userTest1.setEducation_details(user.getEducation_details());
		userTest1.setExperience(user.getExperience());
		userTest1.setSkills(user.getSkills());
		userTest1.setEmail(user.getEmail());
		userTest1.setSaved(user.getSaved());
		userTest1.setApplied_jobs(user.getApplied_jobs());
		mongooperations.save(userTest1);
				
		
		
		return userTest1.getName();
	}
	
	
	@PutMapping("/apply/{uid}/{jid}")
	public String applyforjob(@PathVariable String uid,String jid)
	{
		
		
		
		return "Applied Successfully";
	}
//	@GetMapping("/user/{id}")
//	
//	public Optional<UsersModel> finduserbyId(@PathVariable String id)
//	{
//		Optional<UsersModel> user=repository.findById(id);
//		
//		return user;
//	}

	@PostMapping("/login")
	public Map<String,?>  login(@RequestBody UsersModel user) {
		
		System.out.println(user);
		
		this.passwordEncoder=new BCryptPasswordEncoder();
		String email=user.getEmail();

		UsersModel data=repository.findByEmail(email);
		


		Map<String,Object> map = new HashMap<String, Object>(); 
		if(data != null){
			
			
		Boolean res=this.passwordEncoder.matches(user.getPassword(), data.getPassword());

		map.put("email",data.getEmail());
		map.put("name",data.getName());
	    map.put("login",res );
	    map.put("role", data.getRole());
	    
		
		}
		else {
			map.put("login",false);
		}
		return map;
	}
	
	
	@PostMapping("/signup")
	public Map<String,?> signup(@RequestBody UsersModel user){
		
		
		Map<String,Object> map = new HashMap<String, Object>(); 
		this.passwordEncoder=new BCryptPasswordEncoder();
		
		
		UsersModel uu=repository.findByEmail(user.getEmail());
		
		
			
		if(uu == null)
		{
			String encodedpassword=this.passwordEncoder.encode(user.getPassword());
			
			user.setPassword(encodedpassword);
			Date d=new Date();
			user.setCreated_date(d);
				
			repository.save(user);
				
				map.put("email",user.getEmail());
			    map.put("login","success" );
			    
			    return map;
		}
		
			
		map.put("error", "user with given email is already registered");
		
		return map;
		
	}
	
	
	
	
	
	
//	@GetMapping("/userappliedjobs/{id}")
//	
//	public String  alluserjobs(@PathVariable String id){
//			
//		UsersModel data=repository.findById(id).get();
//		
//		GroupOperation groupbyid=Aggregation.group("applied_jobs");
//		
//		System.out.println(groupbyid);
//		
//		List<String> appliedjobs=data.getApplied_jobs();
//		
//		List<JobpostModel> list=jobRepository.findAll();
//		System.out.println(appliedjobs);
//		
//		
//		Query query=new Query();
//		System.out.println(query.addCriteria(Criteria.where("applied_jobs").in(appliedjobs)));
//		
//		System.out.println(mongotemplate.find(query, JobpostModel.class));
//		
//		
//		
//	
//		
//		return "Found";
//		
//		
//	}





	
	
	
	
	
	

}


//Query query=new Query();
//
//
//query.addCriteria(Criteria.where("id").is(id));
//
//	
//
//
////UsersModel fetcheduser=(UsersModel) mongotemplate.find(query, UsersModel.class);
////mongotemplate.save(user);
//		
//mongotemplate.updateFirst(query, user, UsersModel.class)

