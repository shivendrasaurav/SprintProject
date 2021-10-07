package com.jobportal.demo.jobposts;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;

public class JobpostModel {
	
	
	@Id
	private String id;
	private String title;
	private String company_name;
	private String description;
	@TextIndexed 
	private List<String> skills;
	private String experience;
	private Date posted_date;
	private Date expire_date;
	private Binary pdf;
	private int opeanings;
	private int vacancys;
	private int status;
	private List<String> applications;
	
	
	@Override
	public int hashCode() {
		return Objects.hash(applications, company_name, description, experience, expire_date, id, opeanings, pdf,
				posted_date, skills, status, title, vacancys);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		JobpostModel other = (JobpostModel) obj;
		return Objects.equals(applications, other.applications) && Objects.equals(company_name, other.company_name)
				&& Objects.equals(description, other.description) && Objects.equals(experience, other.experience)
				&& Objects.equals(expire_date, other.expire_date) && Objects.equals(id, other.id)
				&& opeanings == other.opeanings && Objects.equals(pdf, other.pdf)
				&& Objects.equals(posted_date, other.posted_date) && Objects.equals(skills, other.skills)
				&& status == other.status && Objects.equals(title, other.title) && vacancys == other.vacancys;
	}
	@Override
	public String toString() {
		return "JobpostModel [id=" + id + ", title=" + title + ", company_name=" + company_name + ", description="
				+ description + ", skills=" + skills + ", experience=" + experience + ", posted_date=" + posted_date
				+ ", expire_date=" + expire_date + ", pdf=" + pdf + ", opeanings=" + opeanings + ", vacancys="
				+ vacancys + ", status=" + status + ", applications=" + applications + "]";
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<String> getSkills() {
		return skills;
	}
	public void setSkills(List<String> skills) {
		this.skills = skills;
	}
	public String getExperience() {
		return experience;
	}
	public void setExperience(String experience) {
		this.experience = experience;
	}
	public Date getPosted_date() {
		return posted_date;
	}
	public void setPosted_date(Date posted_date) {
		this.posted_date = posted_date;
	}
	public Date getExpire_date() {
		return expire_date;
	}
	public void setExpire_date(Date expire_date) {
		this.expire_date = expire_date;
	}
	public Binary getPdf() {
		return pdf;
	}
	public void setPdf(Binary pdf) {
		this.pdf = pdf;
	}
	public int getOpeanings() {
		return opeanings;
	}
	public void setOpeanings(int opeanings) {
		this.opeanings = opeanings;
	}
	public int getVacancys() {
		return vacancys;
	}
	public void setVacancys(int vacancys) {
		this.vacancys = vacancys;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public List<String> getApplications() {
		return applications;
	}
	public void setApplications(List<String> applications) {
		this.applications = applications;
	}
	
	
	
	

}
