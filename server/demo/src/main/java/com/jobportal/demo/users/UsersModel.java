package com.jobportal.demo.users;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;

public class UsersModel {
	
		@Id
		private String id;
		
		private String name;
		private String email;
		private String education_details;
		private String password;
		private String role;
		private List<String> saved;
		public List<String> getSaved() {
			return saved;
		}
		public void setSaved(List<String> saved) {
			this.saved = saved;
		}
		public List<String> getBlocked() {
			return blocked;
		}
		public void setBlocked(List<String> blocked) {
			this.blocked = blocked;
		}
		public List<String> getSkills() {
			return skills;
		}
		public void setSkills(List<String> skills) {
			this.skills = skills;
		}
		public Binary getPdf() {
			return pdf;
		}
		public void setPdf(Binary pdf) {
			this.pdf = pdf;
		}
		public Date getCreated_date() {
			return created_date;
		}
		public void setCreated_date(Date created_date) {
			this.created_date = created_date;
		}
		public float getExperience() {
			return experience;
		}
		public void setExperience(float experience) {
			this.experience = experience;
		}
		@Override
		public int hashCode() {
			return Objects.hash(blocked, created_date, education_details, email, experience, id, name, password, pdf,
					role, saved, skills);
		}
		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			UsersModel other = (UsersModel) obj;
			return Objects.equals(blocked, other.blocked) && Objects.equals(created_date, other.created_date)
					&& Objects.equals(education_details, other.education_details) && Objects.equals(email, other.email)
					&& Float.floatToIntBits(experience) == Float.floatToIntBits(other.experience)
					&& Objects.equals(id, other.id) && Objects.equals(name, other.name)
					&& Objects.equals(password, other.password) && Objects.equals(pdf, other.pdf)
					&& Objects.equals(role, other.role) && Objects.equals(saved, other.saved)
					&& Objects.equals(skills, other.skills);
		}
		private List<String> blocked;
		private List<String> skills;
		private List<String> applied_jobs;
		private Binary pdf;
		private Date created_date;
		public List<String> getApplied_jobs() {
			return applied_jobs;
		}
		public void setApplied_jobs(List<String> applied_jobs) {
			this.applied_jobs = applied_jobs;
		}
		private float experience;
		
		
		
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getEducation_details() {
			return education_details;
		}
		public void setEducation_details(String education_details) {
			this.education_details = education_details;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getRole() {
			return role;
		}
		public void setRole(String role) {
			this.role = role;
		}
		@Override
		public String toString() {
			return "UsersModel [id=" + id + ", name=" + name + ", email=" + email + ", education_details="
					+ education_details + ", password=" + password + ", role=" + role + ", saved=" + saved
					+ ", blocked=" + blocked + ", skills=" + skills + ", pdf=" + pdf + ", created_date=" + created_date
					+ ", experience=" + experience + "]";
		}
		
		
	

	
	

}
